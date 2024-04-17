<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import firebaseApp from '$lib/firebase/firebaseApp';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
	import 'normalize.css';
	import { onMount } from 'svelte';
	import Modal from 'svelte-simple-modal';

	const queryClient = new QueryClient();
	const provider = new GoogleAuthProvider();
	const auth = getAuth(firebaseApp);

	let shouldRender = false;

	onMount(async () => {
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				shouldRender = true;
			} else {
				const wasRendered = shouldRender;
				shouldRender = false;
				if (!wasRendered) {
					await signInWithPopup(auth, provider);
				}
			}
		});
	});
</script>

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

	h1,
	h2,
	button {
		font-family: 'Odor Mean Chey', sans-serif;
	}

	#content {
		grid-column-start: 2;
		padding: 12px 24px;
	}
</style>
