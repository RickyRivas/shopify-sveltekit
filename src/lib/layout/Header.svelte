<script>
	import { onMount } from 'svelte';
	import { cartCount } from '../../stores';

	let count;

	cartCount.subscribe((data) => {
		count = data;
	});

	onMount(() => {
		const shopify = JSON.parse(localStorage.getItem('shopify'));
		if (shopify) {
			if ((shopify.lines.length = 0)) {
				cartCount.set(0);
			} else {
				cartCount.set(shopify.lines.edges.length);
			}
		}
	});
</script>

<header>
	<a href="/">
		<img src="/RivasWebDesigns.svg" alt="" class="logo" />
	</a>
	<div class="flex">
		<a href="/cart" class="cart">
			<img
				class="icon"
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
	</div>
</header>

<style lang="scss">
	header {
		width: 100%;
		padding: 1em;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
		.flex {
			display: flex;
		}
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
				width: 1em;
				margin: 0;
			}

			.count {
				background-color: black;
				color: #fff;
				height: 1.5em;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0.5em;
				font-size: 0.6em;
				position: absolute;
				top: -0.3em;
				right: -0.3em;
				border-radius: 50%;
			}
		}
		.icon {
			width: 1em;
			margin-right: 0.5em;
		}
	}
</style>
