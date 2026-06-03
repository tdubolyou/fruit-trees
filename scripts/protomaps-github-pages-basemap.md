# One-File Protomaps Basemap on GitHub Pages (SvelteKit)

Scope: one `.pmtiles` file, hosted on GitHub Pages inside your SvelteKit site, rendered as a MapLibre basemap. Fonts and sprites stay on Protomaps' hosted asset URLs. No R2, no API key, no second host.

Assumes you have the pmtiles CLI (single binary from the `protomaps/go-pmtiles` releases) and an existing SvelteKit project.

## Step 1 — Extract one file

Find a recent daily build date at `maps.protomaps.com/builds`, then cut your area. Cap the zoom so the file clears GitHub's 100 MB per-file push limit. Start at z13; go to z14 only if the file stays under ~100 MB.

```bash
pmtiles extract https://build.protomaps.com/20260518.pmtiles toronto.pmtiles \
  --bbox=-79.64,43.58,-79.12,43.86 --maxzoom=13
```

Check the size before anything else:

```bash
ls -lh toronto.pmtiles
```

If it's over ~100 MB, drop `--maxzoom` to 12 or tighten the bbox to only the extent your map actually shows. Each zoom level roughly doubles the file. Git will reject a file over 100 MB on push, so this has to pass here.

## Step 2 — Put the file in the site

Drop it in the SvelteKit `static/` directory so it publishes as part of the site:

```bash
mv toronto.pmtiles static/toronto.pmtiles
```

On Pages it will be served at `https://<user>.github.io/<repo>/toronto.pmtiles`.

## Step 3 — Install the libraries

```bash
npm install maplibre-gl pmtiles @protomaps/basemaps
```

## Step 4 — The map component

The map initialises only in `onMount` (it needs the DOM and WebGL, so it must not run during prerender). The pmtiles protocol is registered once. The tileset URL is built from the site's base path so it works in both dev and on Pages.

```svelte
<script>
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import maplibregl from 'maplibre-gl';
  import { Protocol } from 'pmtiles';
  import { layers, namedFlavor } from '@protomaps/basemaps';
  import 'maplibre-gl/dist/maplibre-gl.css';

  let container;
  let map;

  onMount(() => {
    const protocol = new Protocol();
    maplibregl.addProtocol('pmtiles', protocol.tile);

    const tilesUrl = `${window.location.origin}${base}/toronto.pmtiles`;

    map = new maplibregl.Map({
      container,
      center: [-79.38, 43.65],
      zoom: 11,
      style: {
        version: 8,
        glyphs: 'https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf',
        sprite: 'https://protomaps.github.io/basemaps-assets/sprites/v4/light',
        sources: {
          protomaps: {
            type: 'vector',
            url: `pmtiles://${tilesUrl}`,
            attribution:
              '<a href="https://protomaps.com">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>'
          }
        },
        layers: layers('protomaps', namedFlavor('light'), { lang: 'en' })
      }
    });

    return () => {
      map?.remove();
      maplibregl.removeProtocol('pmtiles');
    };
  });
</script>

<div bind:this={container} class="map"></div>

<style>
  .map { position: absolute; inset: 0; }
</style>
```

## Step 5 — Configure SvelteKit for Pages

Install the static adapter:

```bash
npm install -D @sveltejs/adapter-static
```

`svelte.config.js` — the `base` path must match your repo name, or every URL on the deployed site (including the tileset) resolves wrong:

```js
import adapter from '@sveltejs/adapter-static';

const dev = process.env.NODE_ENV === 'development';

export default {
  kit: {
    adapter: adapter(),
    paths: {
      base: dev ? '' : '/YOUR-REPO-NAME'
    }
  }
};
```

Turn on prerendering. Create `src/routes/+layout.js`:

```js
export const prerender = true;
```

## Step 6 — Deploy

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: build
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

In the repo settings, under Pages, set the source to GitHub Actions. Push to `main`. The workflow builds the SvelteKit site (with the `.pmtiles` carried along from `static/`) and publishes it.

## Verify

Open `https://<user>.github.io/<repo>/`. You should see the basemap. If geometry draws but labels are missing, the glyphs URL is wrong. If nothing draws at all, open the network tab and check the request to `toronto.pmtiles` — a `206 Partial Content` response means range requests are working; a `200` returning the whole file or a `404` means the URL or base path is off.

## The one known caveat

GitHub Pages occasionally serves PMTiles range requests inconsistently — a documented, browser-dependent caching quirk where the first tile loads and later ones come back blank, seen mostly in Firefox. It's intermittent, not a hard failure, and acceptable for a portfolio or civic map. If it ever bites in a way you can't tolerate, the fix is to move only the `.pmtiles` file to R2 (still free, no egress) and point `tilesUrl` there with CORS set for your Pages origin — the rest of this setup stays identical.
