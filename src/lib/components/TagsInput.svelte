<script lang="ts">
	import { onMount } from 'svelte';
	import Button from './Button.svelte';

	export let label: string = '';
	export let name: string;
	export let value: string[] = [];
	export let error: string | undefined = undefined;

	let tags: string[] = [];
	let inputEl: HTMLInputElement;

	onMount(() => {
		tags = value;
	});

	function onTagSubmit(e: SubmitEvent) {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);
		const newTag = formData.get(`${name}New`) as string;

		if (newTag === '') {
			return;
		}

		inputEl.value = '';
		tags = [...tags, newTag];
	}
</script>

<label>
	{label}
	<form on:submit={onTagSubmit}>
		<input name={`${name}New`} bind:this={inputEl} />
		<Button type="submit">Add</Button>
	</form>

	{#if tags.length > 0}
		<div class="tags">
			{#each tags as tag, i}
				<div class="tag">
					#{tag}
					<input style="display: none;" {name} value={tag} readonly />
					<Button type="button" on:click={() => (tags = tags.filter((_, j) => i !== j))}>-</Button>
				</div>
			{/each}
		</div>
	{/if}

	{#if error}
		<div class="error">
			{error}
		</div>
	{/if}
</label>

<style>
	form,
	.tag {
		display: flex;
		gap: 8px;
		padding: 4px 0;
	}

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
		padding: 8px 12px;
		width: 100%;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		column-gap: 16px;
	}

	.tag {
		align-items: center;
	}

	.tag input {
		border: none;
	}

	.error {
		color: red;
		font-size: 0.875rem;
		margin-top: 4px;
	}
</style>
