<script>
	export let product;
</script>

<div class="product">
	<div class="price">
		<p>${product.node.priceRange.maxVariantPrice.amount}</p>
	</div>
	<div class="img-container">
		<img src={product.node.images.edges[0].node.src} alt="" height="" width="" />
	</div>
	<div class="body">
		<div class="details">
			<h3>
				{product.node.handle}
			</h3>
			<p class="desc">{product.node.description.substring(0, 80) + '...'}</p>
		</div>
		<div class="btns">
			<a class="view-btn" href={'products/' + product.node.handle}>View Item</a>
		</div>
	</div>
</div>

<style lang="scss">
	.product {
		display: flex;
		flex-direction: column;
		box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
		width: 100%;
		padding: 1em;
		max-width: 300px;
		position: relative;
		background-color: white;

		// Product img
		.img-container {
			width: 100%;
			padding: 1.8em;
			background-color: #f1f1f1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 10em;
			img {
				height: 100%;
			}
		}

		// Product Details
		.body {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			flex-direction: column;
			padding-top: 0.5em;

			// Title, desc
			.details {
				margin-bottom: 0.5em;
				h3 {
					text-transform: capitalize;
					margin-bottom: 0.2em;
				}
				p {
					color: #000;
					font-size: 0.8em;
				}
			}
			.btns {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				font-size: 0.7em;
				height: 2.5em;
				a.view-btn {
					width: 100%;
					height: 100%;
					color: #000;
					text-decoration: none;
					background-color: #212529;
					color: #fff;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}
		// Price
		.price {
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			top: 0;
			right: 0;
			background-color: #212529;
			// width: 3em;
			height: 3em;
			padding: 1em;
			font-size: 0.7em;
			color: #fff;
		}
	}
</style>
