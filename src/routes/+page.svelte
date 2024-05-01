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

	let selectedTags: string[] = [];

	function toggleTag(tag: string) {
		if (selectedTags.includes(tag)) {
			selectedTags = selectedTags.filter((t) => t !== tag);
		} else {
			selectedTags = [...selectedTags, tag];
		}
	}

	$: onSelectedTagsChange(selectedTags);

	function onSelectedTagsChange(_: string[]) {
		$query.refetch();
	}

	const query = createQuery({
		queryKey: ['locations', selectedTags],
		queryFn: () => LocationsRepo.index(selectedTags),
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
			<ItemsList
				items={l.items}
				{selectedTags}
				on:update={() => $query.refetch()}
				on:toggleTag={(e) => toggleTag(e.detail)}
			/>
		</LocationSection>
	{/each}

	{#if $query.data.remainingItems.length > 0}
		<Section>
			<ItemsList
				items={$query.data.remainingItems}
				{selectedTags}
				on:update={() => $query.refetch()}
				on:toggleTag={(e) => toggleTag(e.detail)}
			/>
		</Section>
	{/if}
{/if}
