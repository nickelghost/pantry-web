<script lang="ts">
	import LocationsRepo from '$lib/api/LocationsRepo';
	import type { Location } from '$lib/entities/Location';
	import { createEventDispatcher } from 'svelte';
	import IconButton from './IconButton.svelte';

	export let l: Location;

	const dispatch = createEventDispatcher();

	async function onClick(e: MouseEvent) {
		e.preventDefault();

		if (confirm(`Are you sure you want to delete ${l.name}?`)) {
			await LocationsRepo.remove(l.id);
			dispatch('delete');
		}
	}
</script>

<IconButton on:click={onClick}>🗑️</IconButton>
