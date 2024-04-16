<script lang="ts">
	import ItemsRepo from '$lib/api/ItemsRepo';
	import LocationsRepo from '$lib/api/LocationsRepo';
	import type { Item } from '$lib/entities/Item';
	import { createQuery } from '@tanstack/svelte-query';
	import { createEventDispatcher } from 'svelte';
	import Button from './Button.svelte';
	import IconButton from './IconButton.svelte';

	export let i: Item;

	let isShowing = false;

	const dispatch = createEventDispatcher();

	const query = createQuery({
		queryKey: ['locations'],
		queryFn: LocationsRepo.index,
		refetchOnWindowFocus: true
	});

	async function onClick(e: MouseEvent, id: string | null) {
		e.preventDefault();

		await ItemsRepo.move(i.id, id);
		isShowing = false;

		dispatch('move');
	}
</script>

<div class="container" role="dialog" on:mouseleave={() => (isShowing = false)}>
	<IconButton
		on:click={() => {
			isShowing = !isShowing;
		}}>➡️</IconButton
	>

	{#if isShowing && $query.data}
		<ul class="list">
			{#each $query.data.locations as location}
				{#if location.id !== i.locationId}
					<li>
						<Button isSquare on:click={(e) => onClick(e, location.id)}>{location.name}</Button>
					</li>
				{/if}
			{/each}
			{#if i.locationId !== null}
				<li>
					<Button isSquare on:click={(e) => onClick(e, null)}>None</Button>
				</li>
			{/if}
		</ul>
	{/if}
</div>

<style>
	.container {
		display: contents;
	}

	.list {
		list-style-type: none;
		padding: 0;
		position: absolute;
	}
</style>
