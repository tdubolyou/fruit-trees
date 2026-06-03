# Architecture & ETL Decisions

## App Structure

```
src/
  routes/                        SvelteKit file-based routing
    +layout.svelte               Root layout: header, skip link, live region
    +page.svelte                 Home page: full-screen map + filter bar
    species/+page.svelte         Species index (8 cards)
    species/[category]/          Dynamic species detail pages (prerendered)
    about/+page.svelte           About / credits / data sources
    +error.svelte                Accessible error page
  lib/
    components/                  11 Svelte 5 components (flat, no subfolders)
      Map.svelte                 MapLibre GL init, tree layer, popup wiring
      FilterBar.svelte           Category pills + month slider (doubles as legend)
      CategoryPill.svelte        role="switch" toggle per fruit category
      MonthSlider.svelte         Range input filtering by ripening month
      TreePopup.svelte           Accessible dialog for selected tree details
      SpeciesCard.svelte         Card linking to a species guide
      SpeciesDetail.svelte       Full species guide layout
      Icon.svelte                SVG loader (aria-hidden when decorative)
      SkipLink.svelte            Skip-to-content link
      VisuallyHidden.svelte      Screen-reader-only text wrapper
      LiveRegion.svelte          aria-live="polite" announcer
    state/
      trees.svelte.ts            Tree GeoJSON store ($state.raw — no deep proxy)
      filters.svelte.ts          Active categories + month; derives MapLibre filter expr
    categories.ts                8 category definitions (id, color, species[], ripeningMonths)
    map-style.ts                 Basemap style JSON + tree circle paint properties
    a11y.ts                      Focus trap action + announce() helper
    types.ts                     FruitTreeProperties, SpeciesGuide, TreeMeta
static/
  data/trees.geojson             67k fruit tree features (ETL output, ~12 MB)
  data/meta.json                 { lastUpdated, count, bounds }
  data/species/*.json            8 species guide content files
  icons/*.svg                    8 fruit category icons
scripts/
  etl.ts                         Single-file data pipeline
```

## Key architectural decisions

**Static-first.** The entire app is a SvelteKit static site (`adapter-static`). No server, no database, no serverless functions. Every page is prerendered at build time. Data files are fetched client-side from `/static/data/`.

**MapLibre over Mapbox.** Open-source, no usage-based pricing, excellent PMTiles support. The basemap comes from Protomaps (free tier API) — a single vector tile source styled client-side with a dark theme optimised for fruit tree visibility.

**GPU-level filtering.** Category and month filters produce a MapLibre `ExpressionSpecification` that is applied directly to the tree layer via `map.setFilter()`. No JavaScript loops over 67k features — the GPU evaluates the expression.

**Two stores, not four.** MapLibre owns viewport state (center, zoom, bearing). OS media queries own user preferences (contrast, motion, color scheme). Only tree data and filter state live in Svelte stores.

**Flat component folder.** 11 components in a single `components/` directory. No `map/`, `ui/`, `layout/` subfolders — the project isn't large enough to warrant nesting.

## ETL decisions

### Source

The City of Toronto [Street Tree Data](https://open.toronto.ca/dataset/street-tree-data/) CSV. ~689k rows, ~145 MB. Updated periodically by Urban Forestry staff.

### Why CSV over GeoJSON

The source dataset offers both formats. The GeoJSON weighs 343 MB vs 145 MB for CSV. Parsing CSV line-by-line in the ETL avoids loading the entire GeoJSON into memory, and lets us skip non-fruit rows immediately.

### Species matching

The 2018 version of the app used uppercase names like `APPLE`, `CHERRY`, `CHOKE CHERRY`. The current dataset uses mixed-case names like `Apple, Sargents`, `Cherry, Japanese Kwanzan`, `Hackberry, Magnifica`.

We define an explicit allowlist in `categories.ts` mapping every known `COMMON_NAME` value to one of 8 categories. The ETL builds a `Map<string, Category>` lookup — any tree whose `COMMON_NAME` isn't in the map is silently skipped.

### What's included vs excluded

| Included (67,539 trees) | Excluded |
|---|---|
| Apple (all cultivars + crabapples) | Horsechestnut (toxic, not edible) |
| Cherry (all: Japanese, choke, pin, sour, sweet) | Witch-hazel (not true hazel) |
| Peach, Pear, Plum, Apricot | All non-fruit species (~620k trees) |
| Berry (Mulberry spp., Hackberry) | |
| Nuts (Walnut, Chestnut, Hazel, Butternut) | |

Dogwood cornelian cherry is included under "cherry" because its fruit is technically edible.

### Coordinate precision

Source coordinates have 13 decimal places (~0.01mm precision). The ETL rounds to 6 decimal places (~0.1m), which is more than adequate for street-tree mapping and saves ~2 MB in output.

### Properties kept per feature

```json
{
  "id": 12345,
  "species": "Apple, Sargents",
  "category": "apple",
  "dbh": 32,
  "address": "123 MAIN ST"
}
```

`ripeningMonths` is deliberately omitted from each feature — it's derivable from the category at runtime and would add ~1 MB across 67k records. The client looks it up from `categories.ts`.

### Output

- `static/data/trees.geojson` — GeoJSON FeatureCollection, ~12.4 MB uncompressed
- `static/data/meta.json` — `{ lastUpdated, count, bounds }` for display and map initialization
