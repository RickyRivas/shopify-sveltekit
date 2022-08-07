<script context="module">
	// Importings
	import OptionToggler from '../../lib/components/OptionToggler.svelte';
	import QuantityWidget from '../../lib/components/QuantityWidget.svelte';
	import { getProductDetails, cartCount } from './../../stores.js';

	export async function load({ params }) {
		// getting the full product from shopify

		let handle = params.handle;
		const productDetails = await getProductDetails(handle);

		return {
			props: {
				productDetails
			}
		};
	}
</script>

<script>
	export let productDetails;
	let product = productDetails;
	let productImage = product.images.edges[0].node.src;
	let productVariants = product.variants.edges.map((v) => v.node);
	let selectedProduct = productVariants[0];
	let selectedPrice = product.priceRange.minVariantPrice.amount;
	let totalInStock = selectedProduct.quantityAvailable;
	let quantity = 1;

	// update product variant after user changes option
	const updateSelectedProduct = (id) => {
		const newlySelectedProduct = productVariants.find((p) => p.id === id);
		selectedProduct = newlySelectedProduct.id;
		selectedPrice = newlySelectedProduct.priceV2.amount;
		totalInStock = newlySelectedProduct.quantityAvailable;
		// reset after changing product
		quantity = 1;
	};

	// add to cart and update local storage object
	const addToCart = async () => {
		let shopify = JSON.parse(localStorage.getItem('shopify'));
		// console.log(shopify);
		try {
			const addToCartResponse = await fetch('../api/add-to-cart', {
				method: 'POST',
				body: JSON.stringify({
					cartId: shopify.cartId,
					// selectedProduct.id is the initial product & selectedProduct is the newlySelectedProduct
					itemId: selectedProduct.id || selectedProduct,
					quantity
				}),
				headers: { 'content-type': 'application/json' }
			});
			const data = await addToCartResponse.json();
			// update local storage object
			shopify.cartId = data.id;
			shopify.estimatedCost = data.estimatedCost.totalAmount.amount;
			shopify.checkoutUrl = data.checkoutUrl;
			shopify.lines = data.lines;
			// update cart counts
			cartCount.set(shopify.lines.edges.length);
			// setting new obj to LS
			localStorage.setItem('shopify', JSON.stringify(shopify));
		} catch (error) {
			// todo: error handling
			console.log(error);
		}
	};
	// Price formatting
	const convertPrice = (itemPrice) => {
		const amount = Number(itemPrice).toFixed(2);
		return amount + ' ' + 'USD';
	};
</script>

<div class="product">
	<div class="img-container">
		<img src={productImage} alt="" height="" />
	</div>
	<div class="body">
		<div class="head">
			<h2>{product.title}</h2>
			<p class="price">${convertPrice(selectedPrice)}</p>
		</div>
		<p class="desc">{product.description}</p>
		<div class="options">
			<OptionToggler
				{productVariants}
				on:update-item={(e) => {
					updateSelectedProduct(e.detail);
				}}
			/>
			<div class="options-qty-atc">
				<!-- binding child qty to parent qty -->
				<QuantityWidget bind:quantity bind:maxCount={totalInStock} />
				<button type="submit" on:click|preventDefault={addToCart} class="add-to-cart">
					<p>Add To Cart</p>
					<img
						class=""
						src="/shopping-cart.svg"
						alt=""
						width="25"
						height="25"
						loading="lazy"
						decoding="async"
					/>
				</button>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.product {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 1000px;
		margin: auto;
		@media only screen and (min-width: 768px) {
			flex-direction: row;
		}
		// Main product image(s)
		.img-container {
			width: 100%;
			background-color: #f1f1f1;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 1em;
			img {
				max-width: 100%;
				max-height: 300px;
			}
		}
		// Product details
		.body {
			padding: 1em;
			display: flex;
			flex-direction: column;
			.head {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 1em;
			}
			.desc {
				margin-bottom: 1em;
			}
			.options {
				.options-qty-atc {
					display: flex;
					flex-direction: column;
					margin-bottom: 1em;

					.add-to-cart {
						border: 0;
						padding: 1em;
						width: 100%;
						background-color: #000;
						color: white;
						display: flex;
						justify-content: space-between;
						align-items: center;
						text-transform: uppercase;
						img {
							filter: invert(1);
						}
						@media only screen and (min-width: 768px) {
							width: 10em;
						}
					}
				}
			}
		}
	}
</style>
