<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let item;
</script>

<div class="cart-item">
	<div class="img-container">
		<img src={item.node.merchandise.product.images.edges[0].node.src} alt="" height="100" />
	</div>
	<div class="body">
		<a class="title" href={'/products/' + item.node.merchandise.product.title}
			>{item.node.merchandise.product.title}</a
		>
		<p class="subtitle">{item.node.merchandise.title}</p>
		<p>{item.node.merchandise.priceV2.amount}</p>
		<p>QTY: x{item.node.quantity}</p>
		<!-- dispatching event and passing up data-->
		<button
			class="remove-btn"
			on:click={() => {
				dispatch('remove-item', item.node.id);
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
		.subtitle {
			color: rgba(0, 0, 0, 0.4);
			position: relative;
			left: 0.5em;
			&::before {
				content: '';
			}
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
