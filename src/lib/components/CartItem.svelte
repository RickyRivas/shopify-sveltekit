<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let item;
	console.log(item);
</script>

<div class="cart-item">
	<div class="img-container">
		<img src={item.node.merchandise.product.images.edges[0].node.src} alt="" height="100" />
	</div>
	<div class="body">
		<div>
			<a class="title" href={'/products/' + item.node.merchandise.product.handle}
				>{item.node.merchandise.product.title}</a
			>
			<p class="subtitle">OPTION: {item.node.merchandise.title}</p>
		</div>
		<div class="flex">
			<p>${item.node.merchandise.priceV2.amount} ea.</p>
			<p class="qty">x {item.node.quantity}</p>
		</div>
	</div>
	<!-- dispatching event and passing up data-->
	<button
		class="remove-btn"
		on:click={() => {
			dispatch('remove-item', item.node.id);
		}}
		><img
			class=""
			src="/close.svg"
			alt=""
			width="25"
			height="25"
			loading="lazy"
			decoding="async"
		/></button
	>
</div>

<style lang="scss">
	.cart-item {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		width: 100%;
		padding: 0.5em;
		box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
		margin-bottom: 1em;
		position: relative;

		.body {
			padding: 0 1em;
			display: flex;
			justify-content: space-between;
			flex-direction: column;
			height: 100%;
			align-items: flex-start;
		}
		.flex {
			display: flex;
			width: 100%;

			p:nth-child(1) {
				margin-right: 1em;
			}
		}
		.title {
			color: black;
			text-transform: uppercase;
			text-decoration: none;
		}
		.subtitle {
			color: rgba(0, 0, 0, 0.4);
			position: relative;
			left: 0.5em;
			font-size: 0.75em;
			margin-bottom: 0.5em;
			&::before {
				content: '';
			}
		}
		.qty {
			font-size: 0.9sem;
		}
		.img-container {
			display: flex;
			justify-content: center;
			align-items: center;
			img {
				height: 5em;
				max-width: 100%;
			}
		}
		.remove-btn {
			border: 0;
			background: transparent;
			position: absolute;
			right: 0.5em;
			top: 0.5em;

			img {
				width: 1.5em;
			}
		}
	}
</style>
