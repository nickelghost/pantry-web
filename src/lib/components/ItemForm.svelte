<script lang="ts">
	import type { Item } from '$lib/entities/Item';
	import { ItemFormFieldsSchema, type ItemFormFields } from '$lib/entities/ItemFormFields';
	import type { ZodFormattedError } from 'zod';
	import Button from './Button.svelte';
	import Form from './Form.svelte';
	import Input from './Input.svelte';
	import LocationInput from './LocationInput.svelte';
	import TagsInput from './TagsInput.svelte';

	export let i: undefined | Item = undefined;
	export let onSubmit: (fields: ItemFormFields) => void;

	let vErrors: ZodFormattedError<ItemFormFields> | null = null;

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);

		const priceStr = formData.get('price') as string;
		const price: number | null = priceStr
			? parseInt(/[\.\,]/.test(priceStr) ? priceStr.replace(/[\.\,]/g, '') : priceStr + '00')
			: null;

		const fields: ItemFormFields = {
			name: formData.get('name') as string,
			type: formData.get('type') ? (formData.get('type') as string) : null,
			tags: formData.getAll('tags') as string[],
			boughtAt: new Date(formData.get('boughtAt') as string),
			openedAt: formData.get('openedAt') ? new Date(formData.get('openedAt') as string) : null,
			expiresAt: formData.get('expiresAt') ? new Date(formData.get('expiresAt') as string) : null,
			lifespan: formData.get('lifespan') ? parseInt(formData.get('lifespan') as string) : null,
			price,
			locationId: formData.get('locationId') ? (formData.get('locationId') as string) : null
		};

		const validation = ItemFormFieldsSchema.safeParse(fields);

		if (!validation.success) {
			vErrors = validation.error?.format();
			return;
		}

		onSubmit(fields);
	}
</script>

<Form on:submit={handleSubmit}>
	<Input label="Name" name="name" value={i && i.name} error={vErrors?.name?._errors[0]} />
	<Input label="Type" name="type" value={i && i.type} error={vErrors?.type?._errors[0]} />
	<TagsInput label="Tags" name="tags" value={i?.tags} error={vErrors?.tags?._errors[0]} />
	<Input
		label="Bought at"
		name="boughtAt"
		type="date"
		value={i ? i.boughtAt.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
		error={vErrors?.boughtAt?._errors[0]}
	/>
	<Input
		label="Opened at"
		name="openedAt"
		type="date"
		value={i && i.openedAt?.toISOString().split('T')[0]}
		error={vErrors?.openedAt?._errors[0]}
	/>
	<Input
		label="Expires at"
		name="expiresAt"
		type="date"
		value={i && i.expiresAt?.toISOString().split('T')[0]}
		error={vErrors?.expiresAt?._errors[0]}
	/>
	<Input
		label="Lifespan"
		name="lifespan"
		type="number"
		value={i && i.lifespan}
		error={vErrors?.lifespan?._errors[0]}
	/>
	<Input
		label="Price"
		name="price"
		type="number"
		step=".01"
		value={i?.price && i.price / 100}
		error={vErrors?.price?._errors[0]}
	/>
	<LocationInput value={i && i.locationId} />
	<div slot="actions" style="display: contents;">
		<Button --background="rgb(73, 106, 226)" --color="white" type="submit">Save</Button>
	</div>
</Form>
