<script lang="ts">
	import type { Item } from '$lib/entities/Item';
	import { createEventDispatcher } from 'svelte';
	import ItemCard from './ItemCard.svelte';

	const dispatch = createEventDispatcher();

	export let items: Item[] | undefined = [];
</script>

{#if items && items.length > 0}
	<ul>
		{#each items as i}
			<li>
				<ItemCard {i} on:update={() => dispatch('update')} />
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
