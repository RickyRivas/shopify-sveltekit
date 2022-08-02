<script context="module">
	// Importing
	import QuantityWidget from '../../lib/components/QuantityWidget.svelte';
	import { getProductDetails } from './../../stores.js';

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

	const addToCart = async () => {
		//
		try {
			const addToCartResponse = await fetch('../api/add-to-cart', {
				method: 'POST',
				body: JSON.stringify({
					cartId: localStorage.getItem('cartId'),
					// selectedProduct.id is the initial product & selectedProduct is the newlySelectedProduct
					itemId: selectedProduct.id || selectedProduct,
					quantity
				}),
				headers: { 'content-type': 'application/json' }
			});

			const data = await addToCartResponse.json();

			// save new cart data to localstorage
			localStorage.setItem('cartId', data.id);
			localStorage.setItem('cart', JSON.stringify(data));
			// reload helps update the cart count in header
			location.reload();
		} catch (error) {
			// todo: handle error handling
			console.log(error);
		}
	};
	// update product variant after user changes option
	const updateSelectedProduct = (id) => {
		const newlySelectedProduct = productVariants.find((p) => p.id === id);
		console.log(newlySelectedProduct);
		selectedProduct = newlySelectedProduct.id;
		selectedPrice = newlySelectedProduct.priceV2.amount;
		totalInStock = newlySelectedProduct.quantityAvailable;
		// reset after changing product
		quantity = 1;
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
		<h2>{product.title}</h2>
		<p class="desc">{product.description}</p>
		<p class="price">${convertPrice(selectedPrice)}</p>
		<div class="options">
			<div class="options-variants">
				<!-- object destructuring shorthand -->
				{#each productVariants as { id, quantityAvailable, title, priceV2 }}
					<div>
						<input
							{id}
							checked={id === selectedProduct.id}
							bind:value={selectedProduct}
							type="radio"
							name="merchandiseId"
							disabled={quantityAvailable === 0}
							on:input={() => {
								updateSelectedProduct(id);
							}}
						/>
						<label for={id}>
							{title}
						</label>
					</div>
				{/each}
			</div>
			<div class="options-qty-atc">
				<!-- binding child qty to parent qty -->
				<QuantityWidget bind:quantity bind:maxCount={totalInStock} />
				<button type="submit" on:click|preventDefault={addToCart} class="add-to-cart">
					Add to Cart
				</button>
			</div>
		</div>
		<a href="/" class="back-btn">back</a>
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
			h2 {
				margin-bottom: 0.2em;
			}
			.desc {
				margin-bottom: 1em;
			}
			.price {
				font-size: 1.1em;
			}
			.options {
				.options-variants {
					display: flex;
					margin-bottom: 0.5em;
					& > div {
						margin-right: 0.5em;
					}
				}
				.options-qty-atc {
					display: flex;
					flex-direction: column;
					margin-bottom: 1em;

					.add-to-cart {
						border: 0;
						padding: 0.5em;
						width: 100%;
						background-color: #000;
						color: white;
						@media only screen and (min-width: 768px) {
							width: 10em;
						}
					}
				}
			}
		}
		// back
		.back-btn {
			background-color: #000;
			color: white;
			text-decoration: none;
			padding: 0.5em 0em;
			width: 5em;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
