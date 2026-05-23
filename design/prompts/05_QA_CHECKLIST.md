# Claude Code Visual QA Checklist

After implementation, use this checklist.

## Screenshot comparison

Take screenshot at:
- 1024×576
- 1440×810
- 390×844 mobile

Primary fidelity target is 1024×576.

## Check these first

- [ ] Title position matches reference.
- [ ] Title is not too small, not too bright.
- [ ] Nav sits exactly under title and uses two-line labels.
- [ ] Hero begins around y=108px.
- [ ] Black hole is centered right, not dead center.
- [ ] Bright accretion disk crosses behind the logo and astronaut.
- [ ] Logo/emblem is around center x, upper-mid hero.
- [ ] Pixel astronaut sits below logo, not too large.
- [ ] Code overlays are faint and readable only as texture.
- [ ] Cards begin around y=465px.
- [ ] Cards have thin borders, not thick modern outlines.
- [ ] Page has scanlines/noise/vignette.
- [ ] No bright CTA buttons were added.
- [ ] No colorful gradients were added.
- [ ] No generic stock-photo look.

## Common fixes

If the page looks too modern:
- reduce border radius
- reduce saturation
- use monospace/tech fonts
- add noise/scanlines
- remove bright buttons

If the page looks too clean:
- increase grain opacity
- add vignette
- lower contrast of secondary text

If black hole does not match:
- crop the hero image using `object-position: center 42%`
- move visual center right with `object-position: 58% center`
- add a dark overlay gradient on top

If cards are too dominant:
- lower card opacity
- reduce title size
- reduce card height
