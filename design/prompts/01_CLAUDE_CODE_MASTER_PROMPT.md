# Claude Code Master Prompt — Pixel-Level Landing Page Recreation

You are implementing a static landing page from the provided reference image `reference_landing_page.jpeg`.

Goal: recreate the landing page as closely as possible in HTML/CSS/JS, prioritizing visual fidelity over generic component abstraction.

## Reference canvas

- Reference screenshot size: 1024 × 576
- Theme: dark monochrome sci-fi personal website
- Site title: `THE EVENT HORIZON LOGS`
- Visual language: black hole, event horizon, starfield, pixel astronaut, faint source-code overlays, thin terminal UI cards
- Color family: blue-gray, black, off-white. Avoid saturated colors.

## Deliverables

Create a complete frontend implementation:

```txt
index.html
src/
  main.js
  styles.css
assets/
  hero-black-hole.webp
  card-black-hole.webp
  card-deep-field.webp
  astronaut-pixel.png
  astronaut-terminal.svg
  noise.png
```

If using a framework, keep the page visually identical. Plain HTML/CSS is preferred unless the project already uses React/Vite/Next.

## Hard visual requirements

1. The top header must occupy roughly the first 105px of a 1024×576 viewport.
2. Title must be centered at the top, wide techno lettering, pale blue-gray glow.
3. Navigation sits below the title, centered, with two-line labels:
   - ABOUT ME / BIO_FUNC()
   - CODE EXPLORATIONS / REPOS && SNIPPETS
   - HOME
   - SPACE OBSERVATIONS / ASTRONOMY_LOGS
   - CONTACT / MESSAGE_QUEUE
4. Hero section starts below nav and fills the upper-middle area.
5. Hero background must show:
   - black hole/accretion disk on the right-center
   - bright event-horizon glow near center-right
   - circular glowing emblem near center
   - small pixel astronaut standing near bottom-center of hero
   - faint Python/C++ code text on left and right
   - gritty stars, scanlines, noise, vignette
6. Below the hero, create a card grid. In the reference, the first visible row starts around y=450px.
7. Cards are dark translucent rectangles with thin borders, 4px radius, small thumbnail images, terminal-like labels, and muted timestamps.
8. Right card uses ASCII/terminal astronaut art style and a star sparkle beside it.
9. The entire page should feel like a retro terminal inside an observatory dashboard.

## Pixel layout guide for 1024×576

Use these relative positions as the desktop target:

```txt
Body width: 100vw
Main max width: 1100px
Title:
  x center
  y 18px
  height about 32px

Nav:
  y 70px
  height about 34px
  each nav item width 110–150px

Hero:
  y 108px
  height 335px
  full width
  black hole visual center approximately x=680, y=245
  bright disk extends from x=430 to x=860
  central logo/emblem x=515, y=248
  pixel astronaut x=512, y=380

Left code overlay:
  x=45, y=135
  opacity 0.22
  width about 300px

Right code overlay:
  x=770, y=125
  opacity 0.20
  width about 230px

Bottom quote:
  x=800, y=390
  width about 190px
  font size 12px

Cards:
  first row y=465
  left card x=90, w=325, h=84
  middle card x=425, w=325, h=84
  right card x=770, w=174, h=126
  gap 12px
```

## CSS direction

Use fixed visual ratios, not generic marketing layout. Recommended CSS:

- Body background: `#070d13`
- Text: `#c8d5e2`
- Muted text: `#7c8d9c`
- Borders: `rgba(135,160,185,.22)`
- Card background: `rgba(6, 11, 17, .72)`
- Backdrop blur: `blur(5px)`
- Font stack:
  `Orbitron, Rajdhani, Oxanium, Share Tech Mono, IBM Plex Mono, monospace`

Use pseudo-elements for:
- scanlines
- vignette
- noise
- subtle top/bottom horizontal frame lines

## Important: image asset strategy

Do not try to reproduce the black hole with CSS only. Use generated image assets for:
- hero black hole background
- thumbnail black hole
- thumbnail deep field
- pixel astronaut

Then layer CSS overlays on top.

## Implementation style

- Make the page responsive, but optimize first for the supplied screenshot ratio.
- Do not add bright buttons, gradients, colorful accents, SaaS-style sections, rounded modern cards, or white backgrounds.
- No stock-photo feel.
- No generic astronaut illustration. It must be small, pixel-art-like.
- Keep text slightly imperfect/terminal-like.

## Output expectations

After implementation:
1. Run the dev server.
2. Take a screenshot at 1024×576.
3. Compare against `reference_landing_page.jpeg`.
4. Adjust spacing, opacity, card positions, font sizes, and hero crop until it visually matches.
5. Repeat until close.

Use the reference image as the ground truth.
