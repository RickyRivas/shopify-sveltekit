<script context="module">
	// import components
	import ProductsList from '../lib/components/ProductsList.svelte';
	// import store
	import { getProducts } from '../stores';
	// fetch data
	export async function load() {
		const data = await getProducts();
		// const productType = ctx.query.get('type');
		// if (productType) {
		// 	products.update((items) => {
		// 		const updated = items.filter((product) => product.node.productType === productType);
		// 		return updated;
		// 	});
		// }
		return {
			props: { data }
		};
	}
</script>

<script>
	export let data;
	let products = [];
	products = data.products.edges;
</script>

<!-- passing down products as a prop to child component -->
<ProductsList {products} />
