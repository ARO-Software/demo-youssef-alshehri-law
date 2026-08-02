# مكتب المحامي يوسف بن عامر الشهري — Demo Site

**Business (ar):** مكتب المحامي يوسف بن عامر الشهري
**Business (en):** Lawyer Youssef bin Amer Al-shehri Office
**Category:** lawyer / law office
**City:** Riyadh, Saudi Arabia
**Language:** ar — Arabic-first, full RTL
**pitch_type:** site
**Build date:** 2026-08-02
**Demo URL:** https://aro-software.github.io/demo-youssef-alshehri-law/

---

## About this build

A single-page, fully static demo site — no backend, no build step, no external
JS libraries:

```
index.html   markup + inlined CSS (inlined to drop a render-blocking round trip)
script.js    deferred, ~3.6KB, vanilla — pure progressive enhancement
assets/      plaque · office-wide · office-desk · office-lounge · riyadh-exterior
             each as .webp with a .jpg fallback, sized to 2x of its largest box
```

### Art direction
The identity is taken from the office's own plaque: deep navy (`#0C2340`) with
brass (`#C09A55`) on warm marble (`#F5F2EB`). Headings are set in **Amiri**, an
Arabic naskh serif, with **Tajawal** for body copy. The signature device is a
"colonnade" of brass hairlines echoing the vertical stone fins of the civic
facade in the neighbourhood photograph.

The logotype is pure HTML/CSS/SVG — an Arabic wordmark «يوسف الشهري» with a
fine subline, beside a five-fin geometric mark. No raster logo, no stock art,
no gavels or scales clip-art.

### Content policy
Every fact on the page comes from the business's own signage or its public
Google Maps listing: the name (ar + en), both published phone lines, the bar
licence number ٤٤٢٧٩٨, the floor/office number, the address and the 4.8 rating.
No years of experience, case counts, success rates, testimonials, team members
or awards are claimed anywhere — practice areas describe the *service*, never an
outcome. Opening hours are unknown and are therefore omitted entirely.

### Technical notes
- `<html lang="ar" dir="rtl">` with logical CSS properties throughout.
- Every phone/licence/office number is an atomic `<bdi dir="ltr">` with
  `unicode-bidi: isolate-override`, so digits never reorder in the RTL run.
- Scroll reveal is guarded behind a `.js` class — if the script fails, all
  content renders visible.
- Mobile nav toggles by class only (no `hidden` attribute), so no UA-stylesheet
  specificity trap.
- Full `prefers-reduced-motion: reduce` block; animations use transform/opacity
  only.
- Google Maps embed is lazy-loaded and titled; no API key, no trackers, no
  localStorage.

---

Demo by [ARO Solutions](https://www.aro.solutions)
