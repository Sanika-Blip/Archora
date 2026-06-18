# ARCHORA — Image Replacement Guide

All images on the site are now loaded directly from this `public/images/` folder.
To replace an image, just save your file with the **exact filename** listed below
into the matching subfolder. No code changes needed — the site will pick it up
automatically.

Recommended format: `.jpg` (you can use `.png` too, but then update the file
extension in the matching line of code, since the code currently points to `.jpg`).

---

## hero/  — full-width banner images
- `home-slide-1.jpg` — Homepage hero carousel, slide 1
- `home-slide-2.jpg` — Homepage hero carousel, slide 2
- `home-slide-3.jpg` — Homepage hero carousel, slide 3
- `home-slide-4.jpg` — Homepage hero carousel, slide 4
- `services-hero.jpg` — Services page banner
- `our-flow-hero.jpg` — Our Process page banner
- `why-us-hero.jpg` — Why Us page banner
- `journal-hero.jpg` — Journal listing page banner
- `contact-hero.jpg` — Contact page banner

## projects/ — homepage "Projects" showcase
- `suresh-matre-hospital.jpg` — Suresh Matre Multispecialty Hospital
- `binar-mp-hospital.jpg` — Multispecialty Hospital, Binar, MP
- `jogeshwari-redevelopment.jpg` — Hospital Redevelopment, Jogeshwari
- `chembur-conversion.jpg` — Commercial Suite Conversion, Chembur

## services/ — Services page cards (one per service)
- `feasibility-studies.jpg`
- `healthcare-architecture.jpg`
- `regulatory-compliance.jpg`
- `hospital-licensing.jpg`
- `structural-design.jpg`
- `mep-engineering.jpg`
- `modular-ot-icu.jpg`
- `turnkey-execution.jpg`
- `medical-equipment-planning.jpg`
- `project-management.jpg`

## team/ — leadership headshots (About page)
- `prasad-patil.jpg` — Founder & CEO
- `vivek-patil.jpg` — Director & Principal Architect
- `aditya-kashikar.jpg` — Senior Advisor

## journal/ — Journal article thumbnails (also used as the post banner)
- `healing-by-design.jpg`
- `hospital-licenses-approvals.jpg`
- `hospital-zoning-circulation.jpg`
- `modular-ot-design.jpg`
- `digitally-integrated-ot.jpg`
- `hospital-layout-mistakes.jpg`
- `fire-safety-norms.jpg`
- `hospital-startup-timeline.jpg`

## about/ — About page supporting imagery
- `team-at-work.jpg` — used on the Home page "About" section
- `team-professionals.jpg` — used on the About page

---

### Notes
- Filenames are case-sensitive on most hosting platforms — match them exactly.
- If you'd rather use `.png` or `.webp`, open the matching page file in
  `src/app/pages/` and change the file extension in the `image:`/`src=` string
  to match what you upload.
- Until you add a real file, the site will show a small broken-image icon in
  that slot (the `ImageWithFallback` component handles this gracefully where used).
