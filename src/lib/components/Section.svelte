<script lang="ts">
	export let name: string | undefined = undefined;
</script>

<div class="container">
	{#if name}
		<div class="heading-wrapper">
			<h2>{name}</h2>
			<slot name="heading" />
		</div>
	{/if}

	<slot />
</div>

<style>
	.container {
		border-top: 2px solid rgb(140, 149, 164);
		padding: 16px 0;
	}

	.heading-wrapper {
		align-items: center;
		display: flex;
		gap: 16px;
	}

	h2 {
		font-size: 2.25rem;
		margin: 16px 0 24px 0;
	}
</style>
