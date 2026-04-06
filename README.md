# Product Image Gallery Component

A responsive, accessible image gallery with lightbox functionality.

## Approach

### Architecture
- **Vanilla TypeScript** — no frameworks, compiled to ES2020
- **BEM methodology** for CSS — two blocks: `.gallery` (main component) and `.lightbox` (modal)
- **Mobile-first** responsive design with a single breakpoint at 768px

### Accessibility
- Full keyboard navigation: Arrow keys for image cycling, Escape to close lightbox, Tab for interactive elements
- Focus trapping inside lightbox modal when open
- Focus restoration to trigger element on lightbox close
- `aria-modal`, `aria-label`, `aria-current` for screen reader support
- `prefers-reduced-motion` respected
- All interactive elements reachable via keyboard with visible focus indicators
- Thumbnail images marked `aria-hidden="true"` (decorative) — button labels provide context

### Responsive behavior
- **Mobile (< 768px):** Full-bleed main image, left/right arrow navigation, no lightbox
- **Desktop (≥ 768px):** Contained image with border-radius, thumbnail navigation, click-to-open lightbox with arrow + thumbnail navigation

### What I would improve with more time
- Touch/swipe gestures for mobile image navigation
- Image preloading for smoother transitions
- Animated transitions between images

## Running locally

```bash
# Compile TypeScript
npx tsc

# Serve (any static server works)
npx serve .
```

## File structure

```
├── index.html       # Semantic HTML with ARIA attributes
├── styles.css       # BEM-structured CSS, mobile-first
├── gallery.ts       # TypeScript source
├── gallery.js       # Compiled output
├── tsconfig.json
├── assets/
│   ├── products/    # Full-size product images
│   ├── thumbnails/  # Thumbnail images
│   └── icons/       # SVG icons (arrows, close)
└── README.md
```
# elisa-assignment
