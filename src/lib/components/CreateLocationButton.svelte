<script lang="ts">
	import LocationsRepo from '$lib/api/LocationsRepo';
	import type { LocationFormFields } from '$lib/entities/LocationFormFields';
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Context } from 'svelte-simple-modal';
	import Button from './Button.svelte';
	import LocationForm from './LocationForm.svelte';

	const dispatch = createEventDispatcher();
	const { open, close } = getContext<Context>('simple-modal');

	async function onClick(e: MouseEvent) {
		e.preventDefault();

		open(LocationForm, {
			onSubmit: async (fields: LocationFormFields) => {
				await LocationsRepo.create(fields.name);
				dispatch('create');
				close();
			}
		});
	}
</script>

<Button on:click={onClick}>Create Location</Button>
