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
	<p>Qty:</p>

	<div class="flex">
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
</div>

<style lang="scss">
	.container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: max-content;
		margin-bottom: 1em;
		width: 100%;
		p {
			text-transform: uppercase;
		}
		.flex {
			display: flex;
			justify-content: center;
			align-items: center;
			box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px;
			border-bottom: 1px solid #000;
		}
		button {
			border: 0;
			background-color: transparent;
			color: #000;

			&:disabled {
				background-color: #f4f4f4;
				pointer-events: none;
			}
		}
		.qty {
			width: 3em;
			height: 2em;
			border: 0;
			text-align: center;
		}
		.add,
		.rem {
			width: 3em;
			height: 2.5em;
			cursor: pointer;
		}
		.rem {
			background-color: transparent;
			border-right: 1px solid #f1f1f1;
		}
		.add {
			border-left: 1px solid #f1f1f1;
		}
	}
</style>
