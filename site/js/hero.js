/* THE SAINTS CLUB — WebGL hero: cursor flow distortion, chromatic split, scanline pulse, grain. Zero deps. */
(function () {
  const TSC = window.TSC;
  TSC.hero = function (container, src) {
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, premultipliedAlpha: false });
    if (!gl) { canvas.remove(); return null; }

    const vs = `attribute vec2 p; varying vec2 v; void main(){ v = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }`;
    const fs = `
      precision highp float;
      varying vec2 v;
      uniform sampler2D tex; uniform vec2 res; uniform vec2 imgRes; uniform float time; uniform vec2 mouse; uniform vec2 mVel; uniform float scroll; uniform float intro;
      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float noise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
        return mix(mix(hash(i), hash(i+vec2(1,0)), f.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y); }
      vec2 cover(vec2 uv){ float ra = res.x/res.y, ia = imgRes.x/imgRes.y; vec2 s = ra > ia ? vec2(1.0, ia/ra) : vec2(ra/ia, 1.0); return (uv - 0.5) * s + 0.5; }
      void main(){
        vec2 uv = v; uv.y = 1.0 - uv.y;
        // scroll parallax + intro zoom
        float z = 1.0 + 0.08 * (1.0 - intro);
        uv = (uv - 0.5) / z + 0.5; uv.y += scroll * 0.12;
        // cursor flow distortion (bulge + drag in direction of velocity)
        vec2 m = mouse; m.y = 1.0 - m.y; vec2 d = uv - m; d.x *= res.x/res.y;
        float dist = length(d); float infl = smoothstep(0.45, 0.0, dist);
        float n = noise(uv * 6.0 + time * 0.25);
        vec2 warp = normalize(d + 1e-4) * infl * 0.06 * (0.6 + n) - mVel * infl * 0.9;
        uv += warp;
        // ambient breathing
        uv += (vec2(noise(uv*3.0 + time*0.15), noise(uv*3.0 - time*0.12)) - 0.5) * 0.006;
        vec2 cuv = cover(uv);
        // chromatic split proportional to velocity + cursor influence
        float split = 0.002 + length(mVel) * 0.25 * infl + 0.006 * (1.0 - intro);
        vec2 dir = normalize(vec2(1.0, 0.35));
        float r = texture2D(tex, cuv + dir * split).r;
        float g = texture2D(tex, cuv).g;
        float b = texture2D(tex, cuv - dir * split).b;
        vec3 col = vec3(r, g, b);
        // scanline pulse sweeping down every few seconds
        float sweep = fract(time * 0.11); float line = smoothstep(0.02, 0.0, abs(v.y - (1.0 - sweep)));
        col += line * 0.18;
        col *= 1.0 - 0.06 * sin(v.y * res.y * 1.2);
        // grain + tone (lift blacks toward ink, push rose in highlights)
        float gr = hash(v * res + fract(time)) * 0.07;
        col += gr - 0.035;
        col = mix(col, col * vec3(1.02, 0.96, 0.98), 0.4);
        col = pow(col, vec3(1.06));
        // intro: reveal from noise
        float reveal = smoothstep(intro - 0.25, intro + 0.05, noise(v * 9.0 + 3.0) * 0.9 + v.y * 0.1);
        col = mix(vec3(0.039, 0.039, 0.043), col, reveal);
        gl_FragColor = vec4(col, 1.0);
      }`;
    function sh(type, s) { const o = gl.createShader(type); gl.shaderSource(o, s); gl.compileShader(o); if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(o)); return null; } return o; }
    const prog = gl.createProgram(); const a = sh(gl.VERTEX_SHADER, vs), b = sh(gl.FRAGMENT_SHADER, fs); if (!a || !b) { canvas.remove(); return null; }
    gl.attachShader(prog, a); gl.attachShader(prog, b); gl.linkProgram(prog); gl.useProgram(prog);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = {}; ['tex', 'res', 'imgRes', 'time', 'mouse', 'mVel', 'scroll', 'intro'].forEach(n => U[n] = gl.getUniformLocation(prog, n));

    const tex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8Array([10, 10, 11]));
    let imgW = 1, imgH = 1, ready = false;
    const fallback = () => { container.classList.add('is-fallback'); canvas.style.display = 'none'; };
    const img = new Image(); if (location.protocol !== 'file:') img.crossOrigin = 'anonymous';
    img.onerror = fallback; setTimeout(() => { if (!ready) fallback(); }, 6000);
    img.onload = () => { try { gl.bindTexture(gl.TEXTURE_2D, tex); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img); imgW = img.naturalWidth; imgH = img.naturalHeight; ready = true; } catch (e) { console.warn('hero texture blocked (open via http, not file://)', e); fallback(); } }; img.src = src;

    const state = { mx: 0.5, my: 0.5, tx: 0.5, ty: 0.5, vx: 0, vy: 0, scroll: 0, intro: 0, t0: performance.now(), visible: true };
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    function resize() { const r = container.getBoundingClientRect(); canvas.width = Math.max(1, r.width * dpr); canvas.height = Math.max(1, r.height * dpr); gl.viewport(0, 0, canvas.width, canvas.height); }
    resize(); window.addEventListener('resize', resize);
    container.addEventListener('pointermove', e => { const r = container.getBoundingClientRect(); state.tx = (e.clientX - r.left) / r.width; state.ty = (e.clientY - r.top) / r.height; }, { passive: true });
    container.addEventListener('pointerleave', () => { state.tx = 0.5; state.ty = 0.45; });
    new IntersectionObserver(en => { state.visible = en[0].isIntersecting; }).observe(container);

    function frame() {
      requestAnimationFrame(frame);
      if (!state.visible) return;
      const px = state.mx, py = state.my;
      state.mx += (state.tx - state.mx) * 0.08; state.my += (state.ty - state.my) * 0.08;
      state.vx += ((state.mx - px) - state.vx) * 0.2; state.vy += ((state.my - py) - state.vy) * 0.2;
      const t = (performance.now() - state.t0) / 1000;
      gl.uniform1i(U.tex, 0); gl.uniform2f(U.res, canvas.width, canvas.height); gl.uniform2f(U.imgRes, imgW, imgH);
      gl.uniform1f(U.time, t); gl.uniform2f(U.mouse, state.mx, state.my); gl.uniform2f(U.mVel, state.vx, state.vy);
      gl.uniform1f(U.scroll, state.scroll); gl.uniform1f(U.intro, ready ? state.intro : 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    frame();
    return { state, canvas, play() { gsap.to(state, { intro: 1.3, duration: 2.2, ease: 'power2.inOut' }); } };
  };
})();
