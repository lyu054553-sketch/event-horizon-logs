# Pixel-Level Visual Specification

## 1. Page Structure

```html
<body>
  <div class="screen-noise"></div>
  <header class="site-header">
    <h1>THE EVENT HORIZON LOGS</h1>
    <nav>...</nav>
  </header>

  <main>
    <section class="hero">
      <img class="hero-bg" />
      <pre class="code-left">...</pre>
      <pre class="code-right">...</pre>
      <div class="orb-logo">CP</div>
      <img class="astronaut" />
      <p class="hero-caption">Programmer by Day, Star Gazer by Night...</p>
    </section>

    <section class="card-grid">
      ...
    </section>
  </main>
</body>
```

## 2. Header

- Background transparent/dark.
- Title: centered, uppercase, letter spaced.
- Title glow should be subtle, not neon.
- Nav is centered underneath title.
- Nav item top line is smaller and muted.
- Nav item bottom line is slightly brighter.

## 3. Hero

Hero should look like one wide cinematic background behind the content.

Layer order:
1. base dark background
2. hero black-hole image
3. vignette
4. scanlines/noise
5. faint code overlays
6. logo/emblem
7. astronaut
8. small caption

The black hole should be large and partially cropped by the right side. Its bright disk crosses the center of the page.

## 4. CP/GH Logo Emblem

In the reference the emblem is a black circular disk with a pale glowing ring and bold geometric letters inside.

CSS approximation:
```css
.orb-logo {
  position: absolute;
  left: 50%;
  top: 47%;
  transform: translate(-50%, -50%);
  width: 112px;
  height: 112px;
  border-radius: 50%;
  background: radial-gradient(circle, #071017 0%, #02060a 62%, #d8e8f8 64%, rgba(190,220,255,.28) 100%);
  box-shadow: 0 0 38px rgba(200,225,255,.48), 0 0 90px rgba(160,190,220,.25);
}
```

Add 5–7 faint circular orbit lines around it.

## 5. Pixel Astronaut

- Use a pixel-art astronaut asset.
- Width around 38–48px at 1024px viewport.
- Position near `left: 50%; top: 250px` within hero, lower than logo.
- Add subtle shadow/glow below.

## 6. Code Overlays

Left code:
```txt
import astropy
import astropy

def visualize_warp_field(points):
    points, points = points[]
    event_horizon_radius = 2 * G * M / c**2
...
```

Right code:
```txt
#include <vector>
using namespace std;

int main() {
  vector<int> points(10);
  int entropy = 0;
...
```

Use monospace, 12px, color `rgba(130,150,170,.28)`, blur 0.1px.

## 7. Card Grid

Card style:
```css
.card {
  background: rgba(6,11,17,.72);
  border: 1px solid rgba(135,160,185,.22);
  border-radius: 4px;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.03);
}
```

Card content:
- Thumbnail 110×66
- Title 15–16px
- Tags 10px
- Timestamp muted

First row visible:
- left card: `Optimized Black Hole Rendering in Python`
- middle card: `My First Deep Field Image with a 10" Scope`
- right card: ASCII/terminal astronaut card

## 8. Texture

Use global pseudo elements:
```css
body::before { scanlines }
body::after { vignette/noise }
```

Noise should be subtle. The screenshot is grainy, not clean.
