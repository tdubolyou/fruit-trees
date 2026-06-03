<svelte:head>
	<title>About - Fruit Trees of Toronto</title>
	<meta
		name="description"
		content="About the Fruit Trees of Toronto project: data sources, methodology, and credits."
	/>
</svelte:head>

<article class="about-page">
	<h1>About This Project</h1>

	<section>
		<h2>What is this?</h2>
		<p>
			Fruit Trees of Toronto is an interactive map showing fruit and nut trees on public land
			across Toronto. Originally created in 2018 by Tom Weatherburn and William Davis, this
			redesigned version brings fresh data, modern technology, and improved accessibility.
		</p>
	</section>

	<section>
		<h2>Data Source</h2>
		<p>
			Tree data comes from the
			<a
				href="https://open.toronto.ca/dataset/street-tree-data/"
				target="_blank"
				rel="noopener noreferrer"
			>
				City of Toronto Street Tree Data
			</a>
			open dataset. This dataset covers City-owned trees on road allowances and is maintained by
			Toronto Urban Forestry staff during inspections and maintenance work.
		</p>
		<p>
			The dataset includes over 530,000 street trees. We filter to fruit- and nut-bearing species,
			resulting in approximately 67,000 trees across 8 categories: apple, cherry, peach, pear, plum,
			apricot, berry (mulberry and hackberry), and nuts (walnut, chestnut, hazel, and butternut).
		</p>
	</section>

	<section>
		<h2>Important Notes</h2>
		<ul>
			<li>
				<strong>Accuracy:</strong> Tree positions are geocoded to parcel addresses, not exact locations.
				The actual tree may be several metres from the map marker.
			</li>
			<li>
				<strong>Currency:</strong> The City updates this data periodically, but some records may be
				several years old. Trees may have been removed or new ones planted.
			</li>
			<li>
				<strong>Ripening times:</strong> Approximate and vary by year based on weather. Use as a
				rough guide only.
			</li>
			<li>
				<strong>Foraging:</strong> Always verify that fruit is from a public tree on city land.
				Wash thoroughly before eating. When in doubt, do not eat.
			</li>
		</ul>
	</section>

	<section>
		<h2>Technology</h2>
		<p>
			Built with <a href="https://kit.svelte.dev" target="_blank" rel="noopener noreferrer">SvelteKit</a>,
			<a href="https://maplibre.org" target="_blank" rel="noopener noreferrer">MapLibre GL JS</a>,
			and <a href="https://protomaps.com" target="_blank" rel="noopener noreferrer">Protomaps</a>
			basemap tiles. Designed to meet WCAG 2.1 AA accessibility standards.
		</p>
	</section>

	<section>
		<h2>Credits</h2>
		<dl class="credits-list">
			<dt>Original Authors</dt>
			<dd>Tom Weatherburn &amp; William Davis (2018)</dd>
			<dt>Redesign</dt>
			<dd>Tom Weatherburn (2026)</dd>
			<dt>Data</dt>
			<dd>City of Toronto Open Data</dd>
			<dt>Basemap</dt>
			<dd>Protomaps &amp; OpenStreetMap contributors</dd>
		</dl>
	</section>
</article>

<style>
	.about-page {
		max-width: 680px;
		margin: 0 auto;
		padding: var(--space-8) var(--space-4);
	}

	h1 {
		font-size: var(--text-3xl);
		font-weight: var(--font-bold);
		margin-bottom: var(--space-8);
	}

	section {
		margin-bottom: var(--space-8);
	}

	h2 {
		font-size: var(--text-xl);
		font-weight: var(--font-semibold);
		margin-bottom: var(--space-3);
		padding-bottom: var(--space-2);
		border-bottom: 1px solid var(--color-border-subtle);
	}

	p {
		line-height: var(--leading-relaxed);
		color: var(--color-text-secondary);
		margin-bottom: var(--space-3);
	}

	ul {
		padding-left: var(--space-6);
		color: var(--color-text-secondary);
		line-height: var(--leading-relaxed);
	}

	li {
		margin-bottom: var(--space-3);
	}

	.credits-list {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: var(--space-2) var(--space-4);
	}

	.credits-list dt {
		font-weight: var(--font-semibold);
		color: var(--color-text-tertiary);
	}

	.credits-list dd {
		margin: 0;
		color: var(--color-text-secondary);
	}
</style>
