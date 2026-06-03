# Fruit Trees of Toronto

An interactive map showing 67,000+ fruit and nut trees on public land across Toronto. Filter by species, ripening month, and explore detailed species guides.

## Getting Started

### Prerequisites

- Node.js 20+ (tested with 24.x)
- npm 10+

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:5173` with hot reloading.

### Build

```bash
npm run build
```

Produces a fully static site in `build/` that can be served by any static host (GitHub Pages, Netlify, Vercel, S3, etc.).

### Preview production build

```bash
npm run build && npm run preview
```

## Data Pipeline (ETL)

Tree data comes from the [City of Toronto Street Tree Data](https://open.toronto.ca/dataset/street-tree-data/) open dataset.

To refresh the data:

```bash
npm run etl
```

This downloads the full 530k+ row CSV, filters to ~67k fruit-bearing trees across 8 categories, and writes:

- `static/data/trees.geojson` — GeoJSON FeatureCollection
- `static/data/meta.json` — metadata (count, bounds, last updated)

## Architecture

- **Framework**: SvelteKit v2 + Svelte 5 (runes) + `adapter-static`
- **Map**: MapLibre GL JS v5 + Protomaps basemap (via PMTiles)
- **Data**: Static GeoJSON, filtered client-side via MapLibre expressions (GPU)
- **Styling**: CSS custom properties (design tokens) + Svelte scoped styles
- **Accessibility**: WCAG 2.1 AA — semantic HTML, ARIA, OS media queries for contrast/motion

### Project structure

```
src/
  routes/              Pages (SvelteKit file-based routing)
    +page.svelte       Home: full-screen map + filter bar
    species/           Species guide index + detail pages
    about/             About page
  lib/
    components/        11 Svelte components (flat)
    state/             2 stores: trees + filters
    categories.ts      8 fruit category definitions
    map-style.ts       MapLibre style + tree layer config
    a11y.ts            Focus trap + screen reader announcements
    types.ts           TypeScript interfaces
static/
  data/                GeoJSON + species JSON (ETL output)
  tiles/               PMTiles basemap (if self-hosted)
  icons/               8 SVG fruit category icons
scripts/
  etl.ts               Data pipeline script
tests/
  unit/                Vitest unit tests
  e2e/                 Playwright + axe-core e2e tests
```

### 8 fruit categories

| Category | Color | Example species |
|----------|-------|-----------------|
| Apple | #e41a1c | Apple, Sargents, wild crab |
| Cherry | #e78ac3 | Cherry, Japanese, choke |
| Peach | #ff7f00 | Peach |
| Pear | #a6d854 | Pear, Chanticleer, Bradford |
| Plum | #7570b3 | Plum, Canada plum |
| Apricot | #e5c494 | Apricot |
| Berry | #6699ff | Mulberry, Hackberry |
| Nuts | #a65628 | Walnut, Chestnut, Hazel, Butternut |

## Testing

```bash
# Unit tests
npm run test:unit

# E2E tests (builds first, then runs Playwright)
npm run test:e2e

# Type checking
npm run check
```

## Credits

- **Original Authors**: Tom Weatherburn & William Davis (2018)
- **Redesign**: Tom Weatherburn (2026)
- **Data**: City of Toronto Open Data
- **Basemap**: Protomaps & OpenStreetMap contributors
