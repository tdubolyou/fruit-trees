<script lang="ts">
	import { CATEGORIES } from '$lib/categories';
	import { filterState } from '$lib/state/filters.svelte';
	import { announce } from '$lib/a11y';
	import CategoryPill from './CategoryPill.svelte';
	import MonthSlider from './MonthSlider.svelte';

	let open = $state(true);

	function toggle() {
		open = !open;
	}

	function handleToggle(id: string) {
		filterState.toggleCategory(id);
		announceFilterChange();
	}

	function handleMonthChange(month: number | null) {
		if (month === null) {
			filterState.clearMonth();
		} else {
			filterState.selectMonth(month);
		}
		announceFilterChange();
	}

	function handleClearMonth() {
		filterState.clearMonth();
		announce('Ripening month filter cleared. All species shown.');
	}

	function announceFilterChange() {
		const active = filterState.activeCategories.size;
		const total = CATEGORIES.length;
		const month = filterState.selectedMonthName;
		announce(`Filters updated. ${active} of ${total} categories active. Months: ${month}.`);
	}

	function handleAllOff() {
		filterState.disableAllCategories();
		announce('All species hidden.');
	}

	function handleAllOn() {
		filterState.enableAllCategories();
		announce('All species shown.');
	}

	// Scroll affordance: a soft fade + chevron at the bottom that fades out
	// over the last stretch of scroll.
	let scroller: HTMLDivElement | undefined = $state();
	let fadeOpacity = $state(0);
	// Visible content width of the scroller (excludes any scrollbar) so the
	// fade matches the cards, not the surrounding container.
	let cardsWidth = $state(0);

	function updateScroll(el: HTMLElement) {
		const remaining = el.scrollHeight - el.scrollTop - el.clientHeight;
		fadeOpacity = Math.max(0, Math.min(1, remaining / 40));
		cardsWidth = el.clientWidth;
	}

	$effect(() => {
		open; // re-run when the panel opens
		const el = scroller;
		if (!el) return;
		const update = () => updateScroll(el);
		update();
		const ro = new ResizeObserver(update);
		ro.observe(el);
		window.addEventListener('resize', update);
		return () => {
			ro.disconnect();
			window.removeEventListener('resize', update);
		};
	});
</script>

