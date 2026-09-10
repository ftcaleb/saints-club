# THE SAINTS CLUB — Site Rebuild: Investigation Report + RICE Prompt

Date: 2026-09-10. Author: Claude Fable 5.1. This document is the guardrail for the build. Nothing gets built that is not traceable to a line here.

---

## 1. What we found

### 1.1 The brand (from 26 photos, the live Shopify store, Instagram, TikTok)

| Fact | Detail |
|---|---|
| Name / codes | The Saints Club, "TSC", "JHB 011", "©TSC 2026", "TSC FC ACADEMY AFRICA" crest, two five-point stars |
| Positioning | Instagram bio: **"NOT FOR EVERYBODY"**. Meta description: "Best Hoodies In South Africa" |
| Founder | Roli Khama ("mr tsc"), Midrand / Johannesburg |
| Audience | ~16K Instagram, ~13.6K TikTok (679K likes). Drops announced with date + price, SMS early access, "7 PM website opens" |
| Live catalogue | TSC Camo Quarter Zip Jacket R999.99 (sold out), TSC Pants R999.99 (L only), Waffle Knit Beanie R299.99 (sold out). OG Hoodie collection "500 GSM, True to size" with ~24 unpublished SKUs |
| Past drops | Tracksuit full set R3999.99, Full Set Hoodie R2399.99, Black Faded Hoodie (24/06/26), Valentines zip-up, pink women's set |
| Garment DNA | Blackletter TSC embroidery, reflective piping, camo sublimation yoke, crest patch, script "The Saints Club", engraved metal stud on beanie crown, distressed/faded 500 GSM hoodies |
| Photography | Two worlds: (a) studio cyclorama, mid-air jumps, motion-blur ghosting; (b) Johannesburg location: red brick + cobalt burglar bars, dirt road, corrugated shutters, green-tinted night flash, pink women's set on a cracked court |

**Palette extracted from the photos** (quantised, dominant first):

| Token | Hex | Source |
|---|---|---|
| Ink | `#0A0A0B` | garments, night shots |
| Bone | `#EDE7E3` | studio backdrop `#f0e9ea`, `#c8c8c5` |
| Ash | `#9A9A98` | cyclorama shadows, beanie asphalt |
| Rose | `#D0A4AF` | pink set, studio colour cast `#cbabae` |
| Cathedral green | `#0B2A22` | beanie campaign `#031e17`, `#30544b` |
| Amber | `#B98C62` | brick, skin, boots `#936959` |
| Blood | `#B90000` | "JHB 011" on the tee, their own Shopify link colour |
| Cobalt | `#3A4D5A` | burglar bars, camo cool tone |

### 1.2 The current site (thesaintsclub.online) — honest verdict: 2/10

Shopify "Spotlight" free theme, Inter everywhere, one hero image, a newsletter box, nothing else. Header links go to Shipping Policy and Terms of Service instead of Shop. Empty collection with a misspelt name. Blue buttons + red links on white. Placeholder text still live in the privacy policy. No about, no lookbook, no drop calendar, no social links, no favicon, no size guide, "NO REFUNDS" in caps. The brand's entire identity lives on Instagram and none of it made it to the site.

### 1.3 The competitors (rated 7/10 by you; we agree)

| Site | What they do well | Where they are static or generic |
|---|---|---|
| Factorie (Cotton On) | Fit meter from reviews, online/in-store size tabs, Payflex per-fortnight price, complete-the-look quick add | Template shared by 6 sibling brands, badge clutter, image-only hero, zero motion |
| Nike ZA | Badge vocabulary, icon-grid nav, member/guest checkout fork, launch calendar with Notify Me | Thinned-down clone of global, no video, empty cart, R4,400 free-shipping threshold |
| Zara ZA | Full-viewport video editorial hero, grid density toggle, stacked PDP gallery | Tiny text, unclear affordances, no sort, no fit info, desktop neglected |
| Cultish | ALL ACCESS lifetime-spend tiers with physical armbands, model fit lines, honest care copy, collab narrative pages | Homepage sells nothing, 1,370 sold-out SKUs with no notify, stock Shopify cart, static hero |

