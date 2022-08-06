<script>
	import { cartCount } from './../stores.js';
	import { onMount } from 'svelte';
	import CartItem from '../lib/components/CartItem.svelte';

	let cart = '';
	let cartItems = [];
	let subtotal;
	let total;
	let lineId;

	// Price formatting
	const convertPrice = (itemPrice) => {
		const amount = Number(itemPrice).toFixed(2);
		return amount + ' ' + 'USD';
	};

	onMount(() => {
		// get cart details from localStorage
		cart = JSON.parse(localStorage.getItem('shopify'));

		if (cart) {
			cartItems = cart.lines.edges;
			total = convertPrice(cart.estimatedCost);
			lineId = cart.id;
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
	<h1>Your Cart</h1>
	{#if cartItems.length > 0}
		{#each cartItems as item}
			<CartItem {item} on:remove-item={(e) => removeItem(e.detail)} />
		{/each}
	{:else}
		<section>
			<p class="">Your cart is empty, fill it up!</p>
			<a href="/" class=""> Back to Products </a>
		</section>
	{/if}
</section>
<section class="cart-details">
	<p>subTotal: {subtotal}</p>
	<p>Total: {total}</p>
	<button class="checkout-btn" on:click={checkout} disabled={cartItems.length < 1 ? 'true' : ''}
		>Checkout</button
	>
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
	}

	.checkout-btn {
		width: 10em;
		padding: 0.5em 0;
		color: #000;
		text-decoration: none;
		background-color: #212529;
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 0;
		&:disabled {
			opacity: 0.8;
		}
	}
</style>
