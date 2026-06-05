import type { ExpressionSpecification, StyleSpecification } from 'maplibre-gl';
import { layers, namedFlavor } from '@protomaps/basemaps';
import { CATEGORIES } from '$lib/categories';

// Self-hosted basemap: a single Protomaps .pmtiles archive in static/.
// No tile API, no key — see scripts/protomaps-github-pages-basemap.md.
export const PMTILES_FILE = 'toronto.pmtiles';

// Protomaps assets (glyphs + sprite) are static files, not an API. Per the
// reference doc they stay on Protomaps' asset host; no key is involved.
const GLYPHS_URL = 'https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf';
const SPRITE_URL = 'https://protomaps.github.io/basemaps-assets/sprites/v4/dark';

// A near-black flavor tuned to match the previous CARTO dark-matter look
// (our --map-bg / --map-water / --map-land tokens), darker than Protomaps' dark.
const DARK_FLAVOR = {
	...namedFlavor('dark'),
	background: '#0a0b0d',
	earth: '#0e1013',
	park_a: '#10151a',
	park_b: '#10151a',
	wood_a: '#10141a',
	wood_b: '#10141a',
	scrub_a: '#10141a',
	scrub_b: '#10141a',
	industrial: '#101216',
	hospital: '#121317',
	school: '#121317',
	zoo: '#101216',
	military: '#101216',
	sand: '#13151a',
	beach: '#15181d',
	aerodrome: '#101216',
	pedestrian: '#101216',
	water: '#14202e',
	buildings: '#21242a',
	// road casings blend into the earth so roads read as thin strokes
	minor_service_casing: '#0e1013',
	minor_casing: '#0e1013',
	link_casing: '#0e1013',
	major_casing_late: '#0e1013',
	highway_casing_late: '#0e1013',
	major_casing_early: '#0e1013',
	highway_casing_early: '#0e1013',
	// roads, dark grey rising with importance
	other: '#26292f',
	minor_service: '#26292f',
	minor_a: '#34373d',
	minor_b: '#2a2d33',
	link: '#34373d',
	major: '#3b3e45',
	highway: '#474b52',
	railway: '#1a1c20',
	boundaries: '#3a4150',
	// muted labels with near-black halos
	roads_label_minor: '#56544f',
	roads_label_minor_halo: '#0a0b0d',
	roads_label_major: '#6e6c68',
	roads_label_major_halo: '#0a0b0d',
	ocean_label: '#4a5568',
	subplace_label: '#56544f',
	subplace_label_halo: '#0a0b0d',
	city_label: '#8a8780',
	city_label_halo: '#0a0b0d',
	state_label: '#3d3d3d',
	state_label_halo: '#0a0b0d',
	country_label: '#5c5c5c'
};

// Basemap layers we don't want: coloured park fills, POI icons/dots,
// highway shields, one-way arrows, and the large place/address labels.
// Road text labels and water labels are kept.
const HIDDEN_LAYERS = new Set([
	'landuse_park',
	'landuse_urban_green',
	'pois',
	'roads_shields',
	'roads_oneway',
	'address_label',
	'earth_label_islands',
	'places_subplace',
	'places_locality',
	'places_region',
	'places_country'
]);

/**
 * Builds a complete MapLibre style backed by the local pmtiles archive.
 * `tilesUrl` is the absolute URL to the .pmtiles file (resolved at runtime).
 */
export function buildBasemapStyle(tilesUrl: string): StyleSpecification {
	const basemapLayers = layers('protomaps', DARK_FLAVOR, { lang: 'en' }).filter(
		(l) => !HIDDEN_LAYERS.has(l.id)
	);

	return {
		version: 8,
		glyphs: GLYPHS_URL,
		sprite: SPRITE_URL,
		sources: {
			protomaps: {
				type: 'vector',
				url: `pmtiles://${tilesUrl}`,
				attribution:
					'<a href="https://protomaps.com">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>'
			}
		},
		layers: basemapLayers
	} as StyleSpecification;
}

export function getTreeColorExpression(): ExpressionSpecification {
	const matchPairs: (string | ExpressionSpecification)[] = [];
	for (const cat of CATEGORIES) {
		matchPairs.push(cat.id, cat.color);
	}
	return ['match', ['get', 'category'], ...matchPairs, '#cccccc'] as unknown as ExpressionSpecification;
}

export const TREE_CIRCLE_PAINT = {
	'circle-color': getTreeColorExpression(),
	'circle-radius': [
		'interpolate',
		['linear'],
		['zoom'],
		10,
		['interpolate', ['linear'], ['get', 'dbh'], 0, 1.5, 100, 4],
		16,
		['interpolate', ['linear'], ['get', 'dbh'], 0, 4, 100, 14]
	] as ExpressionSpecification,
	'circle-opacity': 0.7,
	'circle-stroke-width': 0,
	'circle-stroke-color': '#f5f4f1'
};

export const TREE_CIRCLE_PAINT_HOVER = {
	'circle-opacity': 0.9,
	'circle-stroke-width': 2,
	'circle-stroke-color': '#f5f4f1'
};

// Geometric centre of the tree-data extent (midpoint of meta.json bounds
// [-79.638, 43.585, -79.122, 43.850]).
export const TORONTO_CENTER: [number, number] = [-79.3801, 43.7173];
export const TORONTO_BOUNDS: [[number, number], [number, number]] = [
	[-80.18704, 43.30241],
	[-78.5863, 44.17452]
];
