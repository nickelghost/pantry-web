<script lang="ts">
	import ItemsRepo from '$lib/api/ItemsRepo';
	import type { ItemFormFields } from '$lib/entities/ItemFormFields';
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Context } from 'svelte-simple-modal';
	import Button from './Button.svelte';
	import ItemForm from './ItemForm.svelte';

	const dispatch = createEventDispatcher();

	const { open, close } = getContext<Context>('simple-modal');

	async function onClick(e: MouseEvent) {
		e.preventDefault();

		open(ItemForm, {
			onSubmit: async (fields: ItemFormFields) => {
				await ItemsRepo.create(fields);
				dispatch('create');
				close();
			}
		});
	}
</script>

<Button on:click={onClick}>Create Item</Button>
