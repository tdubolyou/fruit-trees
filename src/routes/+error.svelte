<script lang="ts">
	import { page } from '$app/state';
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>Error - Fruit Trees of Toronto</title>
</svelte:head>

<div class="error-page">
	<h1>{page.status}</h1>
	<p>{page.error?.message ?? 'Something went wrong.'}</p>
	<nav class="error-nav">
		<a href="{base}/">Back to map</a>
	</nav>
</div>

<style>
	.error-page {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 60vh;
		text-align: center;
		padding: var(--space-8);
	}

	h1 {
		font-size: var(--text-4xl);
		font-weight: var(--font-bold);
		color: var(--color-text-primary);
		margin-bottom: var(--space-3);
	}

	p {
		font-size: var(--text-lg);
		color: var(--color-text-tertiary);
		margin-bottom: var(--space-6);
	}

	.error-nav {
		display: flex;
		gap: var(--space-4);
	}

	.error-nav a {
		padding: var(--space-3) var(--space-6);
		border-radius: var(--radius-lg);
		font-weight: var(--font-medium);
	}

	.error-nav a:first-child {
		background: var(--color-bg-tertiary);
		color: var(--color-text-primary);
		border: 1px solid var(--color-border-default);
	}
</style>
