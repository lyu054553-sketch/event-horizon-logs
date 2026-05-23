# THE EVENT HORIZON LOGS

Dark sci-fi personal blog for a programmer who loves the cosmos. Terminal-ui aesthetic, black-hole/starfield visual language, low-saturation blue-gray palette.

## Project Structure

```
event-horizon-logs/
├── index.html              ← Home / Landing (Hero + cards + terminal status)
├── about.html              ← bio_func() — terminal-style personal page
├── code.html               ← Code Explorations — project cards grid
├── contact.html            ← Message Queue — terminal-form contact page
├── css/style.css           ← Shared design system (734 lines)
├── js/main.js              ← Nav toggle, scroll effects, card animations
├── assets/                 ← Symlinks to image components
├── design/                 ← Design reference materials
│   ├── prompts/            ← Claude Code prompts & visual spec
│   ├── references/         ← Image component manifest & README
│   └── mockups/            ← Generated visual mockups
└── CLAUDE.md               ← This file
```

## Design System

- **Base:** `#050A0F` (near-black)
- **Cards:** `rgba(8, 14, 20, 0.72)` with `backdrop-filter: blur()`
- **Borders:** `rgba(154, 178, 199, 0.22)` → `0.45` on hover
- **Text:** `#C7D3E0` (primary), `#E8EDF2` (bright), `#7C8D9C` (muted)
- **Accent:** `#4A8DB7` (cold blue), glow `rgba(74, 141, 183, 0.3)`
- **Fonts:** JetBrains Mono (body), Orbitron (display/headings)
- **Effects:** Scanline overlay, noise texture, code-snippet overlays on left/right edges

## Key CSS Variables

All in `:root` in `css/style.css`:
```css
--bg, --bg-card, --bg-card-hover, --border, --border-hover,
--text, --text-bright, --muted, --accent, --accent-glow,
--font-mono, --font-display
```

## Navigation

Four pages linked via the fixed top navbar (`<OBSERVER/>` logo + `~/home`, `./bio_func`, `~/code`, `~/contact`).

## Image Assets

Located in `assets/` (symlinks to `/Users/liuyang/Downloads/event_horizon_image_components/`):
- **Backgrounds:** `backgrounds_hero_black_hole_wide.png`, `backgrounds_site_starfield.png`, `backgrounds_astronomy_galaxy_banner.png`, `backgrounds_contact_blackhole_panel.png`
- **Sprites:** `sprites_pixel_astronaut.png`, `sprites_pixel_astronaut_small.png`
- **Overlays:** `overlays_code_left.png`, `overlays_code_right.png`
- **Thumbnails:** `thumbnails_black_hole_renderer.png`, `thumbnails_gravity_sandbox.png`, `thumbnails_deep_field_cataloger.png`, `thumbnails_terminal_portfolio_engine.png`, `thumbnails_neural_sky_classifier.png`, `thumbnails_star_trail_generator.png`
- **Panels:** `ui_panel_frame.png`, `ui_telemetry_panel.png`
- **Icons (SVG):** `icons_compass.svg`, `icons_github.svg`, `icons_mail.svg`, `icons_signal.svg`, `icons_star.svg`, `icons_telescope.svg`, `icons_terminal.svg`

## Design Rules

1. Never use bright/saturated colors. Stay in the `#050A0F`–`#C7D3E0` range.
2. Every page uses the same navbar and background layers.
3. Cards have `border`, `backdrop-blur`, and `hover:scale-[1.02]` + glow.
4. Responsive: single-column on mobile, hamburger menu toggle.
5. No modern SaaS aesthetic. This is retro-terminal + astronomy-log style.
6. New pages must extend the existing CSS variables, not redefine styles.

## Reference Prompts

See `design/prompts/` for the original Claude Code master prompts, visual spec, QA checklist, and CSS tokens that guided the initial build.
