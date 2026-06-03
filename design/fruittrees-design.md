# Fruit Trees of Toronto — Design Specification

A modernization of the existing mapTO Fruit Trees web map. Source data is the City of Toronto's 2017 street tree inventory, filtered to fruiting species. This document is the design contract: a Svelte implementation built against this spec, the accompanying `fruittrees-tokens.json`, and the source data should produce the intended result without further design input.

The companion file `fruittrees-tokens.json` is the single source of truth for color, typography, spacing, motion, and layout values. This document explains the reasoning behind those tokens and the behaviors not captured in a token file.

## Project intent

The piece is an editorial information map, not a consumer app. It exists to let a Torontonian browse the city's fruit tree distribution by species, size, and ripening season. The original 2018 version established the visual identity — saturated categorical dots on a dark basemap, dense and honest — but its UI is dated and its controls underdeveloped. The modernization preserves the cartographic identity and rebuilds the surrounding interface as a designed object.

The audience is a Toronto urbanist, planner, journalist, or curious resident. Not a novice user who needs hand-holding. Treat them accordingly: dense information presented confidently, no tutorials, no onboarding modals.

### Aesthetic register

Editorial. Restrained. The closest reference points are Reuters Graphics, the Pudding, and Stamen's older atlas work — not consumer mapping apps. Decisions throughout this document trend toward less rather than more: small radii rather than large, semibold rather than bold, hairline borders rather than visible ones, fast transitions rather than expressive ones. When a design decision could go either way, choose the more reserved option.

### Non-goals

The following are explicitly out of scope and should be resisted:

- Search bar or address lookup
- Basemap style toggle (light/dark switching)
- Layer opacity sliders
- Share-this-view URL generation
- Social share buttons
- Tutorial overlays or first-run modals
- Heatmap or aggregated visualization modes
- User accounts or saved views

The piece is a single-focus instrument. Every added control dilutes it.

## Stack and architecture

### Framework

SvelteKit with TypeScript. Static adapter for GitHub Pages deployment (the existing site lives at `tdubolyou.github.io/FruitTrees`).

### Map

MapLibre GL JS. Mapbox-compatible API, no token required, open-source. Basemap should be a stripped-down dark style — Protomaps or a custom MapLibre style with only roads, water, and major place labels. Strip out:

- Building footprints
- Transit lines and stops
- Neighborhood labels
- Park labels beyond the largest (High Park, Don Valley)
- Points of interest

What remains: major arterials, highways, water, ward boundaries optional, major place names (Toronto, Scarborough, North York, Etobicoke, York, East York). Less basemap means more dots.

### Data

Source: City of Toronto Open Data, Street Tree Inventory. Pre-process at build time into a Protomaps `.pmtiles` archive containing only fruiting species. Fields required per point:

- `species` — common name
- `category` — one of: apple, apricot, peach, plum, cherry, pear, berries, nuts
- `dbh_cm` — diameter at breast height
- `ripening_month` — integer 0–11
- `lat`, `lng`

Pre-compute the category mapping in a build script; do not parse species strings at render time.

### Styling

CSS custom properties generated from the token file. Use Style Dictionary or a small custom build step to transform `fruittrees-tokens.json` into:

- `src/lib/tokens.css` — all tokens as `--` properties on `:root`
- `src/lib/tokens.ts` — TypeScript exports for any tokens consumed by JS (slider geometry, daylight curve coordinates, motion durations)

Reference token names in this document use the JSON path. A component that consumes `color.ink.primary` should resolve to `var(--color-ink-primary)` in CSS or `tokens.color.ink.primary` in TS.

### Fonts

Self-hosted via `@fontsource` or equivalent. Required:

- **Fraunces** — variable, including the `opsz` and `SOFT` axes
- **Inter** — variable
- **JetBrains Mono** — regular weight only

Load with `font-display: swap`. Subset to Latin if file size matters.

## Color decisions

### The two-palette decision

The token file ships two complete fruit palettes — `systematized` and `botanical` — under `color.fruit`. Choose one and remove the other before shipping. The decision is a designer/owner call, not an implementation call. Default to `botanical` unless directed otherwise; it's the more disciplined choice and aligns with the editorial register.

Whichever is chosen, the eight fruit colors are the only categorical hues in the entire interface. Do not introduce other colors — no success greens, no error reds, no info blues. If a state needs to be communicated, use opacity, weight, or position.

### Off-white over pure white

