<form on:submit>
	<slot />
	<div class="actions">
		<slot name="actions" />
	</div>
</form>

<style>
	form {
		padding: 8px 16px;
	}

	.actions {
		display: flex;
		flex-direction: row-reverse;
		justify-content: space-between;
		margin-top: 24px;
	}
</style>
