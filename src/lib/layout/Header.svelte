<script>
	// import
	import { onMount } from 'svelte';

	let count = 0;
	let cart;

	onMount(() => {
		cart = JSON.parse(localStorage.getItem('cart'));
		if (cart) {
			count = cart.lines.edges.length;
		}
	});
</script>

<header>
	<a href="/">
		<img src="/RivasWebDesigns.svg" alt="" class="logo" />
	</a>

	<a href="/cart" class="cart">
		<img
			class=""
			src="/shopping-bag.svg"
			alt=""
			width="40"
			height="34"
			loading="lazy"
			decoding="async"
		/>
		<div class="count">
			{count}
		</div>
	</a>
</header>

<style lang="scss">
	header {
		width: 100%;
		padding: 1em;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
		.logo {
			width: 5em;
		}
		.cart {
			width: 1.5em;
			height: 1.5em;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;

			img {
				width: 1.5em;
			}

			.count {
				background-color: black;
				color: #fff;
				height: 1.5em;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0.5em;
				font-size: 0.7em;
				position: absolute;
				top: -0.5em;
				right: -0.5em;
				border-radius: 50%;
			}
		}
	}
</style>