`color.ink.primary` is `#F5F4F1`, not `#FFFFFF`. Pure white on dark backgrounds vibrates at the pixel level and reads as default rather than designed. The warm off-white is the single most important non-fruit color choice; do not substitute it.

### Backdrop blur

Sidebar cards use `color.bg.panel` at 78% opacity with `backdrop-filter: blur(12px)`. The blur lets dot density underneath the cards show through faintly, which (a) reminds the user the map continues beneath the UI and (b) prevents the cards from reading as cutouts. On browsers without backdrop-filter support, fall back to 92% opacity solid fill.

## Typography decisions

### Fraunces + Inter pairing

Fraunces is an editorial serif with serious display presence and an unusually broad weight range. Inter is the most reliable variable grotesk for UI text at small sizes. The pairing is intentional: the title carries personality, everything functional gets out of the way.

Use the Fraunces `opsz` (optical size) axis. At display sizes (32px+), set `font-variation-settings: 'opsz' 96` or higher. At subtitle sizes (18px), use `'opsz' 24`. This is what gives the title its editorial presence; default optical sizing makes Fraunces look generic.

### Italics carry weight here

Three places use italic Fraunces:

1. The subtitle ("By Type, Size and Ripening Month")
2. The descriptor lines under fruit categories ("Cherry, Choke, Purpleleaf, Sargent")
3. The slider helper text ("Drag to filter by month")

Italic signals "this is secondary, contextual, parenthetical." It's the editorial move that makes the piece feel like print rather than UI. Do not substitute with reduced weight or opacity alone.

### Semibold is the ceiling

No element uses font-weight above 600. Heavy weights at small sizes on dark backgrounds produce the "consumer app" feel the piece is designed to avoid. If something needs more emphasis, use the next size up at semibold rather than the same size at bold.

### Tabular figures everywhere numeric

Counts, slider tick labels, coordinate readouts: use JetBrains Mono with `font-variant-numeric: tabular-nums`. Alignment matters even when the values appear in isolation; tabular figures signal "this is data" without needing a label.

## Layout

### The sidebar is three cards, not one panel

The original map's biggest visual liability is the monolithic black box containing title, legend, and slider. The modernization splits these into three separate cards with 12px gaps between them. The gap is small enough that they read as a group, large enough that each card is a discrete designed object.

Card stack, top to bottom:

1. **Title block** — title, subtitle, attribution
2. **Layer toggles** — eight interactive fruit category pills, section header, footer note
3. **Seasonal slider** — daylight curve, month band, thumb, conditional reset button

Detailed dimensions are in `layout.card.*` and `layout.sidebar.*` in the token file. Total stacked height is ~834px, fitting within a 900px viewport with 24px top/bottom offsets.

### What lives outside the sidebar

- **Map** — fills remaining viewport
- **MapLibre zoom/compass controls** — top-right, 24px from edges, using MapLibre defaults restyled to match the panel aesthetic
- **MapLibre attribution** — bottom-right, MapLibre default
- **Methodology trigger** — small "?" button, bottom-left of map at 24px offset, opens a modal with data sourcing, coverage notes, methodology

Nothing else. No floating tooltips on launch, no overlay toasts, no callout balloons.

### Responsive breakdown

This document specifies the desktop reference. Implementation should ship responsive behavior, summarized:

- **Mobile (< 768px)** — title shrinks to one line (no subtitle, or subtitle below title at same size), toggles collapse into a bottom sheet with drag handle, slider docks above the sheet at full width
- **Tablet (768–1023px)** — sidebar narrows to 280px, otherwise unchanged
- **Desktop (1024px+)** — full 320px sidebar as specified
- **Wide desktop (1920px+)** — optionally promote title to `font.size.3xl`

Color, typography, and motion tokens do not change across breakpoints. Only layout primitives.

## Component specifications

### Title block

The simplest card. Three lines of content, no interaction.

```
┌──────────────────────────┐
│ The Fruit Trees          │  ← display-lg, 32px Fraunces medium
│ of Toronto               │     can wrap to two lines
│ By Type, Size and        │  ← subtitle, 18px Fraunces italic
│ Ripening Month           │
│                          │     16px gap
│ Source: City of Toronto  │  ← caption, 10px Inter, ink/tertiary
│ By Tom Weatherburn …     │     links underline on hover only
│ © mapTO 2018             │
└──────────────────────────┘
```

Links in attribution: `color.ink.secondary` resting, `color.ink.primary` on hover, underline appears on hover at `text-decoration-thickness: 1px` and `text-underline-offset: 2px`. Update the year in the copyright to current year.

