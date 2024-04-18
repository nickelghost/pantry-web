<script lang="ts">
	import ItemsRepo from '$lib/api/ItemsRepo';
	import type { Item } from '$lib/entities/Item';
	import { createEventDispatcher } from 'svelte';
	import IconButton from './IconButton.svelte';

	export let i: Item;

	const dispatch = createEventDispatcher();

	async function onClick(e: MouseEvent) {
		e.preventDefault();

		if (confirm(`Are you sure you want to delete ${i.name}?`)) {
			await ItemsRepo.remove(i.id);
			dispatch('delete');
		}
	}
</script>

<IconButton on:click={onClick}>🗑️</IconButton>
