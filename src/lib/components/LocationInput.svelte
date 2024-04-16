<script lang="ts">
	import LocationsRepo from '$lib/api/LocationsRepo';
	import { createQuery } from '@tanstack/svelte-query';

	export let value: string | null = null;

	const query = createQuery({
		queryKey: ['locations'],
		queryFn: LocationsRepo.index,
		refetchOnWindowFocus: true
	});
</script>

<label>
	Location
	<select name="locationId">
		<option selected={!value} value="">None</option>
		{#if $query.data}
			{#each $query.data.locations as location}}
				<option selected={value == location.id} value={location.id}>{location.name}</option>
			{/each}
		{/if}
	</select>
</label>

<style>
	label {
		margin: 12px 0;
	}

	select {
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
