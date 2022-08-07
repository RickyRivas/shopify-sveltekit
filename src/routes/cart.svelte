<script>
	import { cartCount } from './../stores.js';
	import { onMount } from 'svelte';
	import CartItem from '../lib/components/CartItem.svelte';

	let shopify = '';
	let cartItems = [];
	let subtotal;
	let lineId;

	// Price formatting
	const convertPrice = (itemPrice) => {
		const amount = Number(itemPrice).toFixed(2);
		return amount + ' ' + 'USD';
	};

	onMount(() => {
		// get cart details from localStorage
		shopify = JSON.parse(localStorage.getItem('shopify'));

		const setTotalAndLine = () => {
			subtotal = convertPrice(shopify.estimatedCost);
			lineId = shopify.id;
		};

		if (shopify) {
			if (shopify.lines == 0) {
				cartItems = shopify.lines;
				setTotalAndLine();
			} else if (shopify.lines.edges == 0) {
				cartItems = shopify.lines.edges;
				setTotalAndLine();
			} else {
				cartItems = shopify.lines.edges;
				setTotalAndLine();
			}
		} else {
			console.log('no shop obj');
			return;
		}
	});

	const removeItem = async (lineId) => {
		let shopify = JSON.parse(localStorage.getItem('shopify'));
		try {
			const removeItemFromCartResponse = await fetch('/api/remove-from-cart', {
				method: 'POST',
				body: JSON.stringify({
					cartId: JSON.parse(localStorage.getItem('shopify')).cartId,
					lineId
				}),
				headers: { 'content-type': 'application/json' }
			});

			const data = await removeItemFromCartResponse.json();

			// update local storage object
			shopify.cartId = data.id;
			shopify.estimatedCost = data.estimatedCost.totalAmount.amount;
			shopify.checkoutUrl = data.checkoutUrl;
			shopify.lines = data.lines;
			// setting new obj to LS
			localStorage.setItem('shopify', JSON.stringify(shopify));
			// update cart counts
			cartCount.set(shopify.lines.edges.length);
			// dom
			cartItems = shopify.lines.edges;
			subtotal = shopify.estimatedCost;
		} catch (e) {
			console.log(e, 'errrr');
		}
	};

	const checkout = () => {
		const checkoutUrl = JSON.parse(localStorage.getItem('shopify')).checkoutUrl;
		window.location = checkoutUrl;
	};
</script>

<section class="cart">
	<h1>Your Cart:</h1>
	{#if cartItems.length > 0}
		{#each cartItems as item}
			<CartItem {item} on:remove-item={(e) => removeItem(e.detail)} />
		{/each}
	{:else}
		<section class="empty-msg">
			<p class="">Your cart is empty, fill it up!</p>
			<a href="/products" class="back">Back to Products</a>
		</section>
	{/if}
</section>
<section class="cart-details">
	<div class="subtotal">
		<p>subTotal:</p>
		<p>${subtotal}</p>
	</div>
	<div class="total">
		<p>Taxes and Shipping calculated at Checkout.</p>
	</div>
	<button class="checkout-btn" on:click={checkout} disabled={cartItems.length < 1 ? 'true' : ''}>
		<p>Secure Checkout</p>
		<img class="" src="/lock.svg" alt="" width="25" height="25" loading="lazy" decoding="async" />
	</button>
</section>

<style lang="scss">
	h1 {
		margin-bottom: 1em;
	}
	.cart {
		width: 100%;
		max-width: 1200px;
		margin: auto;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		padding: 1em;
	}
	.cart-details {
		width: 100%;
		max-width: 1200px;
		padding: 1em;
		margin: auto;
	}
	.empty-msg {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		max-width: 1200px;
		margin: auto;
		flex-direction: column;
		p {
			margin-bottom: 0.5em;
		}
		.back {
			width: 10em;
			background-color: #000;
			color: white;
			text-decoration: none;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0.5em 1em;
		}
	}
	.subtotal {
		display: flex;
		padding: 0.5em 0;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		text-transform: uppercase;
	}
	.total {
		padding: 0.5em 0;
		text-align: center;
	}
	.checkout-btn {
		width: 100%;
		padding: 1em;
		color: #000;
		text-decoration: none;
		background-color: #212529;
		color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border: 0;
		text-transform: uppercase;
		img {
			filter: invert(1);
		}
		&:disabled {
			opacity: 0.8;
		}
	}
</style>
