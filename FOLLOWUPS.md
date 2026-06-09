# Followups (out of scope for this pass)

Things worth doing, parked to avoid scope creep:

- **Body font exploration.** DM Sans is solid but the brief invited 2–3 Didone-friendly
  pairings (e.g. a humanist grotesque). Worth a side-by-side before final sign-off.
- **Real booking integration.** Replace the `#book` anchor with an actual SimplyBook/
  Calendly/SevenRooms embed or a server-backed form.
- **LocalBusiness / HealthAndBeautyBusiness JSON-LD** + Open Graph image for SEO/rich results.
- **Image pipeline.** Once real photos land, serve AVIF/WebP at responsive sizes
  (`srcset`) and consider build-time grading instead of a CSS filter for better quality.
- **Gallery lightbox** and a "view full gallery" route if the studio wants more than 6 shots.
- **i18n / Hungarian localization** if a HU version is required (copy currently EN).
- **Reduced-motion manual pass** on a real device, plus focus-trap test for the mobile menu
  with a keyboard (logic is in place; verify on hardware).
- **Remove `playwright` dev dependency** if you don't want QA tooling in the repo.
