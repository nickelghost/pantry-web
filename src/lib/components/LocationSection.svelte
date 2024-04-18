<script lang="ts">
	import type { Location } from '../entities/Location';
	import DeleteLocationButton from './DeleteLocationButton.svelte';
	import EditLocationButton from './EditLocationButton.svelte';
	import Section from './Section.svelte';

	export let l: Location;
	export let onEdit: () => void;
	export let onDelete: () => void;
</script>

<Section name={l.name}>
	<div slot="heading">
		{#if onEdit}
			<EditLocationButton {l} on:edit={onEdit} />
		{/if}
		{#if onDelete}
			<DeleteLocationButton {l} on:delete={onDelete} />
		{/if}
	</div>
	<slot />
</Section>
