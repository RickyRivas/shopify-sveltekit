<script>
	import Header from './../lib/layout/Header.svelte';
	import Footer from './../lib/layout/Footer.svelte';
	import global from '../global.css';
</script>

<Header />
<main>
	<slot />
</main>
<Footer />
