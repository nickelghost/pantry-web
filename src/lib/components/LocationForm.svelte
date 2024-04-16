<script lang="ts">
	import type { Location } from '$lib/entities/Location';
	import type { LocationFormFields } from '$lib/entities/LocationFormFields';
	import Button from './Button.svelte';
	import Form from './Form.svelte';
	import Input from './Input.svelte';

	export let l: undefined | Location = undefined;
	export let onSubmit: (fields: LocationFormFields) => void;

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);

		onSubmit({ name: formData.get('name') as string });
	}
</script>

<Form on:submit={handleSubmit}>
	<Input label="Name" name="name" value={l && l.name} />
	<div slot="actions" style="display: contents;">
		<Button --background="rgb(73, 106, 226)" --color="white" type="submit">Save</Button>
	</div>
</Form>
