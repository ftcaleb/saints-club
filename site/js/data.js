/* THE SAINTS CLUB — catalogue, lookbook, drops. Mirrors the Shopify store where variants exist. */
window.TSC = window.TSC || {};

TSC.STORE = 'https://thesaintsclub.online';
TSC.FREE_SHIP = 1500;
TSC.NEXT_DROP = { name: 'OG HOODIE RESTOCK', sub: '500 GSM // BLACK FADED', at: '2026-10-02T19:00:00+02:00', code: 'DROP 07' };

/* image widths generated per photo (see assets/img/manifest.json) */
TSC.IMG_W = {"angle-1": [480, 960, 1119], "angle-2": [480, 960, 1170], "angle-4": [480, 960, 1132], "angle-5": [480, 960, 1112], "angle-6": [480, 960, 1119], "apparel-1": [480, 960, 1148], "apparel-2": [480, 960, 1145], "apparel-3": [480, 960, 1140], "apparel-4": [480, 960, 1166], "focal-image-2": [480, 960, 1154], "focal-image": [480, 960], "model-1": [480, 960, 1141], "model-2": [480, 960, 1170], "model-3": [480, 960, 1151], "model-4": [480, 960, 1131], "model-5": [480, 960, 1170], "model-6": [480, 960, 1138], "showcase-1": [480, 960, 1153], "showcase-2": [480, 960, 1170], "showcase-3": [480, 960, 1170], "showcase-4": [480, 960, 1121], "showcase-5": [480, 960, 1170], "showcase-6": [480, 960, 1170], "showcase-7": [480, 960, 1170], "showcase-8": [480, 960, 1170]};
TSC.img = function (name, want) {
  const ws = TSC.IMG_W[name] || [480];
  const w = ws.filter(x => x >= (want || 960))[0] || ws[ws.length - 1];
  return `assets/img/${name}-${w}.webp`;
};
TSC.srcset = function (name) {
  return (TSC.IMG_W[name] || [480]).map(w => `assets/img/${name}-${w}.webp ${w}w`).join(', ');
};
TSC.imgTag = function (name, cls, sizes, alt, eager) {
  return `<img class="${cls || ''}" src="${TSC.img(name, 960)}" srcset="${TSC.srcset(name)}" sizes="${sizes || '(max-width: 760px) 100vw, 50vw'}" alt="${alt || ''}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
};
TSC.money = n => 'R ' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

TSC.PRODUCTS = [
  {
    handle: 'tsc-camo-quater-zip-jacket', name: 'Camo Quarter Zip Jacket', short: 'Camo Quarter Zip', cat: 'Outerwear', gender: 'unisex',
    price: 999.99, member: 899.99, badges: ['Sold out', 'Drop 06'], soldOut: true, notify: true,
    sizes: [
      { s: 'S', ok: false, id: 53071908274496 }, { s: 'M', ok: false, id: 53071908307264 }, { s: 'L', ok: false, id: 53071908340032 }, { s: 'XL', ok: false, id: null }
    ],
    images: ['model-2', 'model-3', 'model-4', 'model-1', 'focal-image'],
    spec: { fabric: 'Nylon shell, mesh lining', weight: 'Midweight', fit: 'Relaxed, dropped shoulder' },
    fitMeter: 0.55, models: ['Model is 6\'3 (191cm) wearing XL', 'Second model is 5\'10 (178cm) wearing M'],
    copy: 'Designed for versatility, comfort and everyday function. Durable nylon shell with a breathable mesh lining. Camo sublimation across the upper section, reflective piping that throws light back at night, zippered side pockets for phone, wallet, keys. The top half of the uniform.',
    measurements: { S: [66, 58, 64], M: [69, 61, 65], L: [72, 64, 66], XL: [75, 67, 67] }
  },
  {
    handle: 'tsc-pants', name: 'TSC Piped Track Pants', short: 'Track Pants', cat: 'Bottoms', gender: 'unisex',
    price: 999.99, member: 899.99, badges: ['Almost gone', 'Drop 06'], soldOut: false, almostGone: true,
    sizes: [
      { s: 'S', ok: false, id: 53071934423360 }, { s: 'M', ok: false, id: 53071934456128 }, { s: 'L', ok: true, id: 53071934488896 }, { s: 'XL', ok: false, id: null }
    ],
    images: ['model-5', 'model-4', 'model-1', 'model-3'],
    spec: { fabric: 'Nylon, drawcord hem', weight: 'Midweight', fit: 'Baggy, relaxed' },
    fitMeter: 0.6, models: ['Model in the first two shots is 6\'3 (191cm) wearing XL', 'Models in the last two shots are 5\'7 (170cm) wearing M'],
    copy: 'Relaxed, baggy silhouette for an effortless fit. Zippered pockets keep things secure, adjustable drawstrings at the waist and hem let you cut the shape your way. Reflective piping runs the full length of both legs and matches the jacket. Blackletter TSC on the thigh, crest on the hip.',
    measurements: { S: [100, 36, 30], M: [102, 38, 31], L: [104, 40, 32], XL: [106, 42, 33] }
  },
  {
    handle: 'waffle-knit-beanie', name: 'Waffle Knit Beanie', short: 'Waffle Beanie', cat: 'Headwear', gender: 'unisex',
    price: 299.99, member: 269.99, badges: ['Sold out'], soldOut: true, notify: true,
    sizes: [{ s: 'OS', ok: false, id: 52887845798208 }],
    images: ['apparel-4', 'apparel-3', 'apparel-2', 'showcase-8', 'showcase-7'],
    spec: { fabric: 'Premium waffle knit', weight: 'Heavy', fit: 'One size, stretch' },
    fitMeter: 0.5, models: ['One size fits most'],
    copy: 'Premium waffle-knit with a textured finish. Soft, stretchy construction, one size fits most. Finished with a custom TSC engraved metal stud at the crown and a tonal leather-look blackletter appliqué. Subtle from across the street, unmistakable up close.',
    measurements: null
  },
  {
    handle: 'og-hoodie-black-faded', name: 'OG Hoodie — Black Faded', short: 'OG Hoodie', cat: 'Hoodies', gender: 'unisex',
    price: 1299.99, member: 1169.99, badges: ['Restock 02.10', '500 GSM'], soldOut: false, preorder: true,
    sizes: [{ s: 'S', ok: true }, { s: 'M', ok: true }, { s: 'L', ok: true }, { s: 'XL', ok: true }, { s: 'XXL', ok: true }],
    images: ['focal-image-2', 'showcase-7', 'showcase-6', 'apparel-1', 'showcase-1'],
    spec: { fabric: '500 GSM brushed fleece', weight: 'Heavyweight', fit: 'True to size, boxy' },
    fitMeter: 0.5, models: ['Model is 5\'9 (175cm) wearing M', 'Oversized look: size up once'],
    copy: 'The one that started it. 500 GSM heavyweight fleece, garment-dyed and faded so it looks like you have owned it for years on day one. Blackletter TSC at the chest, academy crest at the hem, distressing done by hand. True to size. Not for everybody.',
    measurements: { S: [66, 60, 58], M: [69, 63, 59], L: [72, 66, 60], XL: [75, 69, 61], XXL: [78, 72, 62] }
  },
  {
    handle: 'tsc-tee-jhb-011', name: 'Saints Club Tee — JHB 011', short: 'JHB 011 Tee', cat: 'Tees', gender: 'unisex',
    price: 499.99, member: 449.99, badges: ['New'], soldOut: false,
    sizes: [{ s: 'S', ok: true }, { s: 'M', ok: true }, { s: 'L', ok: true }, { s: 'XL', ok: true }],
    images: ['angle-5', 'angle-4', 'angle-6'],
    spec: { fabric: '240 GSM combed cotton', weight: 'Midweight', fit: 'Boxy, oversized' },
    fitMeter: 0.65, models: ['Model is 5\'8 (173cm) wearing L'],
    copy: 'THE SAINTS CLUB across the chest in cracked print, JHB 011 in blood red underneath, ©TSC 2026 stamped below. Giant distressed blackletter TSC across the back. Heavyweight combed cotton, boxy cut, dropped shoulder. Made to fade.',
    measurements: { S: [70, 56, 22], M: [73, 59, 23], L: [76, 62, 24], XL: [79, 65, 25] }
  },
  {
    handle: 'tsc-track-jacket-black', name: 'Piped Track Jacket — Black', short: 'Piped Track Jacket', cat: 'Outerwear', gender: 'unisex',
    price: 1099.99, member: 989.99, badges: ['New'], soldOut: false,
    sizes: [{ s: 'S', ok: true }, { s: 'M', ok: true }, { s: 'L', ok: true }, { s: 'XL', ok: false }],
    images: ['angle-2', 'angle-1', 'angle-6'],
    spec: { fabric: 'Nylon shell, mesh lining', weight: 'Midweight', fit: 'Relaxed, dropped shoulder' },
    fitMeter: 0.55, models: ['Model is 5\'8 (173cm) wearing L'],
    copy: 'All-black version of the uniform top. Full zip, high collar, reflective piping across the shoulders and down the sleeves, embroidered blackletter TSC at the chest. Wear it open over the JHB 011 tee or zipped to the chin.',
    measurements: { S: [66, 58, 64], M: [69, 61, 65], L: [72, 64, 66], XL: [75, 67, 67] }
  },
  {
    handle: 'tsc-camo-tracksuit-set', name: 'Camo Tracksuit — Full Set', short: 'Tracksuit Set', cat: 'Sets', gender: 'unisex',
    price: 1899.99, member: 1709.99, compare: 1999.98, badges: ['Set price', 'Drop 06'], soldOut: true, notify: true,
    sizes: [{ s: 'S', ok: false }, { s: 'M', ok: false }, { s: 'L', ok: false }, { s: 'XL', ok: false }],
    images: ['model-1', 'model-3', 'model-2', 'model-6'],
    spec: { fabric: 'Nylon shell + mesh', weight: 'Midweight', fit: 'Relaxed' },
    fitMeter: 0.58, models: ['Model is 6\'3 (191cm) wearing XL'],
    copy: 'The full uniform: Camo Quarter Zip Jacket and Piped Track Pants together, priced as a set. Reflective piping top to bottom. Built for the court, the taxi rank and the club.',
    measurements: null
  },
  {
    handle: 'tsc-hoodie-full-set', name: 'OG Hoodie Full Set', short: 'Hoodie Set', cat: 'Sets', gender: 'unisex',
    price: 2399.99, member: 2159.99, badges: ['Restock 02.10', '500 GSM'], soldOut: false, preorder: true,
    sizes: [{ s: 'S', ok: true }, { s: 'M', ok: true }, { s: 'L', ok: true }, { s: 'XL', ok: true }],
    images: ['showcase-7', 'focal-image-2', 'showcase-1'],
    spec: { fabric: '500 GSM fleece', weight: 'Heavyweight', fit: 'True to size' },
    fitMeter: 0.5, models: ['Models are 5\'9 and 6\'0 wearing M and L'],
    copy: 'OG Hoodie and matching 500 GSM sweatpants. Same dye bath, same fade, same crest. The set that gets you stopped in Braamfontein.',
    measurements: null
  },
  {
    handle: 'tsc-rose-set', name: 'Rose Set — Zip Top + Legging', short: 'Rose Set', cat: 'Sets', gender: 'women',
    price: 1499.99, member: 1349.99, badges: ['Women', 'New'], soldOut: false,
    sizes: [{ s: 'XS', ok: true }, { s: 'S', ok: true }, { s: 'M', ok: true }, { s: 'L', ok: true }, { s: 'XL', ok: false }],
    images: ['showcase-3', 'showcase-4'],
    spec: { fabric: 'Sculpting stretch knit', weight: 'Midweight', fit: 'Compression' },
    fitMeter: 0.4, models: ['Model is 5\'6 (168cm) wearing M'],
    copy: 'High-neck zip top with contour seams and zip pockets, paired with high-rise leggings. Tonal TSC embroidery at the chest and hip. Dusty rose, sculpted, unapologetic.',
    measurements: { XS: [56, 40, 60], S: [58, 42, 61], M: [60, 44, 62], L: [62, 46, 63], XL: [64, 48, 64] }
  }
];

TSC.byHandle = h => TSC.PRODUCTS.find(p => p.handle === h);

TSC.LOOKBOOK = [
  { img: 'focal-image', cap: ['Sanctuary // 01', 'Midrand, 16:40'], hotspots: [{ x: 62, y: 62, p: 'tsc-camo-quater-zip-jacket' }] },
  { img: 'model-1', cap: ['Studio // Flight', 'Flea + Air'], hotspots: [{ x: 50, y: 30, p: 'tsc-camo-quater-zip-jacket' }, { x: 40, y: 55, p: 'tsc-pants' }] },
  { img: 'showcase-7', cap: ['JHB // Night', 'Cobalt bars'], night: true, hotspots: [{ x: 66, y: 48, p: 'og-hoodie-black-faded' }] },
  { img: 'model-6', cap: ['Studio // Ghost', 'Long exposure'], hotspots: [] },
  { img: 'showcase-3', cap: ['The Court', 'Rose set'], hotspots: [{ x: 52, y: 46, p: 'tsc-rose-set' }] },
  { img: 'showcase-8', cap: ['Shutter // Green', 'Waffle beanie'], night: true, hotspots: [{ x: 42, y: 30, p: 'waffle-knit-beanie' }] },
  { img: 'angle-5', cap: ['Studio // Pink cast', 'JHB 011 tee'], hotspots: [{ x: 50, y: 48, p: 'tsc-tee-jhb-011' }] },
  { img: 'showcase-5', cap: ['My name is…', 'Not for everybody'], night: true, hotspots: [] },
  { img: 'model-3', cap: ['Studio // Pair', 'Full uniform'], hotspots: [{ x: 32, y: 32, p: 'tsc-camo-quater-zip-jacket' }, { x: 70, y: 70, p: 'tsc-pants' }] },
  { img: 'showcase-2', cap: ['Home // Mirror balls', 'OG hoodie'], hotspots: [{ x: 55, y: 66, p: 'og-hoodie-black-faded' }] },
  { img: 'showcase-6', cap: ['Rivets', 'Faded black'], night: true, hotspots: [{ x: 58, y: 70, p: 'og-hoodie-black-faded' }] },
  { img: 'apparel-2', cap: ['Asphalt', 'Two beanies'], hotspots: [{ x: 50, y: 55, p: 'waffle-knit-beanie' }] }
];

TSC.DROPS = [
  { d: '02', m: 'OCT', y: '2026', name: 'OG Hoodie Restock', sub: 'Black faded // 500 GSM', status: 'Countdown live', cta: 'Join waitlist', href: 'club.html#waitlist' },
  { d: '23', m: 'OCT', y: '2026', name: 'Drop 07 — Cathedral', sub: 'Green colourway // beanie + hoodie', status: 'Members first', cta: 'Get access', href: 'club.html#tiers' },
  { d: '14', m: 'NOV', y: '2026', name: 'Rose Set // Wave 2', sub: 'Women // new sizes', status: 'Upcoming', cta: 'Notify me', href: 'club.html#waitlist' },
  { d: '05', m: 'DEC', y: '2026', name: 'Saints Club Mixer', sub: 'Braamfontein // members only', status: 'RSVP opens Nov', cta: 'RSVP', href: 'club.html#tiers' }
];

TSC.TIERS = [
  { rank: 'I', name: 'Saint', req: 'Sign up', perks: ['SMS + email first notice on every drop', 'Waitlist priority on restocks', 'Member price on tees and headwear'] },
  { rank: 'II', name: 'Apostle', req: 'R5,000 lifetime', hot: true, band: 'Most of the club', perks: ['10% member price across the store, for life', 'Early access window: 24h before public', 'Invites to Saints Club mixers', 'Black wristband, collected in person'] },
  { rank: 'III', name: 'Archangel', req: 'R20,000 lifetime', perks: ['20% member price, for life', 'Unreleased and 1-of-50 pieces', 'Name stitched into the next drop\'s hem tag', 'Red wristband. Earned, never sold'] }
];
