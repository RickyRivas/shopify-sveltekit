<script>
	import { onMount } from 'svelte';
	import { cartCount } from '../../stores';

	let count;
	let showSearchBar = false;

	cartCount.subscribe((data) => {
		count = data;
	});

	onMount(() => {
		const shopify = JSON.parse(localStorage.getItem('shopify'));
		if (shopify) {
			cartCount.set(shopify.lines.edges.length);
		}
	});
</script>

<div class="search">
	<form action="" class={showSearchBar ? 'show' : ''} on:submit|preventDefault={() => {}}>
		<div class="location">
			<img src="/search.svg" alt="" width="25" height="25" />
		</div>
		<input
			type="search"
			placeholder="Search..."
			on:blur={() => {
				showSearchBar = !showSearchBar;
			}}
		/>
		<button>Search</button>
	</form>
</div>

<header>
	<a href="/">
		<img src="/RivasWebDesigns.svg" alt="" class="logo" />
	</a>
	<div class="flex">
		<img
			on:click={() => {
				showSearchBar = !showSearchBar;
			}}
			src="/search.svg"
			class="icon"
			alt=""
			width="40"
		/>
		<a href="/cart" class="cart">
			<img
				class="icon"
				src="/shopping-bag.svg"
				alt=""
				width="40"
				height="34"
				loading="lazy"
				decoding="async"
			/>
			<div class="count">
				{count}
			</div>
		</a>
	</div>
</header>

<style lang="scss">
	header {
		width: 100%;
		padding: 1em;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
		.flex {
			display: flex;
		}
		.logo {
			width: 5em;
		}
		.cart {
			width: 1.5em;
			height: 1.5em;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;

			img {
				width: 1em;
				margin: 0;
			}

			.count {
				background-color: black;
				color: #fff;
				height: 1.5em;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0.5em;
				font-size: 0.6em;
				position: absolute;
				top: -0.3em;
				right: -0.3em;
				border-radius: 50%;
			}
		}
		.icon {
			width: 1em;
			margin-right: 0.5em;
		}
	}
	/* search bar */
	div.search {
	}
	form {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		position: relative;
		z-index: 2;
		height: 0em;
		width: 100%;
		box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
		background: white;
		overflow: hidden;
		transition: all 0.5s;
		&.show {
			height: 3em;
		}
	}
	form .location {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0em 0.5em;
		position: relative;
		border-radius: 1em 0 0 1em;
	}

	form .location img {
		width: 0.8em;
		height: 0.8em;
	}
	/* search bar */
	input[type='search'] {
		border: 0;
		height: 100%;
		width: 100%;
		outline: none;
		background: white;
		border-radius: 0;
		border: 0;
		height: 100%;
		width: 100%;
	}
	input[type='search']::placeholder {
		color: #222;
		font-size: 1em;
	}

	button {
		border: 0;
		height: 100%;
		cursor: pointer;
		border-radius: 0;
		background: black;
		color: white;
		padding: 0 0.5em 0 0.5em;
		transition: all 0.5s;
	}
	button:hover {
		opacity: 0.9;
	}

	input[type='search']::-webkit-search-decoration,
	input[type='search']::-webkit-search-cancel-button,
	input[type='search']::-webkit-search-results-button,
	input[type='search']::-webkit-search-results-decoration {
		-webkit-appearance: none;
	}
</style>
