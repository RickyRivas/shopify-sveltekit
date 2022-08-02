<script>
	import Header from './../lib/layout/Header.svelte';
	import global from '../global.css';
</script>

<Header />
<main>
	<slot />
</main>

<style lang="scss">
	main {
		@media only screen and (min-width: 768px) {
			padding: 1em;
		}
	}
</style>
