<script>
	import { onMount } from 'svelte';
	import mapboxgl from 'mapbox-gl';
	import { MAPBOX_ACCESS_TOKEN } from './config';
	import Sidebar from './Sidebar.svelte';
  
	let map;
	let tooltipContent = {
	  treeType: '',
	  diameter: '',
	  averageDiameter: '',
	  fruitTime: ''
	};
  
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
	let filteredTrees = [
	  "APPLE", "CHERRY", "CHOKE CHERRY", "PURPLELEAF CHERRY", "SARGENT CHERRY",
	  "WALNUT", "BLACK WALNUT", "APRICOT", "BRADFORD PEAR", "PEAR", "PLUM",
	  "PEACH", "MULBERRY", "BLACK (RED) MULBERRY", "HACK-BERRY", "AMERICAN CHESTNUT",
	  "AMERICAN HAZEL", "HAZEL"
	];
	let selectedMonth = 4;
  
	onMount(() => {
	  mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
	  map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/dark-v9',
		center: [-79.39, 43.69],
		zoom: 11,
		minZoom: 11,
		maxZoom: 14,
		bearing: -17.6,
		maxBounds: [
		  [-79.738129, 43.416454],
		  [-79.019843, 44.024738]
		]
	  });
  
	  map.on('load', () => {
		map.addSource('fruit_trees', {
		  type: 'vector',
		  url: 'mapbox://tweatherburn.b5hxowle'
		});
  
		map.addLayer({
		  id: 'fruit_trees',
		  type: 'circle',
		  source: 'fruit_trees',
		  'source-layer': '20180518_FruitTreesFinal-3sp7qv',
		  paint: {
			'circle-radius': [
			  'interpolate',
			  ['linear'],
			  ['get', 'DBH_TRUNK'],
			  0, 2,
			  200, 10
			],
			'circle-opacity': 0.7,
			'circle-color': [
			  'match',
			  ['get', 'COMMON_NAM'],
			  'APPLE', '#e41a1c',
			  'CHERRY', '#e78ac3',
			  'CHOKE CHERRY', '#e78ac3',
			  'PURPLELEAF CHERRY', '#e78ac3',
			  'SARGENT CHERRY', '#e78ac3',
			  'APRICOT', '#e5c494',
			  'BRADFORD PEAR', '#a6d854',
			  'PEAR', '#a6d854',
			  'PLUM', '#7570b3',
			  'PEACH', '#ff7f00',
			  'BLACK (RED) MULBERRY', '#6699ff',
			  'MULBERRY', '#6699ff',
			  'HACK-BERRY', '#6699ff',
			  'AMERICAN CHESTNUT', '#663300',
			  'AMERICAN HAZEL', '#663300',
			  'HAZEL', '#663300',
			  'WALNUT', '#663300',
			  'BLACK WALNUT', '#663300',
			  '#ccc'
			]
		  }
		});
  
		updateFilters();
  
		map.on('mousemove', 'fruit_trees', (e) => {
		  if (e.features.length > 0) {
			const feature = e.features[0];
			tooltipContent = {
			  treeType: feature.properties.COMMON_NAM,
			  diameter: feature.properties.DBH_TRUNK,
			  averageDiameter: feature.properties.Ave_DBH_TRUNK,
			  fruitTime: feature.properties.Fruit_Time
			};
		  } else {
			tooltipContent = {
			  treeType: '',
			  diameter: '',
			  averageDiameter: '',
			  fruitTime: ''
			};
		  }
		});
	  });
	});
  
	function updateFilters() {
	  if (map) {
		map.setFilter('fruit_trees', [
		  'all',
		  ['in', ['get', 'COMMON_NAM'], ['literal', filteredTrees]],
		  ['<=', ['to-number', ['slice', ['get', 'Fruit_Time'], 0, 2]], selectedMonth],
		  ['>=', ['to-number', ['slice', ['get', 'Fruit_Time'], 3, 5]], selectedMonth]
		]);
	  }
	}
  
	function handleFilterUpdate(event) {
	  filteredTrees = event.detail.filteredTrees;
	  updateFilters();
	}
  
	function handleMonthUpdate(event) {
	  selectedMonth = event.detail.selectedMonth;
	  updateFilters();
	}
  </script>
  
  <main>
	<div id="map"></div>
	<Sidebar 
	  {months}
	  {selectedMonth}
	  {filteredTrees}
	  on:filterUpdate={handleFilterUpdate}
	  on:monthUpdate={handleMonthUpdate}
	/>
	{#if tooltipContent.treeType}
	  <div id="tooltipWrap">
		<p>Fruit Time: {tooltipContent.fruitTime}</p>
		<p>Tree Type: {tooltipContent.treeType}</p>
		<p>Diameter: {tooltipContent.diameter}</p>
		<p>Average Diameter of Species: {tooltipContent.averageDiameter}</p>
	  </div>
	{/if}
  </main>
  
  <style>
	@import 'mapbox-gl/dist/mapbox-gl.css';
  
	:global(body) {
	  margin: 0;
	  padding: 0;
	}
  
	main {
	  width: 100%;
	  height: 100vh;
	  position: relative;
	}
  
	#map {
	  width: 100%;
	  height: 100%;
	}
  
	#tooltipWrap {
	  position: absolute;
	  right: 10px;
	  top: 10px;
	  background-color: rgba(0, 0, 0, 0.7);
	  color: white;
	  padding: 10px;
	  border-radius: 5px;
	  max-width: 300px;
	}
  </style>