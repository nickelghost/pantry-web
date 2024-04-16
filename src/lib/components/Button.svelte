<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	export let style = '';
	export let className = '';
	export let isSquare = false;
	export let type: HTMLButtonAttributes['type'] = undefined;
</script>

<button class={className} {type} class:is-square={isSquare} {style} on:click>
	<slot />
</button>

<style>
	button {
		border: none;
		border-radius: 8px;
		background: var(--background, rgb(240, 245, 255));
		color: var(--color, rgb(28, 28, 56));
		padding: 8px 16px;
	}

	.is-square {
		border-radius: 0;
	}
</style>
