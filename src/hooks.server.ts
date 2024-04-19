import type { Handle } from '@sveltejs/kit';
import { createHash } from 'crypto';
import { minify } from 'html-minifier-terser';

const minificationOptions = {
	collapseWhitespace: true,
	collapseInlineTagWhitespace: true,
	removeComments: true,
	ignoreCustomComments: [/^#/],
	minifyCSS: true,
	minifyJS: true,
	sortAttributes: true,
	sortClassName: true
};

export const handle: Handle = async function ({ event, resolve }) {
	const response = await resolve(event, {
		transformPageChunk: async ({ html }) => {
			const minified = await minify(html, minificationOptions);
			const match = minified.match(/<script>(.*)<\/script>/);

			if (!match) return minified;

			const content = match[1];
			const hash = createHash('sha256').update(content).digest('base64');
			return minified.replace(/'sha256-[^\s]*';/, `'sha256-${hash}';`);
		}
	});

	return response;
};