### Layer toggle card

Eight pills in a vertical stack. Each pill represents one fruit category. Clicking toggles visibility of that layer on the map.

#### Pill anatomy

```
┌─────────────────────────────────────────┐
│  ●  Apple                       8,432   │  ← 36px tall
└─────────────────────────────────────────┘
   ↑   ↑                           ↑
   10px 10px gap to label          mono count, right-aligned
   dot, fruit color                ink/tertiary
```

Internal layout: flex row, `align-items: center`, gap from `layout.toggle-pill.internal-gap` (10px). Dot fixed 10px square, fully rounded. Label uses `font.style.label-lg`. Count uses `font.style.count`, `margin-left: auto` to push right.

#### Pill states

**Resting**
- Background: transparent (lets card show through)
- Border: 1px `color.border.subtle`
- Dot: fruit color at 100%
- Label: `color.ink.primary`
- Count: `color.ink.tertiary`

**Hover**
- Border: 1px `color.border.strong`
- Transition `motion.duration.fast` ease-out
- No other changes

**Active (layer visible — default state for all eight on load)**
- Background: fruit color at `color.fruit.derived.tint-opacity` (12%)
- Border: fruit color at `color.fruit.derived.border-opacity` (50%)
- Dot: fruit color at 100%
- Label: `color.ink.primary`

**Inactive (toggled off)**
- Background: transparent
- Border: 1px `color.border.subtle`
- Dot: fruit color at `color.fruit.derived.dim-opacity` (40%), or rendered as a 1px ring with no fill at the same color
- Label: `color.ink.primary` at 40% opacity
- Count: `color.ink.tertiary` at 60% opacity

**Focus**
- Outline: 2px `color.ink.primary`, `outline-offset: 2px`
- Standard keyboard focus, not visible on mouse interaction (`:focus-visible`)

#### Solo interaction (optional, power-user)

Shift-click on a pill: that fruit becomes the only active layer; all others toggle off. Shift-click again: all layers return to active. This is a quality-of-life addition for users comparing distributions; not essential, but it's the kind of detail that signals care. Do not document this in any UI — discoverability via instinct is the point.

#### Section structure

```
┌──────────────────────────────────────────┐
│                                          │
│  LAYERS                                  │  ← heading-sm, uppercase, tracked
│                                          │
│  ● Apple                       8,432     │
│  ● Apricot                       142     │
│  ● Peach                         289     │
│  ● Plum                        1,205     │
│  ● Cherry                      3,447     │
│  ● Pear                        2,891     │
│  ● Berries                     1,876     │
│  ● Nuts                          954     │
│                                          │
│  Circle size = trunk diameter            │  ← descriptor, italic, secondary
│  at 1.3m                                 │
│                                          │
└──────────────────────────────────────────┘
```

Counts are real counts from the dataset, formatted with thousands separator (`8,432` not `8432`). Compute at build time from the source data and inline into the component or expose via a generated `counts.json`.

The descriptor at the bottom replaces the original map's "Circle size depicts measurement of diameter at breast height (1.3 m)" — slightly shorter, italic, less prominent.

### Seasonal slider

The most complex component. Three layered elements: month label band, daylight curve, thumb. Operates as a range slider (two thumbs), not a single point.

#### Visual structure

```
┌──────────────────────────────────────────┐
│                                          │
│  RIPENING SEASON                         │  ← heading-sm
│  Drag to filter by month                 │  ← descriptor, italic
│                                          │
│  ┌────────────────────────────────────┐  │
│  │       ____                          │  │  ← daylight curve, off-white 30%
│  │     /      \\                       │  │     SVG path, 1.5px stroke
│  │   /          \\                     │  │     under thumbs, over tint band
│  │  /            \\                    │  │
│  │ /              \\___                │  │
│  │_                    \\___           │  │  ← seasonal tint band
│  │                          ‾‾‾        │  │     winter@15% → summer@15% → winter
│  │  J F M A M J J A S O N D            │  │  ← month labels, label-sm, tertiary
│  └────────────────────────────────────┘  │
│                                          │
│                          [Clear filter]  │  ← only visible when range != full
│                                          │
└──────────────────────────────────────────┘
```

Track width 280px, height 72px (`layout.slider.track-width`, `layout.slider.track-height`). Month label band 14px below.

#### Daylight curve

SVG path drawn from `data.season.daylight-hours-by-month` in the token file. Twelve points, one per month, positioned at the 15th of the month horizontally. Use a smooth spline (Catmull-Rom or basis spline) to interpolate between points; do not use straight line segments.

