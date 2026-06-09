# LUMIÈRE — Client Checklist

This is a **placeholder demo build**. Everything below must be confirmed or replaced
with real data before this goes live. Nothing here is a verified business fact — all
current values were invented for layout and are flagged for you to supply.

> After you add real photos to `/public/images/beauty/` (filenames in the README there),
> set `USE_LOCAL_IMAGES = true` in `src/data/salonData.ts` to switch every image at once.

---

## 1. Business facts to confirm (`src/data/salonData.ts` → `brand`)

| Field | Current placeholder | Action |
|-------|--------------------|--------|
| Studio name | `LUMIÈRE` | `[REPLACE: confirm final brand name]` |
| Address | `Andrássy út 12, 1061 Budapest` | `[REPLACE: real street address]` |
| Maps link | generic query URL | `[REPLACE: exact Google Maps place link]` |
| Phone | `+36 1 234 5678` | `[REPLACE: real phone]` (used in header? no — in Final CTA, footer, mobile Call bar) |
| Email | *(none on site yet)* | `[REPLACE: studio email]` — add to footer |
| Hours | `Tue–Sat · 9:00–19:00` | `[REPLACE: real opening hours]` |
| Instagram | `instagram.com` | `[REPLACE: real Instagram URL]` |
| Facebook | `facebook.com` | `[REPLACE: real Facebook URL]` |
| Booking link | `#book` (scrolls to CTA) | `[REPLACE: real booking system URL or embed — SimplyBook/Calendly/etc.]` |

## 2. Services & prices (`salonData.ts` → `services`)
All four are placeholders — confirm names, durations, and starting prices:
- Signature Facial — 60 min — From 24 000 Ft `[CONFIRM]`
- Hair Styling & Blowout — 45 min — From 12 000 Ft `[CONFIRM]`
- Bridal Makeup — 75 min — From 28 000 Ft `[CONFIRM]`
- Lash Lift & Tint — 50 min — From 15 000 Ft `[CONFIRM]`
- "over 40 treatments" closing line `[CONFIRM real count]`

## 3. People (`salonData.ts` → `team`)
Names, roles, and photos are invented:
- Sofia Varga — Lead Skin Therapist `[REPLACE]`
- Dóra Kiss — Senior Hair Stylist `[REPLACE]`
- Lena Boros — Makeup Artist `[REPLACE]`

## 4. Testimonials (`salonData.ts` → `testimonials`)
All three quotes + names are fabricated for layout. `[REPLACE with real, consented reviews]`.
The "5.0 · rated by local clients" line also needs a real source `[CONFIRM]`.

## 5. Brand story stat (`salonData.ts` → `story`)
"12k+ glow-ups since 2016" is invented. `[REPLACE: real stat + founding year]`.

## 6. Imagery — every photo is an Unsplash placeholder
Replace with real, on-brand photography (warm, editorial; the global grade will
unify them). Ideal shots per slot:

| File (`/public/images/beauty/`) | Ideal replacement shot |
|---|---|
| `hero-main.jpg` | A signature wide hero: serene close-up of glowing skin or a calm treatment moment, room on the left third for text, warm low light. |
| `facial-treatment.jpg` | Facialist performing a treatment, hands + client, soft light. |
| `hair-styling.jpg` | Stylist mid-blowout, motion in the hair. |
| `makeup-detail.jpg` | Clean makeup application close-up — **no third-party product branding**. |
| `nails-detail.jpg` | Manicure detail, neutral/elegant polish. |
| `skincare-product.jpg` | Your own product line / unbranded amber-glass skincare. |
| `salon-interior.jpg` | The actual studio interior, warm and minimal. |
| `soft-towels-flowers.jpg` | Treatment-room still life: towels, candle, florals. |

⚠ **Flagged during QA:** the original makeup placeholder showed visible "Bobbi Brown"
branding and was swapped out. Make sure replacement photos contain **no competitor /
third-party branding, watermarks, or logos**.

## 7. Legal / footer
- Footer line "© 2026 LUMIÈRE. Placeholder demo site." — remove "Placeholder demo site"
  when this becomes a real client build.
- Add any required imprint / privacy / cookie links `[CONFIRM legal requirements]`.
