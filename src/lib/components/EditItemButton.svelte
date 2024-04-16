<script lang="ts">
	import ItemsRepo from '$lib/api/ItemsRepo';
	import type { Item } from '$lib/entities/Item';
	import type { ItemFormFields } from '$lib/entities/ItemFormFields';
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Context } from 'svelte-simple-modal';
	import IconButton from './IconButton.svelte';
	import ItemForm from './ItemForm.svelte';

	const dispatch = createEventDispatcher();

	const { open, close } = getContext<Context>('simple-modal');

	export let i: Item;

	async function onClick(e: MouseEvent) {
		e.preventDefault();

		open(ItemForm, {
			i,
			onSubmit: async (fields: ItemFormFields) => {
				await ItemsRepo.update(i.id, fields);
				dispatch('edit');
				close();
			}
		});
	}
</script>

<IconButton on:click={onClick}>✏️</IconButton>
