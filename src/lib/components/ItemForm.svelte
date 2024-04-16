<script lang="ts">
	import type { Item } from '$lib/entities/Item';
	import type { ItemFormFields } from '$lib/entities/ItemFormFields';
	import Button from './Button.svelte';
	import Form from './Form.svelte';
	import Input from './Input.svelte';
	import LocationInput from './LocationInput.svelte';

	export let i: undefined | Item = undefined;
	export let onSubmit: (fields: ItemFormFields) => void;

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);

		const fields: ItemFormFields = {
			name: formData.get('name') as string,
			type: formData.get('type') ? (formData.get('type') as string) : null,
			tags: formData.get('tags') ? (formData.get('tags') as string).split(',') : [],
			boughtAt: new Date(formData.get('boughtAt') as string),
			openedAt: formData.get('openedAt') ? new Date(formData.get('openedAt') as string) : null,
			expiresAt: formData.get('expiresAt') ? new Date(formData.get('expiresAt') as string) : null,
			lifespan: formData.get('lifespan') ? parseInt(formData.get('lifespan') as string) : null,
			price: formData.get('price')
				? parseInt((formData.get('price') as string).replace(/\D/g, ''))
				: null,
			locationId: formData.get('locationId') ? (formData.get('locationId') as string) : null
		};

		onSubmit(fields);
	}
</script>

<Form on:submit={handleSubmit}>
	<Input label="Name" name="name" value={i && i.name} />
	<Input label="Type" name="type" value={i && i.type} />
	<Input label="Tags (separated by ,)" name="tags" value={i?.tags && i.tags.join(',')} />
	<Input
		label="Bought at"
		name="boughtAt"
		type="date"
		value={i && i.boughtAt.toISOString().split('T')[0]}
	/>
	<Input
		label="Opened at"
		name="openedAt"
		type="date"
		value={i && i.openedAt?.toISOString().split('T')[0]}
	/>
	<Input
		label="Expires at"
		name="expiresAt"
		type="date"
		value={i && i.expiresAt?.toISOString().split('T')[0]}
	/>
	<Input label="Lifespan" name="lifespan" type="number" value={i && i.lifespan} />
	<Input label="Price" name="price" type="number" step=".01" value={i?.price && i.price / 100} />
	<LocationInput value={i && i.locationId} />
	<div slot="actions" style="display: contents;">
		<Button --background="rgb(73, 106, 226)" --color="white" type="submit">Save</Button>
	</div>
</Form>
