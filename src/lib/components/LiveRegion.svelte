<script lang="ts">
	import { onMount } from 'svelte';
	import { registerAnnouncer } from '$lib/a11y';

	let message = $state('');

	onMount(() => {
		registerAnnouncer((msg: string) => {
			message = '';
			// Force screen reader to re-announce by clearing then setting
			requestAnimationFrame(() => {
				message = msg;
			});
		});
	});
</script>

<div role="status" aria-live="polite" aria-atomic="true" class="live-region">
	{message}
</div>

<style>
	.live-region {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}
</style>
