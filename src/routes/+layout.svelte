<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Header from '$lib/components/Header.svelte';
	import Input from '$lib/components/Input.svelte';
	import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';
	import firebaseApp from '$lib/firebase/firebaseApp';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import {
		GoogleAuthProvider,
		getAuth,
		onAuthStateChanged,
		signInWithEmailAndPassword,
		signInWithRedirect
	} from 'firebase/auth';
	import 'normalize.css';
	import { onMount } from 'svelte';
	import Modal from 'svelte-simple-modal';

	const queryClient = new QueryClient();
	const provider = new GoogleAuthProvider();
	const auth = getAuth(firebaseApp);

	let shouldRender = false;
	let isLoading = true;

	onMount(async () => {
		onAuthStateChanged(auth, async (user) => {
			isLoading = false;
			shouldRender = !!user;
		});
	});

	const handleEmailSignIn = async (e: SubmitEvent) => {
		e.preventDefault();
		isLoading = true;
		const form = e.target as HTMLFormElement;
		await signInWithEmailAndPassword(auth, form.email.value, form.password.value);
	};
</script>

{#if isLoading}
	<LoadingIndicator />
{/if}

{#if !shouldRender && !isLoading}
	{#if window.location.hostname === 'localhost'}
		<form on:submit={handleEmailSignIn}>
			<Input type="email" label="Email" name="email" />
			<Input type="password" label="Password" name="password" />
			<Button type="submit">Sign in</Button>
		</form>
	{:else}
		<Button on:click={async () => await signInWithRedirect(auth, provider)}>Google Sign in</Button>
	{/if}
{/if}

{#if shouldRender}
	<QueryClientProvider client={queryClient}>
		<Modal>
			<div id="content">
				<Header />
				<main>
					<slot />
				</main>
			</div>
		</Modal>
	</QueryClientProvider>
{/if}

<style global>
	body {
		background: hsl(223, 11%, 12%);
		color: white;
		display: grid;
		font-family: 'Tauri', sans-serif;
		grid-template-columns: 1fr minmax(0, 960px) 1fr;
	}

	body > * > * {
		grid-column-start: 2;
	}

	h1,
	h2,
	button {
		font-family: 'Aleo', serif;
	}

	#content {
		grid-column-start: 2;
		padding: 12px 24px;
	}
</style>