**Table stakes we must match:** promo bar, sticky header with bag count, product cards with hover swap + badges, size buttons with sold-out state, sticky add-to-bag on mobile, delivery/returns accordions, model fit info, BNPL line in ZAR, newsletter capture with incentive, uppercase display type + one accent.

**Gaps none of them fill (our territory):** live drop countdown + waitlist on sold-out items, member pricing inline, tier progress in the UI, video/motion-first hero and cards, shoppable lookbook, slide-out cart drawer with free-shipping progress, useful fit block (model stats + flat measurements + fit meter), predictive search, homepage that mixes editorial with "New / Restocked / Almost gone", community/event layer, local provenance as a feature, honest personality microcopy, fast lightweight pages.

### 1.4 Design inspiration (21st.dev, Kittl, Spline, Awwwards fashion winners)

- **21st.dev** most-installed effects: number ticker, scroll media expansion hero, container scroll, spotlight cards, marquee columns, scroll-morph hero, animated word-swap hero, background paths, shader heroes (raw WebGL, zero deps), variable-font proximity text, stacking cards, marquee along SVG path, 3D marquee, holo/tilt cards, scramble text, torch reveal cursor.
- **Kittl**: content-as-hero, social-proof strip directly after the hero, strict repeated headline/visual/bullets/CTA cadence.
- **Spline**: calm DOM chrome, one live 3D object per section, look-at-cursor idle loops, on-demand rendering.
- **Awwwards 2025–26 fashion winners** (Dime MTL, Serotoninn, Outfit, Decathlon Yestalgia, KidSuper, DICH, Max Mara, Miu Miu, Cartier): two-colour palettes, full-bleed photography, GSAP + Lenis as the motion spine, **one nameable signature technique plus restraint** beats effect stacking, WebGL for one hero moment rather than the whole store.

---

## 2. The approach we are taking

### 2.1 Concept: "SANCTUARY // JHB 011" — a game HUD over a cathedral

The site behaves like a video-game front end for a streetwear club. Every screen has a persistent HUD (mono labels, coordinates, live clock, drop timer, level markers "01 / THE DROP"), a custom crosshair cursor, scramble-text transitions, and a film-grain overlay. Underneath the HUD is a cathedral: blackletter type, deep ink surfaces, bone type, rose and blood accents, cathedral-green "night mode" for the beanie campaign. Nothing on screen is static: the hero is a live shader, headlines breathe on a variable font, product cards react to the cursor, sections stack and pin, marquees respond to scroll velocity, numbers count, prices tick.

**Signature technique (the one we will be remembered for):** a WebGL hero where the campaign photo is a living surface: cursor flowmap distortion + chromatic split + scanline pulse, with the blackletter headline "NOT FOR EVERYBODY" masked and revealed character by character. One signature moment, executed perfectly, then restraint everywhere else.

### 2.2 Stack (no build step, all libraries pinned from allow-listed CDNs)

| Layer | Choice | Why |
|---|---|---|
| Markup | Static multi-page HTML (index, shop, product, lookbook, club) | Opens anywhere, hosts anywhere, portable into a Shopify theme later |
| Motion | GSAP 3.13+ (ScrollTrigger, SplitText, Flip, ScrambleText, all free) | Industry spine of every winner listed above |
| Scroll | Lenis | Inertial scroll all effects hang off |
| WebGL | Raw WebGL fragment shader, zero deps | Hero distortion + grain; fails gracefully to the plain image |
| Data | `data/products.js` mirroring the Shopify catalogue, cart in localStorage, checkout hand-off via Shopify cart permalink | Real cart today, real checkout on their existing store |
| Fonts | Grenze Gotisch (variable blackletter), Big Shoulders Display (variable condensed), Inter Tight (body), Space Mono (HUD) | Variable axes enable kinetic typography |
| Images | WebP at 480/960/1400 with blur placeholders, generated from the 26 photos | Fast, sharp, no layout shift |

### 2.3 Pages and their moments

