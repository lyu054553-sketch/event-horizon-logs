# Starter CSS Snippet for Claude Code

```css
:root {
  --bg: #070d13;
  --panel: rgba(6, 11, 17, .72);
  --panel-deep: rgba(4, 9, 13, .86);
  --border: rgba(135, 160, 185, .22);
  --border-hover: rgba(190, 215, 238, .38);
  --text: #c8d5e2;
  --muted: #7c8d9c;
  --faint: #5c6b78;
  --glow: rgba(190, 220, 255, .55);
}

* { box-sizing: border-box; }

html, body {
  width: 100%;
  min-height: 100%;
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: "Share Tech Mono", "IBM Plex Mono", monospace;
  overflow-x: hidden;
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 50;
  background:
    repeating-linear-gradient(
      to bottom,
      rgba(220, 235, 255, .035) 0,
      rgba(220, 235, 255, .035) 1px,
      transparent 1px,
      transparent 4px
    );
  mix-blend-mode: screen;
}

body::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 51;
  background:
    radial-gradient(circle at 50% 45%, transparent 0 42%, rgba(0,0,0,.42) 100%),
    linear-gradient(to bottom, rgba(0,0,0,.15), rgba(0,0,0,.45));
}

.site-header {
  height: 108px;
  position: relative;
  z-index: 5;
  text-align: center;
  background: linear-gradient(to bottom, rgba(7,13,19,.95), rgba(7,13,19,.65), transparent);
}

.site-title {
  margin: 0;
  padding-top: 18px;
  font-family: Orbitron, Rajdhani, Oxanium, monospace;
  font-size: clamp(24px, 3vw, 36px);
  line-height: 1;
  letter-spacing: .13em;
  font-weight: 700;
  color: #d4e4f3;
  text-shadow: 0 0 16px rgba(190,220,255,.35);
}

.nav {
  margin: 22px auto 0;
  display: flex;
  justify-content: center;
  align-items: start;
  gap: 28px;
  font-size: 11px;
  letter-spacing: .04em;
}

.nav a {
  color: var(--muted);
  text-decoration: none;
  text-transform: uppercase;
}

.nav span {
  display: block;
}

.nav .sub {
  color: #b9c7d5;
}

.hero {
  position: relative;
  height: 335px;
  margin-top: -1px;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 58% 44%;
  filter: contrast(1.05) brightness(.9) saturate(.45);
}

.hero::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to bottom, rgba(7,13,19,.22), transparent 24%, transparent 68%, #070d13 100%),
    radial-gradient(circle at 66% 48%, rgba(220,235,255,.12), transparent 28%);
}

.code-overlay {
  position: absolute;
  z-index: 2;
  top: 28px;
  color: rgba(130, 150, 170, .28);
  font-size: 12px;
  line-height: 1.45;
  white-space: pre;
  text-shadow: 0 0 8px rgba(160,190,220,.12);
}

.code-left { left: 45px; }
.code-right { right: 45px; }

.orb-logo {
  position: absolute;
  z-index: 3;
  left: 50%;
  top: 43%;
  transform: translate(-50%, -50%);
  width: 112px;
  height: 112px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: radial-gradient(circle, #071017 0%, #02060a 60%, #d8e8f8 64%, rgba(190,220,255,.16) 100%);
  box-shadow: 0 0 38px rgba(200,225,255,.48), 0 0 90px rgba(160,190,220,.25);
  color: #d9e9f8;
  font-family: Orbitron, monospace;
  font-size: 48px;
  font-weight: 800;
  letter-spacing: -.08em;
}

.astronaut {
  position: absolute;
  z-index: 4;
  left: 50%;
  top: 245px;
  transform: translateX(-50%);
  width: 46px;
  image-rendering: pixelated;
  filter: drop-shadow(0 18px 12px rgba(0,0,0,.7)) drop-shadow(0 0 8px rgba(170,210,255,.25));
}

.hero-caption {
  position: absolute;
  z-index: 4;
  right: 48px;
  bottom: 22px;
  width: 190px;
  margin: 0;
  color: rgba(185, 200, 215, .72);
  font-size: 12px;
  line-height: 1.25;
}

.card-grid {
  position: relative;
  z-index: 6;
  max-width: 850px;
  margin: 12px auto 0;
  display: grid;
  grid-template-columns: 325px 325px 174px;
  gap: 12px;
}

.card {
  min-height: 84px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 4px;
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 12px;
  padding: 8px;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.03);
}

.card img {
  width: 110px;
  height: 66px;
  object-fit: cover;
  border-radius: 3px;
  filter: grayscale(.65) contrast(1.1) brightness(.85);
}

.card h2 {
  margin: 2px 0 6px;
  font-size: 15px;
  line-height: 1.1;
  color: var(--text);
}

.tags {
  color: #9fb0c1;
  font-size: 10px;
}
```
