# The Saints Club — Sanctuary // JHB 011

Static, no-build front end for thesaintsclub.online. Everything lives in `site/`.

## Live

https://the-saints-club.vercel.app (Vercel project `the-saints-club`, scope `boikanyo-mokokas-projects`). Redeploy from `site/`:

```
vercel deploy --prod --yes --scope boikanyo-mokokas-projects
```

Favicons (`favicon.ico`, `favicon.svg`, PNGs, Apple touch icon, `site.webmanifest`) live at the root of `site/`.

## Run it locally

```
node serve.js
```
Then open http://localhost:8477. Any static host works too (Netlify, Vercel, Cloudflare Pages, GitHub Pages): upload the `site/` folder as the root.

Opening `site/index.html` straight from the file system also works, but the WebGL hero falls back to the plain photo because browsers block textures from `file://`.

## What is where

| Path | Purpose |
|---|---|
| `site/index.html` + `js/home.js` | Home: preloader, WebGL hero, drop countdown, stacking product sections, pinned horizontal lookbook, manifesto, ranks, JHB block, sign-up |
| `site/shop.html` | Grid with animated filters and sort, hover swap, quick add, notify on sold out |
| `site/product.html?h=<handle>` | Gallery, sizes, fit read, measurements, accordions, sticky add-to-bag on mobile, related pieces |
| `site/lookbook.html` | Editorial grid with shoppable hotspots and torch-lit night shots |
| `site/club.html` | Ranks, rank progress, drop calendar, house rules |
| `site/js/data.js` | The catalogue, lookbook and drop calendar. Edit prices, sizes, copy and images here |
| `site/js/core.js` | Shared engine: cursor, HUD, smooth scroll, reveals, marquees, menu, cart drawer, checkout |
| `site/js/hero.js` | The hero shader (cursor flow distortion, chromatic split, scanline, grain) |
| `site/css/main.css` | Design tokens and every component |
| `site/assets/img/` | WebP variants of the 26 campaign photos plus logo cut-outs |
| `REPORT.md` | Investigation report and RICE prompt the build follows |

## Cart and checkout

The bag lives in `localStorage`. Checkout builds a Shopify cart permalink from the real variant IDs in `data.js`, so the three live products (jacket, pants, beanie) check out on thesaintsclub.online today. Products without a Shopify variant ID yet (hoodie restock, tee, sets, rose set) are marked pre-order; add their variant IDs to `sizes[].id` once they exist in Shopify and they will check out the same way.

## Editing the catalogue

Each product in `data.js` has: handle, name, category, price, member price, badges, sizes with availability and Shopify variant id, image keys, spec, fit meter position, model notes, copy, and flat measurements. Image keys map to files in `assets/img/` (`<key>-480.webp`, `<key>-960.webp`, native width).

## Motion rules

Every section responds to scroll, cursor, hover or time. `prefers-reduced-motion` disables the preloader, smooth scroll, pinning and reveals while keeping the full layout. The custom cursor only appears on fine pointers.
