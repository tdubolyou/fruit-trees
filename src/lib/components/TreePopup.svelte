<script lang="ts">
	import type { FruitTreeProperties } from '$lib/types';
	import { CATEGORIES } from '$lib/categories';
	import { focusTrap } from '$lib/a11y';

	let {
		tree,
		onclose
	}: {
		tree: FruitTreeProperties;
		onclose: () => void;
	} = $props();

	const category = $derived(CATEGORIES.find((c) => c.id === tree.category));
	const monthNames = [
		'',
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
	const ripeningText = $derived(
		category ? category.ripeningMonths.map((m) => monthNames[m]).join(', ') : ''
	);
	const mapsUrl = $derived(
		tree.address
			? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(tree.address + ', Toronto, ON')}`
			: null
	);

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			onclose();
		}
	}
</script>

<div
	class="popup"
	role="dialog"
	aria-modal="true"
	aria-label="Tree details: {tree.species}"
	tabindex="-1"
	use:focusTrap
	onkeydown={handleKeydown}
>
	<button class="close-btn" onclick={onclose} aria-label="Close tree details">&times;</button>

	<div class="identity">
		<h2 class="category" style:color={category?.color}>{category?.label ?? tree.category}</h2>
		<p class="species">{tree.species}</p>
		{#if tree.botanical}
			<p class="botanical">{tree.botanical}</p>
		{/if}
	</div>

	{#if ripeningText}
		<p class="description">Typically ripens in {ripeningText}.</p>
	{/if}

	<dl class="facts">
		<div class="fact">
			<dt>Diameter</dt>
			<dd>{tree.dbh} cm</dd>
		</div>
		{#if tree.address}
			<div class="fact">
				<dt>Location</dt>
				<dd>
					{#if mapsUrl}
						<a href={mapsUrl} target="_blank" rel="noopener noreferrer">{tree.address}</a>
					{:else}
						{tree.address}
					{/if}
				</dd>
			</div>
		{/if}
	</dl>
</div>

<style>
	.popup {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		background: color-mix(in srgb, var(--color-panel) 95%, transparent);
		backdrop-filter: blur(var(--blur-panel));
		-webkit-backdrop-filter: blur(var(--blur-panel));
		border: 1px solid var(--color-border-subtle);
		border-radius: var(--radius-md);
		padding: var(--space-5);
		box-shadow: var(--shadow-modal);
		max-width: 320px;
		color: var(--color-text-primary);
	}

	.close-btn {
		position: absolute;
		top: var(--space-2);
		right: var(--space-2);
		background: none;
		border: none;
		color: var(--color-text-tertiary);
		font-size: var(--text-xl);
		padding: var(--space-1);
		line-height: 1;
		cursor: pointer;
		border-radius: var(--radius-sm);
	}

	.close-btn:hover {
		color: var(--color-text-primary);
	}

	/* Identity block: category → common name → botanical */
	.identity {
		display: flex;
		flex-direction: column;
		gap: 2px;
		padding-right: var(--space-5);
	}

	.category {
		font-family: var(--font-display);
		font-variation-settings: 'opsz' 96;
		font-size: var(--text-2xl);
		font-weight: var(--font-semibold);
		line-height: 1.05;
		letter-spacing: -0.02em;
		margin: 0;
	}

	.species {
		font-family: var(--font-display);
		font-style: italic;
		font-size: var(--text-lg);
		color: var(--color-text-primary);
		line-height: 1.2;
		margin: 0;
	}

	.botanical {
		font-style: italic;
		font-size: var(--text-xs);
		letter-spacing: 0.02em;
		color: var(--color-text-tertiary);
		margin: 0;
	}

	.description {
		font-family: var(--font-display);
		font-style: italic;
		font-size: var(--text-sm);
		line-height: var(--leading-normal);
		color: var(--color-text-secondary);
		margin: 0;
	}

	.facts {
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}

	.fact {
		display: flex;
		gap: 0.4em;
		font-size: var(--text-sm);
	}

	.fact dt {
		color: var(--color-text-tertiary);
	}

	.fact dt::after {
		content: ':';
	}

	.fact dd {
		margin: 0;
		color: var(--color-text-secondary);
	}

	.fact a {
		color: var(--color-text-primary);
		text-decoration: underline;
		text-decoration-color: var(--color-text-tertiary);
		text-underline-offset: 2px;
	}

	.fact a:hover {
		text-decoration-color: var(--color-text-primary);
	}

</style>
