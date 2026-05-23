# Copy-Paste Prompt for Claude Code

Use the attached `reference_landing_page.jpeg` as the only visual source of truth.

Build a pixel-close landing page called **THE EVENT HORIZON LOGS**.

Implement:
- `index.html`
- `src/styles.css`
- `src/main.js`
- an `assets/` directory

The design must match the screenshot:
- dark sci-fi terminal aesthetic
- top centered title
- two-line navigation
- hero black hole background
- central glowing CP/GH-style circular emblem
- pixel astronaut near the bottom center
- faint code overlays on left and right
- card grid below hero with dark translucent cards
- small astronomy/project thumbnails
- right-side terminal astronaut card
- scanlines, noise, vignette, thin borders

Optimize for a 1024×576 screenshot first. Use CSS media queries after that.

Precise layout:
- title top: 18px, centered
- nav top: 70px
- hero top: 108px, height: 335px
- cards top: 465px
- content max width: 1100px
- left card: x about 90px, width 325px, height 84px
- middle card: x about 425px, width 325px, height 84px
- right card: x about 770px, width 174px, height 126px

Use these colors:
- background #070D13
- card bg rgba(6,11,17,.72)
- border rgba(135,160,185,.22)
- primary text #C8D5E2
- muted text #7C8D9C

Generate or place assets:
- hero black hole wide image
- black hole thumbnail
- deep field thumbnail
- pixel astronaut PNG
- terminal astronaut SVG/card drawing
- noise texture

Important:
Do not modernize the layout.
Do not use bright colors.
Do not create a generic portfolio landing page.
Do not replace the pixel astronaut with a smooth 3D astronaut.
Do not use large CTA buttons.
Match the screenshot.

After coding, run the site, screenshot it at 1024×576, compare visually with the reference, and tune CSS until the differences are small.
