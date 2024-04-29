<script lang="ts">
	import type { Item } from '$lib/entities/Item';
	import ItemCard from './ItemCard.svelte';

	export let items: Item[] | undefined = [];
	export let selectedTags: string[] = [];
</script>

{#if items && items.length > 0}
	<ul>
		{#each items as i}
			<li>
				<ItemCard {i} {selectedTags} on:update on:toggleTag />
			</li>
		{/each}
	</ul>
{/if}

<style>
	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		margin-bottom: 12px;
	}
</style>
