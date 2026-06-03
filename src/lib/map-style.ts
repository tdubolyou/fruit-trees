import type { ExpressionSpecification } from 'maplibre-gl';
import { CATEGORIES } from '$lib/categories';

export const BASEMAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

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

export const TORONTO_CENTER: [number, number] = [-79.39, 43.69];
export const TORONTO_BOUNDS: [[number, number], [number, number]] = [
	[-79.74, 43.42],
	[-79.02, 44.02]
];
