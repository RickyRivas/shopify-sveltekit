<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let productVariants;

	// activeTabValue is being accessed by parent
	// the first button is active initially
	let activeTabValue = 0;

	// toggling active tabs when button is pushed
	function handleClick(tabValue) {
		if (activeTabValue === tabValue) {
			return;
		} else {
			activeTabValue = tabValue;
		}
	}
</script>

<div class="options-variants">
	<p>Options:</p>
	<div class="flex">
		{#each productVariants as { id, quantityAvailable, title }, index}
			<div>
				<button
					class="btn {activeTabValue === index ? 'active option' : 'option'}"
					disabled={quantityAvailable === 0}
					on:click={() => {
						dispatch('update-item', id);
						handleClick(index);
					}}>{title}</button
				>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.options-variants {
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.5em;
		p {
			text-transform: uppercase;
		}
		.flex {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		& > div {
			margin-right: 0.5em;
		}
	}

	button {
		border: none;
		background-color: #f1f1f1;
		padding: 0.5em 1em;
		position: relative;
		margin-left: 0.2em;
		&.active {
			background-color: #000;
			color: #fff;
		}
	}
</style>
