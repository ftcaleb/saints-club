/* THE SAINTS CLUB — core engine: preloader, lenis, cursor, HUD, nav, menu, reveals, marquees, cart drawer. */
(function () {
  const TSC = window.TSC;
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(pointer: fine)').matches;
  TSC.reduced = reduced; TSC.fine = fine;

  gsap.registerPlugin(ScrollTrigger, SplitText, Flip, ScrambleTextPlugin);
  gsap.defaults({ ease: 'power3.out' });
  const SCRAMBLE = 'TSC†✦0123456789#JHB011';

  /* ------------------------------------------------------------ chrome */
  function injectChrome() {
    const page = document.body.dataset.page || 'home';
    const active = n => (page === n ? ' is-active' : '');
    document.body.insertAdjacentHTML('afterbegin', `
      <div class="grain" aria-hidden="true"></div>
      <div class="cursor" aria-hidden="true"><div class="cursor__ring"></div><div class="cursor__dot"></div><div class="cursor__label"></div></div>
      <div class="preloader" aria-hidden="true">
        <span class="preloader__corner preloader__corner--tl">TSC // SANCTUARY</span>
        <span class="preloader__corner preloader__corner--tr">JHB 011</span>
        <span class="preloader__corner preloader__corner--bl">26.2041° S 28.0473° E</span>
        <span class="preloader__corner preloader__corner--br">©TSC 2026</span>
        <div class="preloader__inner">
          <img class="preloader__logo" src="assets/img/saints-logo-white.png" alt="">
          <div class="preloader__count">000</div>
          <div class="preloader__label">Initialising</div>
        </div>
        <div class="preloader__bar"><span></span></div>
        <div class="preloader__curtain"></div>
      </div>
      <div class="promo"><div class="marquee" data-speed="40"><div class="marquee__track">
        <span><i></i>Free shipping in SA over R1,500 <i></i>Next drop: ${TSC.NEXT_DROP.name} 02.10 19:00 SAST <i></i>Not for everybody <i></i>Members pay less, always <i></i>3 to 5 working days, nationwide </span>
      </div></div></div>
      <header class="nav">
        <div class="nav__left">
          <a class="nav__link${active('shop')}" href="shop.html" data-cursor="Shop">Shop</a>
          <a class="nav__link${active('lookbook')}" href="lookbook.html" data-cursor="Look">Lookbook</a>
          <a class="nav__link${active('club')}" href="club.html" data-cursor="Join">The Club</a>
          <button class="nav__burger" aria-label="Menu"><span></span><span></span><span></span></button>
        </div>
        <a class="nav__logo" href="index.html" aria-label="The Saints Club home"><img src="assets/img/saints-logo-white.png" alt="TSC"><span>JHB 011</span></a>
        <div class="nav__right">
          <a class="nav__link" href="club.html#waitlist">Drops</a>
          <button class="nav__bag" data-open-cart aria-label="Open bag"><span>Bag</span><span class="nav__bagcount">0</span></button>
        </div>
      </header>
      <nav class="menu" aria-hidden="true">
        <div class="menu__top"><span>TSC // Menu</span><button class="menu__close">Close ✕</button></div>
        <div class="menu__links">
          <a class="menu__link" href="index.html"><small>00</small><span>Sanctuary</span></a>
          <a class="menu__link" href="shop.html"><small>01</small><span>Shop</span></a>
          <a class="menu__link" href="lookbook.html"><small>02</small><span>Lookbook</span></a>
          <a class="menu__link" href="club.html"><small>03</small><span>The Club</span></a>
          <a class="menu__link" href="club.html#waitlist"><small>04</small><span>Drops</span></a>
        </div>
        <div class="menu__bottom"><span>@the.saintsclub</span><span>Johannesburg, ZA</span><span>Not for everybody</span></div>
      </nav>
      <div class="hud" aria-hidden="true">
        <div class="hud__bl"><span class="hud__mark"></span><span class="hud__section">00 / Sanctuary</span></div>
        <div class="hud__br"><span class="hud__clock">--:--:--</span><span class="hud__progress"><span></span></span><span class="hud__pct">000%</span></div>
      </div>
      <div class="drawer-backdrop" data-close-cart></div>
      <aside class="drawer" aria-label="Your bag">
        <div class="drawer__head"><span>Your bag <b class="drawer__count">(0)</b></span><button data-close-cart>Close ✕</button></div>
        <div class="drawer__ship"><div class="drawer__shiptext"></div><div class="drawer__bar"><span></span></div></div>
        <div class="drawer__items"></div>
        <div class="drawer__foot">
          <div class="drawer__row"><span>Subtotal</span><b class="drawer__total">R 0.00</b></div>
          <button class="btn btn--solid btn--wide" data-checkout>Checkout <span class="btn__arrow">→</span></button>
          <div class="drawer__note">Tax included. Shipping calculated at checkout. Secure checkout on thesaintsclub.online</div>
        </div>
      </aside>
      <div class="toast"></div>
    `);
    document.body.insertAdjacentHTML('beforeend', `
      <footer class="footer">
        <div class="container">
          <div class="footer__grid">
            <div class="footer__col footer__brand">
              <img src="assets/img/saints-logo-white.png" alt="The Saints Club" style="height:56px;width:auto">
              <p>The Saints Club. Heavyweight streetwear cut, dyed and distressed in Johannesburg. Not for everybody, and that's the point.</p>
            </div>
            <div class="footer__col"><h4>Shop</h4><ul>
              <li><a href="shop.html">All pieces</a></li><li><a href="shop.html?cat=Hoodies">Hoodies</a></li><li><a href="shop.html?cat=Outerwear">Outerwear</a></li><li><a href="shop.html?cat=Sets">Sets</a></li><li><a href="shop.html?cat=Headwear">Headwear</a></li>
            </ul></div>
            <div class="footer__col"><h4>Club</h4><ul>
              <li><a href="club.html">Membership</a></li><li><a href="club.html#waitlist">Drop calendar</a></li><li><a href="lookbook.html">Lookbook</a></li><li><a href="https://www.instagram.com/the.saintsclub/" target="_blank" rel="noopener">Instagram</a></li><li><a href="https://www.tiktok.com/@thesaintsclub" target="_blank" rel="noopener">TikTok</a></li>
            </ul></div>
            <div class="footer__col"><h4>Help</h4><ul>
              <li><a href="${TSC.STORE}/policies/shipping-policy" target="_blank" rel="noopener">Shipping: 3 to 5 days</a></li><li><a href="${TSC.STORE}/policies/refund-policy" target="_blank" rel="noopener">Exchanges</a></li><li><a href="${TSC.STORE}/pages/contact" target="_blank" rel="noopener">Contact</a></li><li><a href="${TSC.STORE}/policies/privacy-policy" target="_blank" rel="noopener">Privacy</a></li><li><a href="${TSC.STORE}/policies/terms-of-service" target="_blank" rel="noopener">Terms</a></li>
            </ul></div>
          </div>
        </div>
        <div class="footer__giant" aria-hidden="true"><span>T</span><span>S</span><span>C</span></div>
        <div class="container"><div class="footer__bottom">
          <span>© 2026 The Saints Club</span><span>Midrand, Gauteng, ZA</span><span>JHB 011 // 26.2041° S 28.0473° E</span><span>Built like a game</span>
        </div></div>
      </footer>
    `);
    if (fine && !reduced) document.body.classList.add('has-cursor');
  }

  /* ------------------------------------------------------------ preloader */
  function preloader() {
    const el = $('.preloader');
    if (!el) return Promise.resolve();
    if (reduced) { el.remove(); return Promise.resolve(); }
    const seen = sessionStorage.getItem('tsc_seen');
    const count = $('.preloader__count', el), label = $('.preloader__label', el), bar = $('.preloader__bar span', el), logo = $('.preloader__logo', el), curtain = $('.preloader__curtain', el);
    const labels = ['Initialising', 'Loading sanctuary', 'JHB 011 // Online', '500 GSM // Verified', 'Not for everybody'];
    document.body.classList.add('no-scroll');
    const n = { v: 0 };
    const dur = seen ? 0.9 : 2.6;
    return new Promise(res => {
      const tl = gsap.timeline({ onComplete: () => { el.remove(); document.body.classList.remove('no-scroll'); sessionStorage.setItem('tsc_seen', '1'); res(); } });
      tl.to(logo, { opacity: 1, duration: 0.8 }, 0)
        .to(n, { v: 100, duration: dur, ease: 'power2.inOut', onUpdate() { const v = Math.round(n.v); count.textContent = String(v).padStart(3, '0'); bar.style.width = v + '%'; const i = Math.min(labels.length - 1, Math.floor(v / (100 / labels.length))); if (label.textContent !== labels[i]) label.textContent = labels[i]; } }, 0)
        .to(count, { scale: 0.9, opacity: 0, duration: 0.4, ease: 'power2.in' }, '>-0.1')
        .to([label, logo, '.preloader__corner'], { opacity: 0, duration: 0.3 }, '<')
        .to(curtain, { scaleY: 1, duration: 0.55, ease: 'power4.inOut' }, '<')
        .set(el, { background: 'transparent' })
        .set('.preloader__bar', { opacity: 0 })
        .to(curtain, { scaleY: 0, transformOrigin: 'top', duration: 0.7, ease: 'power4.inOut' });
    });
  }

  /* ------------------------------------------------------------ lenis */
  function smooth() {
    if (reduced || typeof Lenis === 'undefined') return;
    const lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 1, smoothWheel: true });
    TSC.lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => { const t = $(a.getAttribute('href')); if (t) { e.preventDefault(); lenis.scrollTo(t, { offset: -80 }); } }));
  }

  /* ------------------------------------------------------------ cursor */
  function cursor() {
    if (!fine || reduced) return;
    const c = $('.cursor'), label = $('.cursor__label', c);
    const xTo = gsap.quickTo(c, 'x', { duration: 0.18, ease: 'power3' }), yTo = gsap.quickTo(c, 'y', { duration: 0.18, ease: 'power3' });
    window.addEventListener('pointermove', e => { xTo(e.clientX); yTo(e.clientY); }, { passive: true });
    window.addEventListener('pointerdown', () => c.classList.add('is-down'));
    window.addEventListener('pointerup', () => c.classList.remove('is-down'));
    const hoverSel = 'a, button, [data-cursor], input, select, .card, .hcard, .hotspot';
    document.addEventListener('pointerover', e => {
      const t = e.target.closest(hoverSel); if (!t) return;
      c.classList.add('is-hover');
      const l = t.getAttribute('data-cursor'); if (l) { label.textContent = l; c.classList.add('has-label'); }
    });
    document.addEventListener('pointerout', e => { const t = e.target.closest(hoverSel); if (!t) return; c.classList.remove('is-hover', 'has-label'); });
    /* magnetic */
    $$('[data-magnetic]').forEach(el => {
      const sx = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' }), sy = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3' });
      el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(); sx((e.clientX - r.left - r.width / 2) * 0.3); sy((e.clientY - r.top - r.height / 2) * 0.3); });
      el.addEventListener('pointerleave', () => { sx(0); sy(0); });
    });
  }

  /* ------------------------------------------------------------ HUD */
  function hud() {
    const clock = $('.hud__clock'), pct = $('.hud__pct'), bar = $('.hud__progress span'), sec = $('.hud__section');
    let cur = '';
    const tick = () => { const d = new Date(); clock.textContent = d.toLocaleTimeString('en-GB', { timeZone: 'Africa/Johannesburg', hour12: false }) + ' SAST'; };
    tick(); setInterval(tick, 1000);
    ScrollTrigger.create({ start: 0, end: 'max', onUpdate: s => { bar.style.transform = `scaleX(${s.progress})`; pct.textContent = String(Math.round(s.progress * 100)).padStart(3, '0') + '%'; } });
    $$('[data-section]').forEach(s => {
      ScrollTrigger.create({ trigger: s, start: 'top 55%', end: 'bottom 55%', onEnter: () => set(s.dataset.section), onEnterBack: () => set(s.dataset.section) });
    });
    function set(t) { if (t === cur) return; cur = t; if (reduced) { sec.textContent = t; return; } gsap.to(sec, { duration: 0.8, scrambleText: { text: t, chars: SCRAMBLE, speed: 0.6 } }); }
    /* nav hide/show */
    const nav = $('.nav'); let last = 0;
    ScrollTrigger.create({ start: 0, end: 'max', onUpdate: s => { const y = s.scroll(); if (y > 200 && y > last + 4) nav.classList.add('is-hidden'); else if (y < last - 4) nav.classList.remove('is-hidden'); last = y; } });
  }

  /* ------------------------------------------------------------ menu */
  function menu() {
    const m = $('.menu'), open = $('.nav__burger'), close = $('.menu__close');
    const links = $$('.menu__link span', m);
    const tl = gsap.timeline({ paused: true, onReverseComplete: () => { m.classList.remove('is-open'); m.setAttribute('aria-hidden', 'true'); TSC.lenis && TSC.lenis.start(); } });
    tl.to(m, { clipPath: 'inset(0 0 0% 0)', duration: 0.8, ease: 'power4.inOut' })
      .from(links, { yPercent: 110, duration: 0.8, stagger: 0.06, ease: 'power4.out' }, '-=0.4')
      .from('.menu__bottom span, .menu__top', { opacity: 0, y: 10, stagger: 0.05, duration: 0.5 }, '-=0.5');
    open.addEventListener('click', () => { m.classList.add('is-open'); m.setAttribute('aria-hidden', 'false'); TSC.lenis && TSC.lenis.stop(); tl.timeScale(1).play(); });
    close.addEventListener('click', () => tl.timeScale(1.8).reverse());
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && m.classList.contains('is-open')) tl.timeScale(1.8).reverse(); });
    $$('.menu__link', m).forEach(a => a.addEventListener('click', () => tl.timeScale(2).reverse()));
  }

  /* ------------------------------------------------------------ reveals */
  function reveals() {
    /* split text */
    $$('[data-split]').forEach(el => {
      const type = el.dataset.split || 'lines';
      const split = new SplitText(el, { type: type.includes('chars') ? 'lines,words,chars' : 'lines,words', linesClass: 'line', wordsClass: 'word', charsClass: 'char', mask: 'lines' });
      const targets = type.includes('chars') ? split.chars : split.words;
      if (reduced) return;
      gsap.set(targets, { yPercent: 110, rotate: type.includes('chars') ? 6 : 0 });
      gsap.to(targets, { yPercent: 0, rotate: 0, duration: 1.1, ease: 'power4.out', stagger: type.includes('chars') ? 0.02 : 0.04, scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    });
    if (reduced) return;
    $$('[data-reveal]').forEach(el => {
      const d = parseFloat(el.dataset.reveal) || 0;
      gsap.fromTo(el, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 1.1, delay: d, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    });
    $$('[data-scramble]').forEach(el => {
      const text = el.textContent;
      ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: () => gsap.to(el, { duration: 1.2, scrambleText: { text, chars: SCRAMBLE, speed: 0.5 } }) });
    });
    $$('[data-counter]').forEach(el => {
      const end = parseFloat(el.dataset.counter), suffix = el.dataset.suffix || '', dec = (String(end).split('.')[1] || '').length;
      const o = { v: 0 };
      ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: () => gsap.to(o, { v: end, duration: 2, ease: 'power3.out', onUpdate: () => { el.textContent = o.v.toLocaleString('en-ZA', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suffix; } }) });
    });
    $$('[data-parallax]').forEach(el => {
      const amt = parseFloat(el.dataset.parallax) || 0.15;
      gsap.fromTo(el, { yPercent: -amt * 50 }, { yPercent: amt * 50, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    /* spotlight coordinates */
    $$('[data-spot]').forEach(el => el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(); el.style.setProperty('--x', ((e.clientX - r.left) / r.width * 100) + '%'); el.style.setProperty('--y', ((e.clientY - r.top) / r.height * 100) + '%'); }));
    /* tilt */
    if (fine) $$('[data-tilt]').forEach(el => {
      const rx = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3' }), ry = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3' });
      gsap.set(el, { transformPerspective: 900 });
      el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(); const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5; ry(px * 8); rx(-py * 8); });
      el.addEventListener('pointerleave', () => { rx(0); ry(0); });
    });
    /* footer giant letters */
    $$('.footer__giant span').forEach(s => { s.addEventListener('pointerenter', () => gsap.fromTo(s, { color: '#d0a4af' }, { color: '#1a1a1e', duration: 1.4 })); });
    gsap.from('.footer__giant', { yPercent: 40, opacity: 0, duration: 1.4, ease: 'power4.out', scrollTrigger: { trigger: '.footer__giant', start: 'top 100%', once: true } });
  }

  /* ------------------------------------------------------------ marquees */
  function marquees() {
    $$('.marquee').forEach(m => {
      const track = $('.marquee__track', m);
      const clone = () => { const kids = Array.from(track.children); kids.forEach(k => track.appendChild(k.cloneNode(true))); };
      clone(); if (track.scrollWidth < window.innerWidth * 2.2) clone();
      const half = () => track.scrollWidth / 2;
      const speed = parseFloat(m.dataset.speed) || 60; // px per second
      const dir = m.dataset.dir === 'left' ? 1 : -1;
      let x = 0; const v = { mult: 1 };
      gsap.ticker.add((t, dt) => {
        if (reduced) return;
        x -= (dt / 1000) * speed * v.mult * dir;
        const h = half(); if (x <= -h) x += h; if (x > 0) x -= h;
        track.style.transform = `translate3d(${x}px,0,0)`;
      });
      if (m.dataset.velocity !== undefined) {
        /* scroll velocity speeds the ticker up (and reverses it when scrolling up), then eases back to 1 */
        ScrollTrigger.create({ start: 0, end: 'max', onUpdate: s => { const target = gsap.utils.clamp(-5, 5, 1 + s.getVelocity() / 350); gsap.to(v, { mult: target, duration: 0.25, overwrite: true, onComplete: () => gsap.to(v, { mult: 1, duration: 1.2, ease: 'power2.out' }) }); } });
      }
    });
  }

  /* ------------------------------------------------------------ page transitions */
  function transitions() {
    if (reduced) return;
    document.addEventListener('click', e => {
      const a = e.target.closest('a[href]'); if (!a) return;
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || a.target === '_blank' || e.metaKey || e.ctrlKey) return;
      e.preventDefault();
      const cover = document.createElement('div');
      cover.style.cssText = 'position:fixed;inset:0;background:#0a0a0b;z-index:9400;transform:scaleY(0);transform-origin:bottom;display:grid;place-items:center;';
      cover.innerHTML = `<span class="t-mono" style="color:#8a8a88;opacity:0">Loading // ${a.textContent.trim().slice(0, 24) || 'TSC'}</span>`;
      document.body.appendChild(cover);
      gsap.timeline({ onComplete: () => { location.href = href; } })
        .to(cover, { scaleY: 1, duration: 0.55, ease: 'power4.inOut' })
        .to(cover.firstChild, { opacity: 1, duration: 0.2 });
    });
    window.addEventListener('pageshow', e => { if (e.persisted) $$('body > div[style*="z-index:9400"]').forEach(d => d.remove()); });
  }

  /* ------------------------------------------------------------ cart */
  const cart = {
    key: 'tsc_cart',
    items: [],
    load() { try { this.items = JSON.parse(localStorage.getItem(this.key) || '[]'); } catch (e) { this.items = []; } },
    save() { try { localStorage.setItem(this.key, JSON.stringify(this.items)); } catch (e) { } this.render(); },
    add(handle, size) {
      const p = TSC.byHandle(handle); if (!p) return;
      const v = p.sizes.find(s => s.s === size) || p.sizes[0];
      const ex = this.items.find(i => i.handle === handle && i.size === v.s);
      if (ex) ex.qty += 1; else this.items.push({ handle, size: v.s, qty: 1, id: v.id || null });
      this.save(); this.open(); toast(`${p.short} // ${v.s} added to bag`);
      const bc = $('.nav__bagcount'); gsap.fromTo(bc, { scale: 1.6, background: '#b90000' }, { scale: 1, background: 'transparent', duration: 0.6 });
    },
    setQty(i, q) { if (q <= 0) this.items.splice(i, 1); else this.items[i].qty = q; this.save(); },
    total() { return this.items.reduce((s, i) => s + (TSC.byHandle(i.handle)?.price || 0) * i.qty, 0); },
    count() { return this.items.reduce((s, i) => s + i.qty, 0); },
    render() {
      const count = this.count(), total = this.total();
      $('.nav__bagcount').textContent = count; $('.drawer__count').textContent = `(${count})`; $('.drawer__total').textContent = TSC.money(total);
      const left = Math.max(0, TSC.FREE_SHIP - total);
      $('.drawer__shiptext').innerHTML = left > 0 ? `<b>${TSC.money(left)}</b> away from free shipping` : `<b>Free shipping</b> unlocked. Saints look after Saints.`;
      $('.drawer__bar span').style.transform = `scaleX(${Math.min(1, total / TSC.FREE_SHIP)})`;
      const box = $('.drawer__items');
      if (!this.items.length) { box.innerHTML = `<div class="drawer__empty"><div class="t-black">Empty.</div><p class="t-mono t-ash">Nothing in the bag yet. That can change.</p><a class="btn btn--ghost" href="shop.html">Shop the uniform</a></div>`; return; }
      box.innerHTML = this.items.map((i, idx) => { const p = TSC.byHandle(i.handle); return `
        <div class="citem">
          <div class="citem__img"><img src="${TSC.img(p.images[0], 480)}" alt=""></div>
          <div><div class="citem__name">${p.name}</div><div class="citem__meta">Size ${i.size} ${p.preorder ? '// Pre-order 02.10' : ''}</div>
            <div class="citem__qty"><button data-q="${idx}:-1">−</button><span>${i.qty}</span><button data-q="${idx}:1">+</button></div></div>
          <div class="citem__price">${TSC.money(p.price * i.qty)}<button class="citem__rm" data-rm="${idx}">Remove</button></div>
        </div>`; }).join('');
      $$('[data-q]', box).forEach(b => b.addEventListener('click', () => { const [i, d] = b.dataset.q.split(':').map(Number); cart.setQty(i, cart.items[i].qty + d); }));
      $$('[data-rm]', box).forEach(b => b.addEventListener('click', () => cart.setQty(+b.dataset.rm, 0)));
    },
    open() { $('.drawer').classList.add('is-open'); $('.drawer-backdrop').classList.add('is-open'); TSC.lenis && TSC.lenis.stop(); },
    close() { $('.drawer').classList.remove('is-open'); $('.drawer-backdrop').classList.remove('is-open'); TSC.lenis && TSC.lenis.start(); },
    checkout() {
      if (!this.items.length) { toast('Your bag is empty'); return; }
      const live = this.items.filter(i => i.id), pre = this.items.filter(i => !i.id);
      if (live.length && !pre.length) { location.href = `${TSC.STORE}/cart/${live.map(i => `${i.id}:${i.qty}`).join(',')}`; return; }
      toast(pre.length ? 'Pre-order pieces open on drop day. Taking you to the store.' : 'Opening secure checkout');
      setTimeout(() => window.open(`${TSC.STORE}/collections/all`, '_blank'), 900);
    }
  };
  TSC.cart = cart;

  let toastT;
  function toast(msg) { const t = $('.toast'); t.textContent = msg; t.classList.add('is-on'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('is-on'), 2600); }
  TSC.toast = toast;

  function cartUI() {
    cart.load(); cart.render();
    document.addEventListener('click', e => {
      if (e.target.closest('[data-open-cart]')) cart.open();
      if (e.target.closest('[data-close-cart]')) cart.close();
      if (e.target.closest('[data-checkout]')) cart.checkout();
      const add = e.target.closest('[data-add]'); if (add) { const [h, s] = add.dataset.add.split('|'); cart.add(h, s); }
      const n = e.target.closest('[data-notify]'); if (n) { toast(`You're on the list for ${TSC.byHandle(n.dataset.notify)?.short || 'this piece'}`); n.textContent = 'On the list ✓'; }
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') cart.close(); });
    document.addEventListener('submit', e => { const f = e.target; if (f.matches('[data-fake]')) { e.preventDefault(); const em = $('input[type=email]', f); toast(em && em.value ? `Welcome to the club, ${em.value.split('@')[0]}.` : 'Enter your email first'); if (em) em.value = ''; } });
  }

  /* ------------------------------------------------------------ product card */
  TSC.card = function (p, i) {
    const badges = (p.badges || []).map(b => `<span class="badge ${/sold/i.test(b) ? 'badge--ghost' : /almost|restock/i.test(b) ? 'badge--blood badge--pulse' : ''}">${b}</span>`).join('');
    const quick = p.soldOut
      ? `<button class="card__notify" data-notify="${p.handle}">Notify me on restock</button>`
      : `<div class="card__sizes">${p.sizes.map(s => `<button data-add="${p.handle}|${s.s}" ${s.ok ? '' : 'disabled'} data-cursor="Add">${s.s}</button>`).join('')}</div>`;
    return `<article class="card" data-tilt data-spot data-cat="${p.cat}" data-gender="${p.gender}" data-price="${p.price}" data-i="${i}">
      <a class="card__media" href="product.html?h=${p.handle}" data-cursor="View">
        ${TSC.imgTag(p.images[0], 'main', '(max-width: 520px) 50vw, 33vw', p.name)}
        ${TSC.imgTag(p.images[1] || p.images[0], 'alt', '(max-width: 520px) 50vw, 33vw', '')}
        <div class="card__badges">${badges}</div>
      </a>
      <div class="card__quick">${quick}</div>
      <div class="card__body">
        <a class="card__name" href="product.html?h=${p.handle}">${p.name}</a>
        <div class="card__price">${TSC.money(p.price)}</div>
        <div class="card__cat">${p.cat} // ${p.spec.weight}</div>
        <div class="card__member">Members ${TSC.money(p.member)}</div>
      </div>
      <div class="card__glare"></div>
    </article>`;
  };

  /* ------------------------------------------------------------ boot */
  TSC.boot = async function (pageInit) {
    injectChrome();
    cartUI();
    await document.fonts.ready;
    smooth();
    cursor();
    marquees();
    transitions();
    const pre = preloader();
    if (pageInit) pageInit();
    reveals();
    hud();
    menu();
    await pre;
    ScrollTrigger.refresh();
    window.dispatchEvent(new Event('tsc:ready'));
  };
})();
