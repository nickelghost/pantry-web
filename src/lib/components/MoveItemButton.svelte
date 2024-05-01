<script lang="ts">
	import ItemsRepo from '$lib/api/ItemsRepo';
	import LocationsRepo from '$lib/api/LocationsRepo';
	import type { Item } from '$lib/entities/Item';
	import { createQuery } from '@tanstack/svelte-query';
	import { createEventDispatcher } from 'svelte';
	import IconButton from './IconButton.svelte';

	export let i: Item;

	let isShowing = false;

	const dispatch = createEventDispatcher();

	const query = createQuery({
		queryKey: ['locations'],
		queryFn: () => LocationsRepo.index(),
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
						<button on:click={(e) => onClick(e, location.id)}>{location.name}</button>
					</li>
				{/if}
			{/each}
			{#if i.locationId !== null}
				<li>
					<button on:click={(e) => onClick(e, null)}>None</button>
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
		background: hsl(223, 11%, 12%);
		border: 1px solid rgb(140, 149, 164);
		list-style-type: none;
		padding: 0;
		position: absolute;
	}

	li:not(:last-child) {
		border-bottom: 1px solid rgb(140, 149, 164);
	}

	button {
		background: none;
		border: none;
		color: white;
		padding: 8px 16px;
	}
</style>
