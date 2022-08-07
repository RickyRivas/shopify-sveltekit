<script context="module">
	import Header from './../lib/layout/Header.svelte';
	import Footer from './../lib/layout/Footer.svelte';
	import global from '../global.css';
	// cart
	import { onMount } from 'svelte';
	import { getProducts, cartCount } from '../stores';

	export async function load() {
		// 1. fetch products
		const data = await getProducts();

		return {
			props: { data }
		};
	}
</script>

<script>
	// export let data;
	// let products = data.products.edges;

	// 2. Check for cart in L.S. if not, create and store new shopify object
	onMount(() => {
		const shopifyObject = JSON.parse(localStorage.getItem('shopify'));

		if (!shopifyObject) {
			const createCart = async () => {
				try {
					const data = await fetch('../api/util/create-new-cart', {
						method: 'POST',
						headers: {
							'content-type': 'application/json'
						},
						body: JSON.stringify({})
					});
					const response = await data.json();
					const shopifyObject = {
						cartId: response.shopifyResponse.cartCreate.cart.id,
						checkoutUrl: response.shopifyResponse.cartCreate.cart.checkoutUrl,
						estimatedCost: null,
						lines: []
					};
					cartCount.set(shopifyObject.lines.length || 0);
					localStorage.setItem('shopify', JSON.stringify(shopifyObject));
					console.log('created new cart');
				} catch (e) {
					console.log(e);
				}
			};
			createCart();
		} else {
			// get cart items length
			if (shopifyObject.lines.length >= 1) {
				cartCount.set(shopify.lines.edges.length);
			}
		}
	});
</script>

<Header />
<main>
	<slot />
</main>
<Footer />
