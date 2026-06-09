# LUMIÈRE — Refinement Changelog

A senior design + front-end refinement pass taking the build from "good demo" to
"ship-to-client". Existing IA, copy, and routing preserved.

## Phase 1 — Token foundation
- Rewrote `src/index.css` as the single source of truth: warm near-black palette
  (`--bg #100C0A`), champagne ramp (`--gold #C8A35E` + `--gold-hover` + `--gold-press`),
  `--text-hi / --text-body / --text-muted`, `--hairline`, an 8pt spacing scale, a
  `--section-y` rhythm token, and radius/shadow/motion tokens (`--ease-out`, `--dur-*`).
  Documented AA-legal pairings inline. Back-compat aliases keep existing class names working.
- `tailwind.config.js`: added `surface`, `champagne-press`, `hairline` color tokens.
- Added reusable `.eyebrow`, `.section-pad`, scrim, and `.img-grade` component/utility classes.
- Kept Cormorant Garamond (display) + DM Sans (body) — both distinctive, not generic.

## Phase 2 — Image system
- `.img-grade` global treatment (desaturate + warm + slight contrast) applied to every
  photo so mixed stock reads as one art-directed set.
- Scrim system as tokens: `.scrim-bottom`, `.scrim-flat`, `.scrim-radial`. No text now
  sits on a raw image without an AA-passing scrim.
- Aspect ratios locked on all image slots (no layout shift / mixed crops).

## Phase 3 — Hero (split by viewport)
- **Desktop keeps the cinematic scroll-scrubbed collage** (pinned 280vh track: central
  card scales while six tiles slide in, text recedes, exit gradient → "Signature
  Treatments" lead-in). Now polished with the global `img-grade` so the photos read as
  one cohesive set, plus tokenized shadows/eyebrow.
- **Mobile / prefers-reduced-motion get a clean full-bleed editorial hero** (the collage
  was the source of the mobile mess): graded photo + layered scrim (top for header, left
  for the text column, bottom for the block) guaranteeing AA legibility; slow Ken Burns
  drift + staggered entrance, both reduced-motion-safe.
- Swapped the washed-out product-macro hero image for an on-brand treatment shot; clear
  CTA hierarchy (filled gold Book / ghost View Services).

## Phase 4 — Section rhythm & polish
- Every section now uses `.section-pad` → consistent ~80px mobile / ~128px desktop rhythm;
  dead-air gaps gone. Eyebrows unified via `.eyebrow`.
- Services rows, gallery grade, testimonials, team cards, and the "12k+" stat tightened.

## Phase 5 — Final CTA & footer
- Final CTA re-treated: graded background + `scrim-flat` + `scrim-radial` for a legible
  headline; press states on the Book button.
- Footer moved to `surface` token + section rhythm; social glyphs are inline SVGs.

## Phase 6 — Motion
- Section reveals (fade + small translate, once on enter) preserved; hover/press use the
  gold-hover/press tokens; everything respects `prefers-reduced-motion`.

## Phase 7 — QA (via Playwright, scripts in `qa/`)
- **Contrast (computed on `--bg`):** text-hi 17:1 · text-body 9.6:1 · gold 8.2:1 ·
  muted 6.0:1 — all pass AA (most AAA). Hero/CTA text legibility guaranteed by scrims.
- **Responsive:** no horizontal overflow at 360 / 390 / 768 / 1024 / 1280.
- **Semantics/a11y:** exactly one `<h1>`; all `<img>` have alt (decorative ones `alt=""`).
- `npm run build` and `npm run lint` both clean.

## Files touched
- `src/index.css`, `tailwind.config.js`
- `src/components/BeautyHero.tsx` (full rewrite), `SignatureTreatments.tsx`, `BrandStory.tsx`,
  `GalleryGrid.tsx`, `Testimonials.tsx`, `TeamPreview.tsx`, `FinalCTA.tsx`, `SiteFooter.tsx`,
  `site/Header.tsx`
- `src/data/salonData.ts` (hero + makeup image swaps)
- Removed: `src/hooks/useIsMobile.ts` (no longer needed)
- Added: `qa/` (Playwright capture + responsive scripts), `CLIENT_CHECKLIST.md`, `FOLLOWUPS.md`
- Dev dependency added: `playwright` (QA screenshots only)
