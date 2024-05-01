<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	export let label: string = '';
	export let error: string | null | undefined = undefined;

	interface $$Props extends HTMLInputAttributes {
		label: string;
		error: string | undefined | null;
	}
</script>

<label>
	{label}
	<input {...$$restProps} />
	{#if error}
		<div class="error">
			{error}
		</div>
	{/if}
</label>

<style>
	label {
		display: block;
		padding: 8px 0;
	}

	input {
		background: white;
		border: 1px solid hsl(223, 11%, 68%);
		border-radius: 8px;
		box-sizing: border-box;
		display: block;
		margin: 4px 0;
		padding: 8px 12px;
		width: 100%;
	}

	.error {
		color: red;
		font-size: 0.875rem;
		margin-top: 4px;
	}
</style>
