<script>
	export let item;

	const removeItem = async (lineId) => {
		try {
			const removeItemFromCart = await fetch('/api/remove-from-cart', {
				method: 'POST',
				body: JSON.stringify({
					cartId: localStorage.getItem('cartId'),
					lineId
				}),
				headers: { 'content-type': 'application/json' }
			})
				.then((res) => res.json())
				.then((data) => data);
			// update localStorage;
			localStorage.setItem('cartId', removeItemFromCart.id);
			localStorage.setItem('cart', JSON.stringify(removeItemFromCart));
			location.reload();
		} catch (e) {
			console.log(e, 'errrr');
		}
	};
</script>

<div class="cart-item">
	<div class="img-container">
		<img src={item.node.merchandise.product.images.edges[0].node.src} alt="" height="100" />
	</div>
	<div class="body">
		<a class="title" href={'/products/' + item.node.merchandise.product.title}
			>{item.node.merchandise.product.title}</a
		>
		<p>{item.node.merchandise.priceV2.amount}</p>
		<p>QTY: x{item.node.quantity}</p>
		<button
			class="remove-btn"
			on:click={() => {
				removeItem(item.node.id);
			}}>Remove</button
		>
	</div>
</div>

<style lang="scss">
	.cart-item {
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding: 1em;
		box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
		margin-bottom: 1em;
		.title {
			color: black;
			text-transform: uppercase;
			text-decoration: none;
		}
		.img-container {
			img {
				width: 100%;
				height: 100%;
				max-height: 5em;
				max-width: 8em;
			}
		}
		.remove-btn {
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
	}
</style>