1. **Home** — preloader (counter 000→100, "INITIALISING // JHB 011", logo wipe) → WebGL hero → velocity marquee "NOT FOR EVERYBODY · JHB 011 · 500 GSM" → live drop countdown with waitlist → "THE UNIFORM" sticky stacking product sections (jacket, pants, beanie, hoodie) → horizontal pinned lookbook → manifesto with variable-font breathing and scroll word reveal → "THE CLUB" tier cards with spotlight → community / Johannesburg block with number tickers → newsletter → footer with giant marquee logotype.
2. **Shop** — filter chips with Flip layout animation, product cards with hover swap, tilt, quick add, sold-out "NOTIFY ME", "ALMOST GONE" pulse badge, member price line.
3. **Product** — stacked gallery with parallax, size grid with sold-out states, fit block (model stats + flat measurements + fit meter), sticky add-to-bag, BNPL line, accordions, "complete the uniform".
4. **Lookbook** — full-bleed editorial with hotspots and shoppable tags, torch-reveal cursor on the night shots.
5. **Club** — "NOT FOR EVERYBODY" manifesto, membership tiers (Saint / Apostle / Archangel) with progress bar, drop calendar, RSVP.
6. **Cart drawer** (all pages) — slide-out, free-shipping progress to R1500, upsell row, checkout to Shopify.

### 2.4 Rules that keep us honest

- Every section has at least one motion behaviour tied to scroll, cursor, time, or hover. No dead sections.
- One signature WebGL moment (hero). Everything else is CSS/GSAP. No effect stacking.
- Respect `prefers-reduced-motion` and touch: the site must still be beautiful with motion off and on a phone.
- Real copy, real prices in ZAR, real products, honest microcopy. No lorem ipsum.
- Performance budget: LCP image under 120KB, total JS under 250KB, 60fps scroll on a mid laptop.
- Nothing from the current site's theme survives except the catalogue and policies.

---

## 3. RICE PROMPT (the brief the build executes against)

**R — ROLE**
You are a senior full-stack UI/UX designer and creative-technologist with 30 years of award-winning work in fashion e-commerce and interactive campaigns. You build with GSAP, Lenis, and raw WebGL, and you design for emotion first, conversion second, and never let one sabotage the other.

**I — INSTRUCTIONS**
1. Build a static, multi-page website for The Saints Club (TSC), Johannesburg streetwear, in `site/`, that opens from any static host with zero build step.
2. Implement the concept "SANCTUARY // JHB 011": game-HUD chrome over a blackletter cathedral aesthetic, using the palette and type stack in section 2.2 of the report.
3. Deliver the six surfaces listed in section 2.3 with every listed motion moment.
4. Use the real catalogue (jacket R999.99, pants R999.99, beanie R299.99, OG hoodie R1299.99 est., tracksuit full set R3999.99, full hoodie set R2399.99, pink women's set) with the real product copy, corrected for spelling.
5. Use only the 26 supplied photos, optimised to WebP with blur placeholders.
6. Load libraries only from cdnjs.cloudflare.com or cdn.jsdelivr.net, pinned. Fonts from Google Fonts with fallback stacks.
7. Make the cart real: localStorage cart, drawer on every page, free-shipping progress, Shopify permalink checkout.
8. Honour `prefers-reduced-motion`, keyboard focus, touch devices, and a 400px viewport.
9. Write honest, personality-driven microcopy in the brand's voice: short, confident, Johannesburg, "not for everybody".

**C — CONTEXT**
Brand facts, catalogue, palette, competitor table stakes, opportunity gaps, and the technique library are in sections 1 and 2 of this report. The current site is a near-empty Shopify Spotlight theme and must not influence the design. The competitors (Factorie, Nike ZA, Zara ZA, Cultish) are 7/10 and static; we are competing years above them with motion, HUD, and a signature WebGL hero.

**E — EXPECTATIONS**
- An Awwwards-calibre experience: a visitor should say "this is a game" within 3 seconds and "I want the jacket" within 30.
- Nothing static: every section moves on scroll, cursor, hover, or time.
- One signature technique executed flawlessly; restraint everywhere else.
- Real products, real prices, real cart, real checkout hand-off.
- Works at 400px and 1920px, with motion on and off, at 60fps.
- Verified in a real browser with screenshots before hand-off.