Y-axis: map `data.season.daylight-min` (8.90 hours) to the bottom of the curve area, `data.season.daylight-max` (15.55 hours) to the top. Leave ~6px padding at top and bottom so the curve doesn't touch the track edges.

X-axis: 12 monthly positions evenly spaced across the 280px track width. Month center positions at `(month + 0.5) * (280 / 12)` = month center pixels from left.

Stroke: `color.season.daylight` at `opacity.daylight-curve` (30%), 1.5px width, no fill. Render this as a static SVG element — it never animates or changes.

#### Seasonal tint band

Behind the curve, behind the thumbs. A horizontal gradient interpolating:

- Position 0 (January start): `color.season.winter` at `opacity.season-tint` (15%)
- Position 0.5 (June/July): `color.season.summer` at `opacity.season-tint` (15%)
- Position 1 (December end): `color.season.winter` at `opacity.season-tint` (15%)

CSS linear-gradient is sufficient. This is purely atmospheric; it doesn't move or respond.

#### Thumbs

Two thumbs, one for range start, one for range end. Each thumb:

- Vertical lozenge, 4px wide × 56px tall (`layout.slider.thumb-width`, `thumb-height`)
- Fully rounded (`border-radius: 2px` — half the width)
- Fill: `color.ink.primary`
- Centered vertically in the 72px track area
- Drag handle: extends 8px on each side of the visible thumb (16px wide hit target)

**Hover/active**: scale to `layout.slider.thumb-hover-scale` (1.15), transform-origin center. Transition `motion.duration.instant` ease-out.

**Floating label on drag**: when a thumb is being dragged, show the current month name (full word: "March", "August") in a small label above the thumb, following its position. Label uses `font.style.label-sm`, no background, `color.ink.primary`. Disappears 400ms after drag ends.

#### Range behavior

Default state on load: full range (January through December), no filter applied. All dots visible.

Dragging either thumb constrains the range. The range is inclusive: if start=March and end=July, show only trees with `ripening_month` in {2, 3, 4, 5, 6} (zero-indexed: March is 2, July is 6).

Track between thumbs: subtly highlighted to show the active range. Add a 2px tall horizontal bar at the bottom of the track (just above month labels), spanning from start thumb to end thumb, in `color.ink.primary` at 60% opacity.

#### Clear filter button

Visible only when range is not the full year. Right-aligned within the slider card.

- Height: 28px
- Padding: 0 12px
- Border: 1px `color.border.subtle`
- Border radius: `radius.sm` (4px)
- Background: transparent
- Text: `font.style.label-sm`, `color.ink.primary`
- Label: "Clear filter"

Transition in/out: opacity 0→1 and `margin-top: -28px → 0` (with `overflow: hidden` on a wrapper) at `motion.duration.slow` (300ms). When hidden, contributes zero height to the card.

Click resets range to {0, 11}.

### Map layer

#### Dot rendering

Eight independent layers, one per fruit category. Each renders all trees of that category as filled circles using MapLibre's `circle` paint properties:

- `circle-color`: fruit category color (chosen palette)
- `circle-opacity`: `data.dot.base-opacity` (0.70) when layer active, `data.dot.dim-opacity` (0.10) when toggled off
- `circle-radius`: scaled by `dbh_cm` using square-root function, clamped to `[data.dot.size-min, data.dot.size-max]` pixels
- `circle-stroke-width`: 0 by default, `data.dot.hover-stroke` (1.5px) on hover
- `circle-stroke-color`: `color.ink.primary`

Size formula: `radius_px = clamp(2, sqrt(dbh_cm) * 0.8, 18)`. Tune the multiplier (0.8 here) against the actual data distribution to produce a visually balanced result. The point is that a tree twice as wide takes only ~1.4× the visual area, not 2×.

#### Layer order

Render small categories on top of large categories to avoid having sparse types completely buried. Suggested order, bottom to top:

1. Cherry (most numerous)
2. Pear
3. Apple
4. Plum
5. Berries
6. Nuts
7. Peach
8. Apricot (least numerous, on top)

#### Toggle behavior

Toggling a layer off transitions `circle-opacity` from base to dim over `motion.duration.base` (200ms). Use MapLibre's expression syntax with a paint property transition.

#### Filter behavior

When the seasonal range is constrained, apply a filter expression to each layer:

```
['all', ['>=', ['get', 'ripening_month'], rangeStart], ['<=', ['get', 'ripening_month'], rangeEnd]]
```

