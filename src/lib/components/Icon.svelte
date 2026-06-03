<script lang="ts">
	import { base } from '$app/paths';

	let {
		name,
		size = 20,
		label
	}: {
		name: string;
		size?: number;
		label?: string;
	} = $props();
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="currentColor"
	aria-hidden={!label}
	role={label ? 'img' : undefined}
	aria-label={label}
	class="icon"
>
	<use href="{base}/icons/{name}.svg#icon" />
</svg>

<style>
	.icon {
		display: inline-block;
		vertical-align: middle;
		flex-shrink: 0;
	}
</style>
