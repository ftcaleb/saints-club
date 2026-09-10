/* THE SAINTS CLUB — home page choreography */
(function () {
  const TSC = window.TSC;
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

  function init() {
    /* ---- hero shader ---- */
    const glBox = $('#heroGL');
    let hero = null;
    if (!TSC.reduced && window.innerWidth > 640) { hero = TSC.hero(glBox, 'assets/img/focal-image-2-960.webp'); }
    if (!hero) glBox.classList.add('is-fallback');
    ScrollTrigger.create({ trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true, onUpdate: s => { if (hero) hero.state.scroll = s.progress; } });
    gsap.to('.hero__content', { yPercent: 18, opacity: 0.2, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

    /* hero title intro is triggered when preloader finishes */
    const words = $$('#heroTitle .word'), meta = $$('#heroMeta span'), cta = $$('#heroCta .btn');
    if (!TSC.reduced) { gsap.set(words, { yPercent: 110, rotate: 4 }); gsap.set([meta, cta, '.hero__tag span', '.hero__scroll'], { opacity: 0, y: 14 }); }
    window.addEventListener('tsc:ready', () => {
      if (hero) hero.play();
      if (TSC.reduced) return;
      gsap.timeline({ delay: 0.1 })
        .to(words, { yPercent: 0, rotate: 0, duration: 1.4, stagger: 0.09, ease: 'power4.out' })
        .to(meta, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 }, '-=0.9')
        .to(cta, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, '-=0.7')
        .to(['.hero__tag span', '.hero__scroll'], { opacity: 1, y: 0, duration: 0.6, stagger: 0.06 }, '-=0.6');
    }, { once: true });

    /* ---- countdown ---- */
    const target = new Date(TSC.NEXT_DROP.at).getTime();
    const cells = { d: $('[data-cd=d]'), h: $('[data-cd=h]'), m: $('[data-cd=m]'), s: $('[data-cd=s]') };
    const pad = n => String(Math.max(0, n)).padStart(2, '0');
    let lastS = null;
    function tick() {
      const diff = Math.max(0, target - Date.now());
      const d = Math.floor(diff / 864e5), h = Math.floor(diff / 36e5) % 24, m = Math.floor(diff / 6e4) % 60, s = Math.floor(diff / 1e3) % 60;
      const v = { d, h, m, s };
      Object.keys(v).forEach(k => { const t = pad(v[k]); if (cells[k].textContent !== t) { cells[k].textContent = t; if (!TSC.reduced && k !== 'd') gsap.fromTo(cells[k], { yPercent: -30, opacity: 0.3 }, { yPercent: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }); } });
      lastS = s;
    }
    tick(); setInterval(tick, 1000);
    /* waitlist counter creeps up */
    const wc = $('#waitCount'); let wn = 1284; setInterval(() => { if (Math.random() > 0.55) { wn += 1; wc.textContent = wn.toLocaleString('en-ZA'); } }, 4000);

    /* ---- THE UNIFORM stacking ---- */
    const uniform = ['tsc-camo-quater-zip-jacket', 'tsc-pants', 'og-hoodie-black-faded', 'waffle-knit-beanie'].map(TSC.byHandle);
    $('#stack').innerHTML = uniform.map((p, i) => `
      <article class="stack__item ${p.handle === 'waffle-knit-beanie' ? 'stack__item--green' : ''}" data-i="${i}">
        <div class="stack__media">${TSC.imgTag(p.images[0], '', '(max-width:860px) 100vw, 50vw', p.name)}</div>
        <div class="stack__body">
          <div class="stack__index"><i></i><span>0${i + 1} / 04 // ${p.cat}</span></div>
          <h3 class="stack__name">${p.name.replace(' — ', '<br>')}</h3>
          <div class="stack__spec"><div>Fabric<b>${p.spec.fabric}</b></div><div>Weight<b>${p.spec.weight}</b></div><div>Fit<b>${p.spec.fit}</b></div></div>
          <p class="lead" style="font-size:15px;max-width:44ch">${p.copy.split('. ').slice(0, 2).join('. ')}.</p>
          <div class="stack__price">${TSC.money(p.price)}<small>Members ${TSC.money(p.member)}</small></div>
          <div class="stack__actions">
            ${p.soldOut ? `<button class="btn btn--ghost" data-notify="${p.handle}">Notify on restock</button>` : `<button class="btn btn--solid" data-add="${p.handle}|${(p.sizes.find(s => s.ok) || p.sizes[0]).s}" data-cursor="Add">Add ${(p.sizes.find(s => s.ok) || p.sizes[0]).s} to bag</button>`}
            <a class="btn btn--ghost" href="product.html?h=${p.handle}" data-cursor="View">Details</a>
          </div>
        </div>
        <div class="stack__bigno">0${i + 1}</div>
      </article>`).join('');
    if (!TSC.reduced) {
      const items = $$('.stack__item');
      items.forEach((it, i) => {
        const img = $('img', it);
        gsap.fromTo(img, { scale: 1.25, yPercent: -6 }, { scale: 1.05, yPercent: 4, ease: 'none', scrollTrigger: { trigger: it, start: 'top bottom', end: 'bottom top', scrub: true } });
        if (i < items.length - 1) {
          gsap.to(it, { scale: 0.92, filter: 'brightness(0.35)', ease: 'none', scrollTrigger: { trigger: items[i + 1], start: 'top bottom', end: 'top top', scrub: true } });
        }
        gsap.from($$('.stack__body > *', it), { y: 40, opacity: 0, stagger: 0.07, duration: 1, scrollTrigger: { trigger: it, start: 'top 60%', once: true } });
        gsap.fromTo($('.stack__bigno', it), { xPercent: 30 }, { xPercent: -10, ease: 'none', scrollTrigger: { trigger: it, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
    }

    /* ---- horizontal lookbook ---- */
    const track = $('#htrack');
    const shots = ['model-1', 'focal-image', 'model-2', 'showcase-7', 'model-6', 'showcase-3', 'showcase-8', 'model-3', 'showcase-2', 'apparel-2'];
    const kinds = ['hcard--tall', '', 'hcard--wide', '', 'hcard--tall', '', '', 'hcard--wide', '', ''];
    track.insertAdjacentHTML('beforeend', shots.map((s, i) => { const lb = TSC.LOOKBOOK.find(l => l.img === s) || { cap: ['', ''] }; return `
      <a class="hcard ${kinds[i]}" href="lookbook.html" data-cursor="Look">${TSC.imgTag(s, '', '40vw', lb.cap[0])}<span class="hcard__num">${String(i + 1).padStart(2, '0')}</span><div class="hcard__cap"><span>${lb.cap[0]}</span><span>${lb.cap[1]}</span></div></a>`; }).join('') +
      `<a class="hcard hcard--text" href="lookbook.html" data-cursor="Enter"><div class="t-black">Full<br>lookbook <span class="t-rose">→</span></div></a>`);
    if (!TSC.reduced) {
      const dist = () => track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: '#hscroll', start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 1, invalidateOnRefresh: true, onUpdate: s => { $('#hprog').style.transform = `scaleX(${s.progress})`; } } });
      $$('.hcard img', track).forEach(img => gsap.fromTo(img, { xPercent: -10 }, { xPercent: 0, ease: 'none', scrollTrigger: { trigger: img.parentElement, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } }));
    }

    /* ---- manifesto word highlight ---- */
    const man = $('#manifesto');
    const split = new SplitText(man, { type: 'words', wordsClass: 'word' });
    if (!TSC.reduced) {
      ScrollTrigger.create({ trigger: man, start: 'top 75%', end: 'bottom 45%', scrub: true, onUpdate: s => { const n = Math.floor(s.progress * split.words.length); split.words.forEach((w, i) => w.classList.toggle('is-on', i <= n)); } });
      /* variable font breathing on the highlights */
      $$('.hl', man).forEach(h => gsap.fromTo(h, { fontWeight: 300 }, { fontWeight: 800, duration: 1.6, yoyo: true, repeat: -1, ease: 'sine.inOut' }));
    } else split.words.forEach(w => w.classList.add('is-on'));

    /* ---- tiers ---- */
    $('#tiers').innerHTML = TSC.TIERS.map((t, i) => `
      <div class="tier ${t.hot ? 'tier--hot' : ''}" data-spot data-reveal="${i * 0.08}">
        ${t.band ? `<span class="tier__band">${t.band}</span>` : ''}
        <div class="tier__rank"><span>Rank ${t.rank}</span><span>0${i + 1}/03</span></div>
        <div class="tier__name">${t.name}</div>
        <div class="tier__req">${t.req}</div>
        <ul class="tier__perks">${t.perks.map(p => `<li>${p}</li>`).join('')}</ul>
        <a class="btn ${t.hot ? 'btn--solid' : 'btn--ghost'}" href="club.html#tiers" style="margin-top:auto" data-magnetic>${i === 0 ? 'Sign up free' : 'How to rank up'}</a>
      </div>`).join('');

    /* ---- JHB collage parallax ---- */
    if (!TSC.reduced) {
      $$('#collage img').forEach((im, i) => gsap.fromTo(im, { yPercent: 20 + i * 12, rotate: i % 2 ? 3 : -3 }, { yPercent: -10 - i * 8, rotate: i % 2 ? -2 : 2, ease: 'none', scrollTrigger: { trigger: '#collage', start: 'top bottom', end: 'bottom top', scrub: true } }));
    }
  }

  TSC.boot(init);
})();
