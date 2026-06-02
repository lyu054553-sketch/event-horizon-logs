# THE EVENT HORIZON LOGS

Dark sci-fi personal blog for a programmer who loves the cosmos. Terminal-ui aesthetic, black-hole/starfield visual language, low-saturation blue-gray palette.

## Project Structure

```
event-horizon-logs/
├── react-app/                  ← Main application (React + Vite + TypeScript)
│   ├── src/
│   │   ├── App.tsx             ← Router (BrowserRouter + Routes)
│   │   ├── main.tsx            ← Entry point
│   │   ├── index.css           ← Global design system & all styles
│   │   ├── i18n.tsx            ← Internationalization (EN / ZH)
│   │   ├── pages/
│   │   │   ├── Home.tsx        ← Landing: hero video + scroll to video section
│   │   │   ├── About.tsx       ← bio_func() — terminal-style personal page
│   │   │   ├── Code.tsx        ← Code Explorations — project cards grid
│   │   │   └── Contact.tsx     ← Message Queue — terminal-form contact page
│   │   └── components/
│   │       ├── Layout.tsx      ← Shared layout (non-home pages)
│   │       ├── Navbar.tsx      ← Navigation bar (language toggle + nav links)
│   │       ├── LeoMark.tsx     ← Central LEO logo mark
│   │       ├── Starfield.tsx   ← Animated starfield background
│   │       └── react-bits/     ← Third-party components (LetterGlitch)
│   ├── public/assets/          ← All image, video, and icon assets
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
├── vercel.json                 ← Deployment config
└── CLAUDE.md                   ← This file
```

## Home Page Structure

The home page has two full-screen sections:

1. **Hero Section** (`home-container`): Video background (dark space, 0.5x speed), central LEO mark with parallax, transparent navbar (right-aligned nav links + language toggle), scroll-down arrow
2. **Video Section** (`home-video-section`): Astronaut falling video background, centered title "Exploring the Cosmos" (Playfair Display), description text, floating terminal text (top-left, hover-to-brighten interaction)

## Design System

- **Base:** `#03070b` (near-black)
- **Cards:** `rgba(4, 10, 16, 0.42)` with `backdrop-filter: blur()`
- **Borders:** `rgba(160, 180, 200, 0.16)` → `0.35` on hover
- **Text:** `rgba(230, 240, 255, 0.82)` (primary), `rgba(235, 242, 255, 0.85)` (bright), `rgba(150, 165, 180, 0.45)` (muted)
- **Accent:** `rgba(100, 190, 230, 0.75)` (cold blue), glow `rgba(180, 215, 255, 0.35)`
- **Fonts:** JetBrains Mono (body/code), Orbitron (display/headings), Playfair Display (hero titles), Inter (UI/sans)
- **Effects:** Scanline overlay, noise texture, vignette, parallax mouse tracking

## Key CSS Variables

All in `@theme` block in `react-app/src/index.css`:
```css
--color-bg, --color-bg-alt, --color-bg-card, --color-bg-card-hover,
--color-border, --color-border-hover,
--color-text, --color-text-bright, --color-muted,
--color-accent, --color-accent-glow,
--font-mono, --font-display, --font-sans
```

## Navigation

Four pages linked via the navbar (transparent on home, dark glass on other pages):
`~/home`, `./bio_func`, `~/code`, `~/contact`

Language toggle: EN / 中文 (via i18n context).

## Video Assets

Located in `react-app/public/assets/`:
- `backgrounds_home_dark_space.mp4` — Hero section background (played at 0.5x speed)
- `backgrounds_astronaut_falling.mp4` — Video section background (plays when visible via IntersectionObserver)

## Design Rules

1. Never use bright/saturated colors. Stay in the `#03070b`–`#C7D3E0` range.
2. Home page has its own layout (no shared Layout wrapper). Other pages use `Layout.tsx` with starfield, noise, scanlines, and navbar.
3. Cards have `border`, `backdrop-blur`, and hover glow effects.
4. Responsive: single-column on mobile, nav hidden on small screens.
5. No modern SaaS aesthetic. This is retro-terminal + astronomy-log style.
6. New pages must extend the existing CSS variables, not redefine styles.
7. Videos: muted, loop, playsInline. Use IntersectionObserver for auto-play/pause.
