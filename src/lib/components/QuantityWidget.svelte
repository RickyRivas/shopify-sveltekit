<script>
	export let quantity;
	export let maxCount;

	function increment() {
		quantity = quantity + 1;
	}
	function decrement() {
		quantity = quantity - 1;
	}
	function checkInput() {
		if (quantity <= 0 || quantity > maxCount) {
			quantity = 1;
		}
	}
</script>

<div class="container">
	<button class="rem" on:click={decrement} disabled={quantity <= 1 ? 'true' : ''}>-</button>
	<input
		class="qty"
		type="number"
		bind:value={quantity}
		on:blur={checkInput}
		min="1"
		max={maxCount}
	/>
	<button class="add" on:click={increment} disabled={quantity == maxCount}>+</button>
</div>

<style lang="scss">
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		width: max-content;
		margin-bottom: 1em;
		box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px;
		button {
			border: 0;
			background-color: black;
			color: #fff;

			&:disabled {
				background-color: #595a5c;
				pointer-events: none;
			}
		}
		.qty {
			width: 5em;
			height: 3em;
			border: 0;
			text-align: center;
		}
		.add,
		.rem {
			width: 3em;
			height: 3em;
			cursor: pointer;
		}
		.rem {
			background-color: #e5383b;
		}
		.add {
		}
	}
</style>
