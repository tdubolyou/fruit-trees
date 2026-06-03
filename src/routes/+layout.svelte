<script lang="ts">
	import '@fontsource-variable/fraunces/index.css';
	import '@fontsource-variable/fraunces/standard-italic.css';
	import '@fontsource-variable/inter/index.css';
	import '@fontsource/jetbrains-mono/400.css';
	import '../app.css';
	import type { Snippet } from 'svelte';
	import SkipLink from '$lib/components/SkipLink.svelte';
	import LiveRegion from '$lib/components/LiveRegion.svelte';
	import { page } from '$app/state';

	let { children }: { children: Snippet } = $props();

	// The map page is full-bleed (sidebar floats over the map, per design).
	// Other routes keep the standard header for navigation.
	const isMap = $derived(page.url.pathname === '/');
</script>

<SkipLink />

{#if !isMap}
<header class="site-header">
	<a href="/" class="site-title">Fruit Trees of Toronto</a>
	<nav aria-label="Main navigation">
		<ul class="nav-list">
			<li>
				<a href="/" class:active={page.url.pathname === '/'}>Map</a>
			</li>
		</ul>
	</nav>
</header>
{/if}

<main id="main-content" class:full-bleed={isMap}>
	{@render children()}
</main>

<LiveRegion />

<style>
	.site-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-3) var(--space-4);
		background: var(--color-bg-secondary);
		border-bottom: 1px solid var(--color-border-subtle);
		position: relative;
		z-index: 100;
	}

	.site-title {
		font-size: var(--text-lg);
		font-weight: var(--font-semibold);
		color: var(--color-text-primary);
		text-decoration: none;
		white-space: nowrap;
	}

	.site-title:hover {
		text-decoration: none;
		color: var(--color-accent-primary);
	}

	.nav-list {
		display: flex;
		gap: var(--space-1);
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.nav-list a {
		display: block;
		padding: var(--space-2) var(--space-3);
		font-size: var(--text-sm);
		font-weight: var(--font-medium);
		color: var(--color-text-tertiary);
		border-radius: var(--radius-md);
		text-decoration: none;
		transition: color var(--duration-fast) var(--ease-out),
			background var(--duration-fast) var(--ease-out);
	}

	.nav-list a:hover {
		color: var(--color-text-primary);
		background: var(--color-bg-tertiary);
		text-decoration: none;
	}

	.nav-list a.active {
		color: var(--color-accent-primary);
		background: rgba(74, 158, 255, 0.1);
	}

	#main-content {
		flex: 1;
		min-height: 0;
	}

	#main-content.full-bleed {
		position: fixed;
		inset: 0;
	}

	:global(html),
	:global(body) {
		height: 100%;
	}

	:global(body) {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
