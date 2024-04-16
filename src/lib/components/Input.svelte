<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	export let label: string = '';

	interface $$Props extends HTMLInputAttributes {
		label: string;
	}
</script>

<label>
	{label}
	<input {...$$restProps} />
</label>

<style>
	label {
		margin: 12px 0;
	}

	input {
		background: white;
		border: 1px solid hsl(223, 11%, 68%);
		border-radius: 8px;
		box-sizing: border-box;
		display: block;
		margin: 12px 0;
		padding: 8px 12px;
		width: 100%;
	}
</style>