<aside class="sidebar" class:collapsed={!open} aria-label="Filters and navigation">
	<button
		class="toggle-btn"
		onclick={toggle}
		aria-expanded={open}
		aria-label={open ? 'Collapse sidebar' : 'Expand sidebar'}
	>
		<svg
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			aria-hidden="true"
			class="toggle-icon"
			class:rotated={!open}
		>
			<path
				d="M13 15L8 10L13 5"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</button>

	{#if open}
		<div class="cards-wrap">
		<div class="cards" bind:this={scroller} onscroll={(e) => updateScroll(e.currentTarget)}>
			<!-- Card 1: Title -->
			<section class="card title-card">
				<h1 class="title">The Fruit Trees<br />of Toronto</h1>
				<p class="byline">By: <a href="http://tomweatherburn.com" target="_blank">Tom Weatherburn</a></p>
				<p class="blurb">
					Thousands of fruit and nut trees grow on Toronto's public land. Filter by species and
					ripening season.
				</p>
			</section>

			<!-- Card 2: Species filter -->
			<section class="card" aria-labelledby="species-heading">
				<div class="card-header">
					<h2 id="species-heading" class="card-heading">Filter by Species</h2>
					<div class="btn-row">
						<button class="clear-btn" onclick={handleAllOff}>All Off</button>
						<button class="clear-btn" onclick={handleAllOn}>All On</button>
					</div>
				</div>
				<div class="categories">
					{#each CATEGORIES as category (category.id)}
						<CategoryPill
							{category}
							active={filterState.activeCategories.has(category.id)}
							ontoggle={() => handleToggle(category.id)}
						/>
					{/each}
				</div>
			</section>

			<!-- Card 3: Ripening month -->
			<section class="card" aria-labelledby="ripening-heading">
				<h2 id="ripening-heading" class="card-heading">Filter by Ripening Month</h2>
				<MonthSlider value={filterState.selectedMonth} onchange={handleMonthChange} />
				<button class="clear-btn" onclick={handleClearMonth}>Clear</button>
			</section>

			<!-- Footer -->
			<footer class="footer">
				<span><a href="https://mapto.ca" target="_blank">© mapTO, 2026</a> · Data: City of Toronto</span>
			</footer>
		</div>

		<div
			class="scroll-fade"
			style:opacity={fadeOpacity}
			style:width="{cardsWidth}px"
			aria-hidden="true"
		>
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="chevron">
				<path
					d="M4 6l4 4 4-4"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</div>
		</div>
	{/if}
</aside>

<style>
	.sidebar {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		z-index: 10;
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		pointer-events: none;
	}

	.cards-wrap {
		position: relative;
		width: 340px;
		max-height: calc(100vh - 48px);
		margin: var(--space-6);
		display: flex;
		pointer-events: auto;
	}

	.cards {
		width: 100%;
		max-height: 100%;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		scrollbar-width: none;
	}

	.cards::-webkit-scrollbar {
		display: none;
	}

	/* Soft fade + chevron at the bottom; fades out as the panel reaches the end */
	.scroll-fade {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: 0;
		height: 56px;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		padding-bottom: 4px;
		pointer-events: none;
		border-radius: 0 0 var(--radius-md) var(--radius-md);
		background: linear-gradient(
			to top,
			color-mix(in srgb, var(--color-panel) 60%, transparent),
			transparent
		);
		transition: opacity var(--duration-fast) var(--ease-out);
	}

	.chevron {
		color: var(--color-text-secondary);
		animation: chevron-bob 1.6s var(--ease-out) infinite;
	}

	@keyframes chevron-bob {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(3px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.chevron {
			animation: none;
		}
	}

	.card {
		background: color-mix(in srgb, var(--color-panel) 78%, transparent);
		backdrop-filter: blur(var(--blur-panel));
		-webkit-backdrop-filter: blur(var(--blur-panel));
		border: 1px solid var(--color-border-subtle);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-card);
		padding: var(--space-5);
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	@supports not (backdrop-filter: blur(1px)) {
		.card {
			background: color-mix(in srgb, var(--color-panel) 92%, transparent);
		}
	}

	.title-card {
		padding-top: var(--space-6);
	}

	.title {
		font-family: var(--font-display);
		font-variation-settings: 'opsz' 96;
		font-size: var(--text-2xl);
		font-weight: var(--font-medium);
		line-height: 1.1;
		letter-spacing: -0.02em;
		color: var(--color-text-primary);
		margin: 0;
	}

	.byline {
		font-family: var(--font-display);
		font-style: italic;
		font-size: var(--text-lg);
		color: var(--color-text-secondary);
		margin: 0;
	}

	.blurb {
		font-size: var(--text-sm);
		line-height: var(--leading-normal);
		color: var(--color-text-secondary);
		margin: 0;
	}

	.card-heading {
		font-family: var(--font-display);
		font-size: var(--text-lg);
		font-weight: var(--font-semibold);
		color: var(--color-text-primary);
		margin: 0;
	}

	.card-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-2);
	}

	.categories {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.btn-row {
		display: flex;
		gap: var(--space-1);
		flex-shrink: 0;
	}

	.clear-btn {
		align-self: flex-start;
		padding: 3px var(--space-2);
		font-size: var(--text-xs);
		font-weight: var(--font-medium);
		color: var(--color-text-primary);
		background: transparent;
		border: 1px solid var(--color-border-default);
		border-radius: var(--radius-sm);
		cursor: pointer;
		white-space: nowrap;
		transition: border-color var(--duration-fast) var(--ease-out);
	}

	.clear-btn:hover {
		border-color: var(--color-border-strong);
	}

	.footer {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
		padding: 0 var(--space-2);
		font-size: var(--text-xs);
		color: var(--color-text-tertiary);
	}

	.toggle-btn {
		position: relative;
		align-self: flex-start;
		margin-top: var(--space-6);
		width: 28px;
		height: 28px;
		display: grid;
		place-items: center;
		background: var(--color-bg-secondary);
		border: 1px solid var(--color-border-subtle);
		border-radius: 0 var(--radius-md) var(--radius-md) 0;
		color: var(--color-text-tertiary);
		cursor: pointer;
		pointer-events: auto;
		transition:
			color var(--duration-fast) var(--ease-out),
			background var(--duration-fast) var(--ease-out);
		flex-shrink: 0;
	}

	.toggle-btn:hover {
		color: var(--color-text-primary);
		background: var(--color-bg-tertiary);
	}

	.toggle-icon {
		transition: transform var(--duration-base) var(--ease-out);
	}

	.toggle-icon.rotated {
		transform: rotate(180deg);
	}

	@media (max-width: 640px) {
		.cards {
			width: calc(100vw - 32px);
			margin: var(--space-4);
		}
	}
</style>
