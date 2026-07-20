# Fable-5 · Protein Drink Landing Pages

Two landing page concepts for a fictional protein drink brand, built in different visual directions.

## ARGENT (current) · `lux/`

A cold-luxury take: obsidian and platinum, Cormorant Garamond serif, generous whitespace,
and slow cinematic scroll choreography. Built as a React app.

**Stack:** Vite, React 19, Tailwind v4, GSAP + ScrollTrigger, Lenis, Motion, OGL

```bash
cd lux
npm install
npm run dev        # http://localhost:5173
```

### Sections

| Section | Motion |
| --- | --- |
| Hero | Liquid-chrome WebGL backdrop, masked line reveals |
| Pour | Parallax drift on the vessel |
| Editions | Pinned scroll morph across three editions (wash, label, and name crossfade in sync) |
| Philosophy | Word-by-word blur-to-focus reveal |
| Composition | Hairline stat columns with counting numbers |
| Voices | Staggered quote reveal |
| Reserve | Metallic sheen wordmark, magnetic CTA |

### Credits

- [React Bits](https://github.com/DavidHDev/react-bits) — LiquidChrome, ScrollReveal, CountUp, ShinyText
  (vendored into `src/components/reactbits/`, patched for offscreen pausing and scoped GSAP cleanup)
- [21st.dev](https://21st.dev) — `Magnetic` by [@ibelick](https://21st.dev/@ibelick), converted TS to JSX

## PUNCH (superseded) · repo root

The earlier neo-brutalist direction: hot pop colors, thick borders, hard offset shadows.
Static HTML/CSS/JS, no build step.

```bash
python -m http.server 4173    # http://localhost:4173
```

## Motion and accessibility

Both pages respect `prefers-reduced-motion` and ship a fully static fallback with all content
visible. Append `?motion=1` to force animations on when the OS reports reduced motion
(useful on Windows with "Animation effects" disabled).

## Note

ARGENT and PUNCH are fictional brand concepts. All nutrition values shown are illustrative.
