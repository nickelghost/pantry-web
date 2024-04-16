import type { Handle } from '@sveltejs/kit';
import { minify } from 'html-minifier-terser';

const minification_options = {
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
		transformPageChunk: ({ html }) => minify(html, minification_options)
	});

	return response;
};
