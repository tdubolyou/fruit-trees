<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { treeState } from '$lib/state/trees.svelte';
	import { filterState } from '$lib/state/filters.svelte';
	import { announce } from '$lib/a11y';
	import {
		BASEMAP_STYLE,
		TREE_CIRCLE_PAINT,
		TORONTO_CENTER,
		TORONTO_BOUNDS
	} from '$lib/map-style';
	import type { FruitTreeProperties } from '$lib/types';
	import TreePopup from './TreePopup.svelte';

	let container: HTMLDivElement;
	let map: maplibregl.Map | undefined = $state();
	let hoveredId: number | null = $state(null);
	let selectedTree: FruitTreeProperties | null = $state(null);
	let popupPosition = $state({ x: 0, y: 0 });

	onMount(() => {
		let mapInstance: maplibregl.Map | undefined;

		(async () => {
			const ml = await import('maplibre-gl');
			await import('maplibre-gl/dist/maplibre-gl.css');

			mapInstance = new ml.Map({
				container,
				style: BASEMAP_STYLE,
				center: TORONTO_CENTER,
				zoom: 11,
				bearing: -17, // Rotate map so top border of Toronto is flat
				minZoom: 10,
				maxZoom: 18,
				maxBounds: TORONTO_BOUNDS,
				attributionControl: false
			});

			mapInstance.addControl(
				new ml.NavigationControl({ showCompass: false }),
				'bottom-right'
			);
			mapInstance.addControl(
				new ml.GeolocateControl({
					positionOptions: { enableHighAccuracy: false }
				}),
				'bottom-right'
			);
			mapInstance.addControl(
				new ml.AttributionControl({ compact: true }),
				'bottom-left'
			);

			mapInstance.on('load', () => {
				addTreeLayer(mapInstance!);
				map = mapInstance;
				announce(`Map loaded. ${treeState.count} fruit trees displayed.`);
			});
		})();

		return () => {
			mapInstance?.remove();
		};
	});

	function addTreeLayer(m: maplibregl.Map) {
		if (!treeState.data) return;

		m.addSource('trees', {
			type: 'geojson',
			data: treeState.data,
			generateId: true
		});

		m.addLayer({
			id: 'trees-base',
			type: 'circle',
			source: 'trees',
			paint: {
				'circle-color': '#555555',
				'circle-radius': 2,
				'circle-opacity': 0.15
			}
		});

		m.addLayer({
			id: 'trees',
			type: 'circle',
			source: 'trees',
			paint: TREE_CIRCLE_PAINT as maplibregl.CircleLayerSpecification['paint']
		});

		m.on('mouseenter', 'trees', () => {
			m.getCanvas().style.cursor = 'pointer';
		});

		m.on('mouseleave', 'trees', () => {
			m.getCanvas().style.cursor = '';
			if (hoveredId !== null) {
				m.setFeatureState({ source: 'trees', id: hoveredId }, { hover: false });
				hoveredId = null;
			}
		});

		m.on('mousemove', 'trees', (e) => {
			if (e.features && e.features.length > 0) {
				if (hoveredId !== null) {
					m.setFeatureState({ source: 'trees', id: hoveredId }, { hover: false });
				}
				hoveredId = e.features[0].id as number;
				m.setFeatureState({ source: 'trees', id: hoveredId }, { hover: true });
			}
		});

		m.on('click', 'trees', (e) => {
			if (e.features && e.features.length > 0) {
				const feature = e.features[0];
				selectedTree = feature.properties as unknown as FruitTreeProperties;
				const point = e.point;
				popupPosition = { x: point.x, y: point.y };
			}
		});

		m.on('click', (e) => {
			const features = m.queryRenderedFeatures(e.point, { layers: ['trees'] });
			if (!features.length) {
				selectedTree = null;
			}
		});

		// Hover state styling
		m.setPaintProperty('trees', 'circle-opacity', [
			'case',
			['boolean', ['feature-state', 'hover'], false],
			0.95,
			0.7
		]);
		m.setPaintProperty('trees', 'circle-stroke-width', [
			'case',
			['boolean', ['feature-state', 'hover'], false],
			2,
			0
		]);
	}

	$effect(() => {
		if (!map) return;
		const filter = filterState.mapFilter;
		if (filter) {
			map.setFilter('trees', filter);
		} else {
			map.setFilter('trees', null);
		}
	});

	function closePopup() {
		selectedTree = null;
	}
</script>

<div class="map-wrapper">
	<div
		bind:this={container}
		class="map-container"
		role="application"
		aria-label="Interactive fruit tree map of Toronto"
		aria-roledescription="map"
	>
		{#if !map}
			<div class="map-loading" role="status">
				<p>Loading map...</p>
			</div>
		{/if}
	</div>

	{#if selectedTree}
		<div
			class="popup-overlay"
			style:left="{Math.min(popupPosition.x, (typeof window !== 'undefined' ? window.innerWidth : 800) - 300)}px"
			style:top="{popupPosition.y + 10}px"
		>
			<TreePopup tree={selectedTree} onclose={closePopup} />
		</div>
	{/if}
</div>

<style>
	.map-wrapper {
		position: relative;
		flex: 1;
		width: 100%;
	}

	.map-container {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	.map-loading {
		display: grid;
		place-items: center;
		height: 100%;
		color: var(--color-text-tertiary);
	}

	.popup-overlay {
		position: absolute;
		z-index: 50;
		pointer-events: auto;
	}

	:global(.maplibregl-ctrl-bottom-left) {
		opacity: 0.6;
	}
</style>
