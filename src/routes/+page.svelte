<script lang="ts">
	import { onMount } from 'svelte';
	import { treeState } from '$lib/state/trees.svelte';
	import Map from '$lib/components/Map.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';

	onMount(() => {
		treeState.load('');
	});
</script>

<svelte:head>
	<title>Fruit Trees of Toronto - Interactive Map</title>
	<meta
		name="description"
		content="Explore thousands of fruit trees on public land across Toronto. Filter by species, ripening month, and more."
	/>
</svelte:head>

<div class="map-page">
	{#if treeState.error}
		<div class="error-banner" role="alert">
			<p>Failed to load tree data: {treeState.error}</p>
			<button onclick={() => treeState.load('')}>Retry</button>
		</div>
	{:else if treeState.loading}
		<div class="loading-state" role="status">
			<p>Loading {`tree data...`}</p>
		</div>
	{:else}
		<div class="map-container">
			<Sidebar />
			<Map />
		</div>
	{/if}
</div>

<style>
	.map-page {
		display: flex;
		flex-direction: column;
		flex: 1;
		height: 100%;
	}

	.map-container {
		position: relative;
		flex: 1;
		display: flex;
	}

	.error-banner {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-3);
		padding: var(--space-4);
		background: var(--color-bg-secondary);
		color: var(--color-text-primary);
		text-align: center;
	}

	.error-banner button {
		padding: var(--space-2) var(--space-4);
		background: transparent;
		color: var(--color-text-primary);
		border: 1px solid var(--color-border-default);
		border-radius: var(--radius-md);
		font-size: var(--text-sm);
	}

	.loading-state {
		display: grid;
		place-items: center;
		flex: 1;
		color: var(--color-text-tertiary);
	}
</style>
