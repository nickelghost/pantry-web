<script lang="ts">
	import { signOut } from 'aws-amplify/auth';
	import Button from './Button.svelte';
</script>

<header>
	<h1>Pantry</h1>
	<Button
		--background="rgb(73, 106, 226)"
		--color="white"
		style="grid-column-start: 3;"
		on:click={() => signOut()}>Log out</Button
	>
</header>

<style>
	header {
		align-items: center;
		grid-column-start: 2;
		display: grid;
		grid-template-columns: max-content 1fr max-content;
	}

	h1 {
		color: rgb(255, 114, 63);
	}
</style>
