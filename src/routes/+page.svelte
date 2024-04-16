<script lang="ts">
	import LocationsRepo from '$lib/api/LocationsRepo';
	import ButtonGroup from '$lib/components/ButtonGroup.svelte';
	import CreateItemButton from '$lib/components/CreateItemButton.svelte';
	import CreateLocationButton from '$lib/components/CreateLocationButton.svelte';
	import ItemsList from '$lib/components/ItemsList.svelte';
	import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';
	import LocationSection from '$lib/components/LocationSection.svelte';
	import Section from '$lib/components/Section.svelte';
	import { createQuery } from '@tanstack/svelte-query';

	const query = createQuery({
		queryKey: ['locations'],
		queryFn: LocationsRepo.index,
		refetchOnWindowFocus: true
	});
</script>

<Section>
	<ButtonGroup>
		<CreateLocationButton on:create={() => $query.refetch()} />
		<CreateItemButton on:create={() => $query.refetch()} />
	</ButtonGroup>
</Section>

{#if $query.isLoading}
	<LoadingIndicator />
{:else if $query.isError}
	<p>Error: {$query.error.message}</p>
{:else if $query.isSuccess && $query.data}
	{#each $query.data.locations as l}
		<LocationSection {l} onEdit={$query.refetch} onDelete={$query.refetch}>
			<ItemsList items={l.items} on:update={() => $query.refetch()} />
		</LocationSection>
	{/each}

	{#if $query.data.remainingItems.length > 0}
		<Section>
			<ItemsList items={$query.data.remainingItems} on:update={() => $query.refetch()} />
		</Section>
	{/if}
{/if}
