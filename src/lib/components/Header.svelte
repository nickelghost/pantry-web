<script lang="ts">
	import firebaseApp from '$lib/firebase/firebaseApp';
	import { getAuth, signOut } from 'firebase/auth';
	import Button from './Button.svelte';
</script>

<header>
	<h1>Pantry</h1>
	<Button
		--background="rgb(73, 106, 226)"
		--color="white"
		style="grid-column-start: 3;"
		on:click={() => signOut(getAuth(firebaseApp))}>Log out</Button
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
