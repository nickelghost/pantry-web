import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		env: {
			publicPrefix: ''
		},
		csp: {
			directives: {
				'default-src': ['self'],
				'script-src': ['self', 'https://apis.google.com'],
				'style-src': ['self', 'unsafe-inline', 'https://fonts.googleapis.com'],
				'font-src': ['self', 'https://fonts.gstatic.com'],
				'connect-src': ['self', 'https://*.googleapis.com', 'https://api.pantry.nickelghost.com'],
				'frame-src': ['self', 'https://pantry.nickelghost.com']
			}
		}
	}
};

export default config;
