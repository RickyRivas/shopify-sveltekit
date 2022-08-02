<script>
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
		cart = JSON.parse(localStorage.getItem('cart'));
		if (cart) {
			cartItems = cart.lines.edges;
			subtotal = convertPrice(cart.estimatedCost.subtotalAmount.amount);
			total = convertPrice(cart.estimatedCost.totalAmount.amount);
			lineId = cart.id;
			// console.log(cart);
		}
	});

	const checkout = async () => {
		try {
			const checkoutCart = await fetch('/api/create-checkout', {
				method: 'POST',
				body: JSON.stringify({}),
				headers: { 'content-type': 'application/json' }
			})
				.then((res) => res.json())
				.then((data) => data);

			const url = checkoutCart.shopifyResponse.cartCreate.cart.checkoutUrl;
			const id = checkoutCart.shopifyResponse.cartCreate.cart.id;
			console.log(url, id);
		} catch (e) {
			console.log(e);
		}
	};
</script>

<section class="cart">
	<h1>Your Cart</h1>
	{#if cartItems.length > 0}
		{#each cartItems as item}
			<CartItem {item} />
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
	<button class="checkout-btn" on:click={checkout}>Checkout</button>
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
	}
</style>
