<script>
	// import components
	import ProductCard from './ProductCard.svelte';
	export let products;
</script>

<section class="products">
	{#each products as product}
		<ProductCard {product} />
	{/each}
</section>

<style>
	.products {
		width: 100%;
		max-width: 1000px;
		margin: auto;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		grid-gap: 1em;
		place-items: center;
		padding: 1em;
	}
</style>
