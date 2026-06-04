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

	<h2 class="category" style:color={category?.color}>{category?.label ?? tree.category}</h2>
	<p class="species">{tree.species}</p>
	{#if tree.botanical}
		<p class="botanical">{tree.botanical}</p>
	{/if}

	{#if ripeningText}
		<p class="description">Typically ripens in {ripeningText}.</p>
	{/if}

	<dl class="details">
		<div class="detail-row">
			<dt>Diameter</dt>
			<dd>{tree.dbh} cm</dd>
		</div>
		{#if tree.address}
			<div class="detail-row">
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

	.category {
		font-family: var(--font-display);
		font-variation-settings: 'opsz' 96;
		font-size: var(--text-2xl);
		font-weight: var(--font-semibold);
		line-height: 1.1;
		letter-spacing: -0.02em;
		margin: 0;
	}

	.species {
		font-family: var(--font-display);
		font-style: italic;
		font-size: var(--text-lg);
		color: var(--color-text-secondary);
		margin: 0;
	}

	.botanical {
		font-style: italic;
		font-size: var(--text-sm);
		color: var(--color-text-tertiary);
		margin: var(--space-1) 0 var(--space-3);
	}

	.description {
		font-size: var(--text-sm);
		line-height: var(--leading-normal);
		color: var(--color-text-secondary);
		margin: 0 0 var(--space-3);
	}

	.details {
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}

	.detail-row {
		display: flex;
		justify-content: space-between;
		gap: var(--space-3);
		font-size: var(--text-sm);
	}

	dt {
		color: var(--color-text-tertiary);
	}

	dd {
		margin: 0;
		text-align: right;
		color: var(--color-text-secondary);
	}

</style>
