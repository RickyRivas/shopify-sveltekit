<script context="module">
	// import components
	import ProductsList from '../../lib/components/ProductsList.svelte';
	import { getProducts } from '../../stores';

	export async function load() {
		// 1. fetch products
		const data = await getProducts();

		return {
			props: { data }
		};
	}
</script>

<script>
	export let data;
	let products = data.products.edges;
</script>

<!-- passing down products as a prop to child component -->
<ProductsList {products} />
