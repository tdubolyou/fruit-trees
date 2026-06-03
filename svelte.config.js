import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: false,
			strict: true
		}),
		// Served from https://tdubolyou.github.io/FruitTrees
		paths: {
			base: dev ? '' : '/FruitTrees'
		},
		// Avoid the leading-underscore dir so GitHub Pages (Jekyll) won't skip it.
		appDir: 'app'
	}
};

export default config;