Trees outside the range are excluded entirely (not dimmed). The filter is independent of the layer toggle.

#### Hover and tooltip

On hover over a dot, show a small tooltip near the cursor. Tooltip content:

```
Species name
DBH 42 cm · Ripens August
```

First line: `font.style.label-lg`, primary color.
Second line: `font.style.descriptor` style (italic, secondary), `font.family.ui`.

Tooltip card: same panel styling as sidebar cards but smaller — 8px padding, hairline border, backdrop blur. Position: 12px from cursor, flip to other side if near viewport edge.

The hovered dot itself: gain a 1.5px stroke in `color.ink.primary`.

### Methodology modal

Triggered by the "?" button bottom-left of map. Centered overlay with scrim backdrop.

- Backdrop: `color.bg.scrim` at `opacity.scrim` (40%)
- Modal: 480px wide, auto height, max-height `80vh` with internal scroll
- Padding: 32px
- Border-radius: `radius.md` (6px)
- Background: `color.bg.panel` at 95% opacity (no blur — this is a focused modal, not a glass panel)
- Border: 1px `color.border.hairline`
- Shadow: `shadow.modal`

Content (write the copy in implementation; rough outline):

- Heading: "About this map" (display-lg or xl scaled down to 22px)
- Body paragraphs in `font.style.body` (15px Inter regular): what the data is, where it comes from, what's excluded (private property), inventory date and known gaps, what counts as "ripening month" (it's an approximation per species)
- Links to source data, mapTO, designer credits

Close: X button top-right, also closes on Escape and on backdrop click. Transition in: opacity 0→1, scale 0.96→1, `motion.duration.slow` ease-out.

## Motion principles

All transitions use `motion.easing.ease-out` unless otherwise specified. The curve `cubic-bezier(0.16, 1, 0.3, 1)` exits fast and lands soft — appropriate for an editorial interface where motion should be perceived but not noticed.

Avoid:

- Bouncy or spring physics
- Rotation animations
- Scale animations beyond 0.9–1.15 range
- Staggered list reveals on initial load
- Parallax on scroll
- Marquee or auto-playing content

Initial page load: fade map in from black over 400ms, then fade sidebar cards in over 300ms with a 100ms stagger between them (title first, toggles, then slider). This is the one place stagger is appropriate. Total load animation under 1 second.

Reduced motion: respect `prefers-reduced-motion: reduce`. Disable all transitions except opacity changes; remove the page-load fade-in (cards appear instantly).

## Accessibility

The audience for this map skews technical, but the piece should still meet WCAG AA.

