# Srikanth Chakali — Portfolio

A 3D, animated personal portfolio built with React, Vite, Tailwind CSS,
Three.js, and Framer Motion. Content is sourced entirely from
`src/data/resumeData.js` — edit that one file to update anything on
the site.

## Run it locally

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

The build output lands in `dist/` — deploy that folder to Vercel,
Netlify, GitHub Pages, or any static host.

## Before you publish — fill these in

Your resume PDF lists GitHub / LinkedIn / LeetCode as link text but
doesn't expose the actual destination URLs, and the two projects list
"Live Demo" without a URL either. Placeholders were left in
`src/data/resumeData.js` — search for `REPLACE_WITH_` and swap in your
real links:

- `profile.links.github`, `profile.links.linkedin`, `profile.links.leetcode`
- `projects[0].github`, `projects[0].demo` (CashFlow)
- `projects[1].github`, `projects[1].demo` (Personal Portfolio Website)

## Project structure

```
src/
  data/resumeData.js       ← single source of truth for all content
  components/
    Hero.jsx, About.jsx, Skills.jsx, Projects.jsx,
    Experience.jsx, Education.jsx, Contact.jsx, Footer.jsx, Navbar.jsx
    three/
      NodeNetwork.jsx       ← signature hero 3D knowledge-graph background
      FloatingShapes.jsx    ← ambient wireframe shapes behind sections
    ui/
      MagneticButton.jsx, TiltCard.jsx, Reveal.jsx,
      ScrollProgress.jsx, CustomCursor.jsx
public/
  profile.jpg                        ← your photo
  Srikanth_Chakali_Resume.pdf        ← downloadable resume
```

## Notes on performance & accessibility

- The 3D hero network and ambient shapes disable themselves under
  `prefers-reduced-motion` and scale down node/shape counts on mobile.
- The custom cursor only activates on devices with a fine pointer
  (mouse/trackpad) — it never renders on touch devices.
- Animation loops pause via the Page Visibility API when the tab isn't
  active, and all Three.js geometries/materials/renderers are disposed
  on unmount to avoid memory leaks.
- Dark mode is the default; the theme toggle in the navbar switches a
  `light` class on `<body>`.
