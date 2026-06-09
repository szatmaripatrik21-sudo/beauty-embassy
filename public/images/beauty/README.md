# Beauty image assets

Drop the real salon photography here using these exact filenames, then open
`src/data/salonData.ts` and set `USE_LOCAL_IMAGES = true`. Every reference will
switch from the Unsplash placeholders to these local files — no other edits needed.

| Filename                 | Subject                                  | Status       |
|--------------------------|------------------------------------------|--------------|
| hero-main.webp           | Central hero portrait (luminous beauty)  | ✅ local      |
| hero-right-bottom.webp   | Bottom-right parallax tile               | ⏳ pending    |
| facial-treatment.jpg     | Facial / skincare treatment in progress  | ⏳ pending    |
| hair-styling.jpg         | Hair styling / blowout                   | ⏳ pending    |
| makeup-detail.jpg        | Close-up makeup application              | ⏳ pending    |
| nails-detail.jpg         | Manicure / nail detail                   | ⏳ pending    |
| skincare-product.jpg     | Skincare products                        | ⏳ pending    |
| salon-interior.jpg       | Warm, minimal salon interior             | ⏳ pending    |
| soft-towels-flowers.jpg  | Towels, candle, flowers (treatment room) | ⏳ pending    |

Drop files here and add `localSrc` to the matching entry in `src/data/salonData.ts`.
No other edits needed — `img()` auto-prefers local over Unsplash per-image.

Recommended: 1600px wide, JPG/WebP, optimised (<300 KB each). Use `object-fit:
cover` framing — portraits work best for hero-main.