- Color contrast: `color.ink.primary` (#F5F4F1) on `color.bg.panel` (#111316) at 78% opacity over typical dark map: 13.4:1 ratio, exceeds AAA.
- `color.ink.secondary` on same: 7.8:1, passes AA for normal text.
- `color.ink.tertiary` is used only for non-essential metadata (counts, captions); contrast 3.9:1, passes AA for large text and graphical objects.
- All interactive elements (toggles, slider thumbs, modal trigger, modal close) keyboard-accessible with visible `:focus-visible` rings.
- Toggle pills: `role="switch"`, `aria-checked` reflects state, label associated.
- Slider: use `role="slider"` for each thumb with `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext` (the month name).
- Map: not directly screen-reader navigable (impractical for spatial data), but the dataset summary in the methodology modal serves as the screen-reader fallback. Include category counts there as well.

## Performance targets

- First Contentful Paint < 1.0s on broadband
- Time to Interactive < 2.5s
- Map basemap tiles cached aggressively
- Tree data loaded as `.pmtiles` archive, single HTTP request
- Total JavaScript bundle (gzipped) < 200kb

The original map has approximately 80,000 trees. Render performance with 80k circles on MapLibre is acceptable on modern hardware but should be tested. If perf is constrained, cluster at zoom levels below 11 (resolve to individual dots at 11+).

## Asset and data preparation

### Build script responsibilities

1. Download or read the Toronto Open Data street tree inventory
2. Filter to fruit-producing species (see species list below)
3. Categorize into the eight fruit categories
4. Assign ripening month per species (this is the trickiest — there's no canonical source; use a curated lookup table maintained alongside the codebase)
5. Output `.pmtiles` archive
6. Output `counts.json` for the toggle pill counts
7. Output any other derived data (e.g. total counts for the methodology modal)

### Species categorization

The eight categories and what falls into each (verify against actual data — this is from the original map's legend, may need expansion):

- **Apple** — all Malus species (including crabapple? — designer call; crabapples produce fruit but it's not what users expect when they read "apple")
- **Apricot** — Prunus armeniaca
- **Peach** — Prunus persica
- **Plum** — Prunus domestica, Prunus salicina, others
- **Cherry** — Prunus avium, Prunus serotina (choke cherry), Prunus virginiana, Prunus sargentii (Sargent cherry), purpleleaf plums (taxonomically Prunus cerasifera, classed with cherry in original map)
- **Pear** — Pyrus communis, Pyrus calleryana (Bradford pear)
- **Berries** — Morus species (mulberry, black mulberry), Celtis occidentalis (hackberry)
- **Nuts** — Juglans nigra (black walnut), Juglans regia (English walnut), Castanea dentata (American chestnut), Corylus americana (American hazel), Corylus avellana (European hazel)

### Ripening month data

This is editorial data, not municipal data. Maintain as a curated JSON file alongside the species categorization. Approximate values for Toronto's growing season:

- Apple: 8 (September)
- Apricot: 6 (July)
- Peach: 7 (August)
- Plum: 7 (August)
- Cherry: 6 (July) — varies by species, average
- Pear: 8 (September)
- Berries (mulberry): 6 (July)
- Nuts: 9 (October)

Per-species refinement is welcome if research supports it (e.g. early vs late apple varieties).

## File structure

Suggested SvelteKit project structure:

```
fruittrees/
├── src/
│   ├── routes/
│   │   └── +page.svelte           ← single-page app
│   ├── lib/
│   │   ├── tokens.css             ← generated from tokens.json
│   │   ├── tokens.ts              ← generated from tokens.json
│   │   ├── components/
│   │   │   ├── Sidebar.svelte
│   │   │   ├── TitleCard.svelte
│   │   │   ├── ToggleCard.svelte
│   │   │   ├── TogglePill.svelte
│   │   │   ├── SliderCard.svelte
│   │   │   ├── SeasonalSlider.svelte
│   │   │   ├── DaylightCurve.svelte    ← static SVG
│   │   │   ├── MapView.svelte
│   │   │   ├── Tooltip.svelte
│   │   │   ├── MethodologyModal.svelte
│   │   │   └── ModalTrigger.svelte
│   │   ├── stores/
│   │   │   ├── layers.ts          ← active layer state
│   │   │   └── season.ts          ← ripening range state
│   │   └── data/
│   │       ├── species.json       ← species → category mapping
│   │       ├── ripening.json      ← category → month mapping
│   │       └── counts.json        ← generated
│   └── styles/
│       └── app.css
├── static/
│   ├── trees.pmtiles              ← generated, deployed
│   └── basemap-style.json         ← MapLibre style spec
├── scripts/
│   └── build-tiles.ts             ← pre-processing
├── fruittrees-tokens.json         ← source of truth
└── package.json
```

## Decision log

Choices that were considered and rejected, retained here so the implementation knows not to revisit them:

- **Why not a heatmap layer?** Considered. Rejected because the entire piece is about individual trees. A heatmap loses the per-tree identity that makes the map worth visiting.
- **Why not group fruit categories into "stone fruit" and "pome fruit"?** Considered. Rejected because the audience knows what an apple is and what a cherry is; botanical grouping adds cognitive load without payoff.
- **Why not allow filtering by DBH (tree size)?** Considered. Rejected because DBH is already encoded in dot size; adding a size filter is redundant and clutters the UI.
- **Why range slider instead of a single month?** A single ripening month is fictional precision — ripening is a window of weeks, not a single date. A range slider acknowledges this and lets users query "what's in season this summer" naturally.
- **Why MapLibre instead of Mapbox?** No token cost, open-source, equivalent functionality for this use case.
- **Why Protomaps `.pmtiles` instead of GeoJSON?** Scales better with 80k points; loads in one request; cacheable.

## Open questions for the designer

Items not decided by this document and requiring a call from the project owner:

1. **Botanical vs systematized palette** — implementation default is botanical; confirm or override.
2. **Crabapple inclusion** — include in apple category or exclude entirely. Affects total count significantly.
3. **Mobile bottom sheet behavior** — drag to expand, drag to collapse, or simple tap-to-toggle. Recommend drag, but ship simple first.
4. **Solo interaction** — ship shift-click solo or hold for v2.
5. **Methodology modal copy** — needs to be written, not designed. Reserve 200–400 words.

End of specification.
