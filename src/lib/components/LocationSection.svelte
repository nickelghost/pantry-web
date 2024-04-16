<script lang="ts">
	import type { Location } from '../entities/Location';
	import EditLocationButton from './EditLocationButton.svelte';
	import LocationDeleteButton from './LocationDeleteButton.svelte';
	import Section from './Section.svelte';

	export let l: Location;
	export let onEdit: () => void;
	export let onDelete: () => void;
</script>

<Section name={l.name}>
	<div slot="heading">
		{#if onEdit}
			<EditLocationButton {l} on:edit={onEdit}>✏️</EditLocationButton>
		{/if}
		{#if onDelete}
			<LocationDeleteButton {l} on:delete={onDelete}>🗑️</LocationDeleteButton>
		{/if}
	</div>
	<slot />
</Section>
