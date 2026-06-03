<script lang="ts">
	import type { Category } from '$lib/categories';

	let {
		category,
		active,
		ontoggle
	}: {
		category: Category;
		active: boolean;
		ontoggle: () => void;
	} = $props();
</script>

<button
	role="switch"
	aria-checked={active}
	aria-label="Show {category.label} trees"
	class="row"
	class:active
	style:--fruit-color={category.color}
	onclick={ontoggle}
>
	<span class="switch" aria-hidden="true">
		<span class="track"></span>
		<span class="knob"></span>
	</span>
	<span class="text">
		<span class="label">{category.label}</span>
		{#if category.legend}
			<span class="legend">({category.legend})</span>
		{/if}
	</span>
</button>

<style>
	.row {
		display: flex;
		align-items: flex-start;
		gap: var(--space-3);
		width: 100%;
		padding: var(--space-1) 0;
		background: transparent;
		border: none;
		text-align: left;
		cursor: pointer;
	}

	/* Toggle switch: thin track + colored knob, echoing the PDF. */
	.switch {
		position: relative;
		flex-shrink: 0;
		width: 30px;
		height: 14px;
		margin-top: 3px;
	}

	.track {
		position: absolute;
		top: 50%;
		left: 0;
		right: 0;
		height: 2px;
		transform: translateY(-50%);
		border-radius: var(--radius-full);
		background: var(--color-border-strong);
		transition: background var(--duration-base) var(--ease-out);
	}

	.knob {
		position: absolute;
		top: 50%;
		left: 0;
		width: 13px;
		height: 13px;
		transform: translate(0, -50%);
		border-radius: var(--radius-full);
		background: var(--fruit-color);
		transition:
			transform var(--duration-base) var(--ease-out),
			background var(--duration-base) var(--ease-out),
			opacity var(--duration-base) var(--ease-out);
	}

	/* On: colored knob sits left (per PDF). Off: knob slides right and dims. */
	.row:not(.active) .knob {
		transform: translate(17px, -50%);
		background: var(--color-text-tertiary);
		opacity: 0.6;
	}

	.text {
		display: flex;
		flex-direction: column;
		gap: 1px;
		transition: opacity var(--duration-base) var(--ease-out);
	}

	.row:not(.active) .text {
		opacity: 0.4;
	}

	.label {
		font-size: var(--text-sm);
		font-weight: var(--font-semibold);
		color: var(--color-text-primary);
		line-height: 1.2;
	}

	.legend {
		font-family: var(--font-display);
		font-style: italic;
		font-size: var(--text-xs);
		line-height: 1.4;
		color: var(--color-text-secondary);
	}
</style>
