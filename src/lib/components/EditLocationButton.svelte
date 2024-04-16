<script lang="ts">
	import LocationsRepo from '$lib/api/LocationsRepo';
	import type { Location } from '$lib/entities/Location';
	import type { LocationFormFields } from '$lib/entities/LocationFormFields';
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Context } from 'svelte-simple-modal';
	import IconButton from './IconButton.svelte';
	import LocationForm from './LocationForm.svelte';

	const dispatch = createEventDispatcher();
	const { open, close } = getContext<Context>('simple-modal');

	export let l: Location;

	async function onClick(e: MouseEvent) {
		e.preventDefault();

		open(LocationForm, {
			l,
			onSubmit: async (fields: LocationFormFields) => {
				await LocationsRepo.update(l.id, fields.name);
				dispatch('edit');
				close();
			}
		});
	}
</script>

<IconButton on:click={onClick}>✏️</IconButton>
