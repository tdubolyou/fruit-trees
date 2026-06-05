import type { FruitTreeFeatureCollection, TreeMeta } from '$lib/types';

class TreeState {
	data = $state.raw<FruitTreeFeatureCollection | null>(null);
	meta = $state.raw<TreeMeta | null>(null);
	// Starts true: we always load on mount, so the map shouldn't flash-mount
	// before data is ready (which would unmount it mid-init).
	loading = $state(true);
	error = $state<string | null>(null);

	get count(): number {
		return this.data?.features.length ?? 0;
	}

	get lastUpdated(): string | null {
		return this.meta?.lastUpdated ?? null;
	}

	async load(basePath: string = '') {
		this.loading = true;
		this.error = null;
		try {
			const [treeRes, metaRes] = await Promise.all([
				fetch(`${basePath}/data/trees.geojson`),
				fetch(`${basePath}/data/meta.json`)
			]);

			if (!treeRes.ok) throw new Error(`Failed to load trees: ${treeRes.status}`);
			if (!metaRes.ok) throw new Error(`Failed to load meta: ${metaRes.status}`);

			this.data = await treeRes.json();
			this.meta = await metaRes.json();
		} catch (e) {
			this.error = e instanceof Error ? e.message : 'Failed to load tree data';
		} finally {
			this.loading = false;
		}
	}
}

export const treeState = new TreeState();
