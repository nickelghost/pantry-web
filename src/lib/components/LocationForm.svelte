<script lang="ts">
	import type { Location } from '$lib/entities/Location';
	import {
		LocationFormFieldsSchema,
		type LocationFormFields
	} from '$lib/entities/LocationFormFields';
	import type { ZodFormattedError } from 'zod';
	import Button from './Button.svelte';
	import Form from './Form.svelte';
	import Input from './Input.svelte';

	export let l: undefined | Location = undefined;
	export let onSubmit: (fields: LocationFormFields) => void;

	let vErrors: ZodFormattedError<LocationFormFields> | null = null;

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);

		const fields = {
			name: formData.get('name') as string
		};

		const validation = LocationFormFieldsSchema.safeParse(fields);

		if (!validation.success) {
			vErrors = validation.error?.format();
			return;
		}

		onSubmit(fields);
	}
</script>

<Form on:submit={handleSubmit}>
	<Input label="Name" name="name" value={l && l.name} error={vErrors?.name?._errors[0]} />
	<div slot="actions" style="display: contents;">
		<Button --background="rgb(73, 106, 226)" --color="white" type="submit">Save</Button>
	</div>
</Form>
