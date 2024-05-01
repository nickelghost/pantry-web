<script lang="ts">
	import type { Item } from '$lib/entities/Item';
	import { createEventDispatcher } from 'svelte';
	import DeleteItemButton from './DeleteItemButton.svelte';
	import EditItemButton from './EditItemButton.svelte';
	import MoveItemButton from './MoveItemButton.svelte';

	export let i: Item;
	export let selectedTags: string[] = [];

	const dispatch = createEventDispatcher();

	const getPriceString = (price: number) =>
		(price / 100).toLocaleString('pl-PL', {
			style: 'currency',
			currency: 'PLN'
		});

	const getDaysDiff = (date: Date) => {
		const now = new Date();
		const diff = date.getTime() - now.getTime();
		return Math.ceil(diff / (1000 * 60 * 60 * 24));
	};
</script>

<h2>{i.name}</h2>

{#if i.type || i.price || i.price === 0 || i.lifespan}
	<h3>
		{#if i.type}
			<span>{i.type}</span>
		{/if}
		{#if i.price || i.price === 0}
			<span class="price-info">
				{getPriceString(i.price)}
			</span>
		{/if}
		{#if i.lifespan}
			<span>{i.lifespan}d</span>
		{/if}
	</h3>
{/if}

<div class="row">
	<div class="timestamp">
		{#if i.boughtAt}
			Bought at {i.boughtAt.toLocaleDateString()}
		{/if}
	</div>
	<div class="timestamp">
		{#if i.openedAt}
			<span
				class:timestamp-warning={i.lifespan && getDaysDiff(i.openedAt) + i.lifespan === 0}
				class:timestamp-error={i.lifespan && getDaysDiff(i.openedAt) + i.lifespan < 0}
			>
				Opened at {i.openedAt.toLocaleDateString()}
			</span>
		{/if}
	</div>
	<div class="timestamp">
		{#if i.expiresAt}
			<span
				class:timestamp-warning={getDaysDiff(i.expiresAt) <= 3}
				class:timestamp-error={getDaysDiff(i.expiresAt) <= 0}
			>
				Expires at {i.expiresAt.toLocaleDateString()}
			</span>
		{/if}
	</div>
	<div>
		<MoveItemButton {i} on:move={() => dispatch('update')} />
		<EditItemButton {i} on:edit={() => dispatch('update')} />
		<DeleteItemButton {i} on:delete={() => dispatch('update')} />
	</div>
</div>

{#if i.tags}
	<ul class="tags">
		{#each i.tags as tag}
			<li class="tag" class:tag-selected={selectedTags.includes(tag)}>
				<button
					on:click={() => {
						dispatch('toggleTag', tag);
					}}
				>
					#{tag}
				</button>
			</li>
		{/each}
	</ul>
{/if}

<style>
	h2 {
		font-size: 1.5rem;
		margin-bottom: 8px;
	}

	h3 {
		color: hsl(223, 11%, 68%);
		display: grid;
		font-size: 1rem;
		gap: 12px;
		grid-template-columns: repeat(3, max-content);
		margin: 8px 0;
	}

	.price-info {
		color: hsl(43, 91%, 50%);
	}

	.row {
		display: grid;
		grid-template-columns: repeat(3, 1fr) max-content;
		margin-bottom: 8px;
	}

	.timestamp {
		line-height: 1.5;
	}

	.timestamp-warning {
		color: hsl(26, 100%, 56%);
	}

	.timestamp-error {
		color: hsl(0, 100%, 50%);
	}

	ul.tags {
		list-style: none;
		padding: 0;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.tag {
		color: hsl(190, 76%, 74%);
		padding: 2px 4px;
	}

	.tag-selected {
		color: black;
		background: hsl(190, 76%, 74%);
		border-radius: 8px;
		overflow: hidden;
	}

	.tag button {
		color: inherit;
		background: inherit;
		border: inherit;
		font: inherit;
	}
</style>
