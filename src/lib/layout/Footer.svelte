<script>
	import CardIcons from './../components/CardIcons.svelte';
</script>

<footer>
	<div class="container">
		<div class="logo-contain col">
			<img src="/RivasWebDesigns.svg" alt="Rivas Web Designs Logo" width="300" height="109" />
		</div>
		<div class="col">
			<h3>Help</h3>
			<ul>
				<li><a href="/">Contact Us</a></li>
				<li><a href="/">Support</a></li>
				<li><a href="/">Delivery</a></li>
				<li><a href="/">Returns</a></li>
			</ul>
		</div>
		<div class="col">
			<h3>Explore</h3>
			<ul>
				<li>Latest Tech</li>
				<li>View Cart</li>
				<li>Warranty</li>
				<li>New Releases</li>
			</ul>
		</div>
		<div class="contact col">
			<CardIcons />
		</div>
	</div>
</footer>
<div class="credit">
	<p>&#169; Rivas Web Designs 2022 | All Rights Reserved.</p>
</div>

<!-- Footer -->
<style lang="scss">
	@media (min-width: 0em) {
		footer {
			width: 100%;
			padding: 1em;
			background-color: #212529;
			z-index: 20;
			position: relative;
			.container {
				width: 100%;
				max-width: 1200px;
				margin: auto;
				display: grid;
				grid-template-areas:
					'logo logo'
					'two three'
					'contact contact';
				// grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
				grid-gap: 1rem;
				.col {
					display: flex;
					flex-direction: column;
					justify-content: center;
					padding: 1rem 0;
					h3 {
						margin-bottom: 1rem;
						// white-space: nowrap;
						color: white;
					}
					ul {
						list-style: none;
						li {
							margin-bottom: 0.5rem;
							a {
								text-decoration: none;
								color: white;
								overflow: auto;
								&:hover,
								&:active {
									color: white;
									text-decoration: 1px underline white;
								}
							}
							color: white;
						}
					}
				}
				.col:nth-child(2) {
					grid-area: two;
					padding: 1rem;
					justify-content: flex-start;
				}
				.col:nth-child(3) {
					grid-area: three;
					padding: 1rem;
					justify-content: flex-start;
				}
				.logo-contain {
					grid-area: logo;
					padding: 1rem;
					display: flex;
					justify-content: center;
					align-items: flex-start;
					img {
						width: 80%;
						max-width: 500px;
						height: 100%;
						filter: invert(1);
					}
				}
				.contact {
					grid-area: contact;
				}
			}
		}
		.credit {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 1rem 0;
			color: #fff;
			z-index: 20;
			position: relative;
			text-align: center;
			background-color: #212529;
			text-transform: uppercase;
			font-size: 0.75em;
		}
	}
	@media (min-width: 1024px) {
		footer {
			.container {
				width: 100%;
				max-width: 55em;
				grid-template-areas: 'logo two three contact';
				.logo-contain {
					padding: 0;
					height: 100%;
					justify-content: flex-start;
					align-items: flex-start;
					img {
						width: 200px;
						height: unset;
					}
				}

				.col {
					justify-content: flex-start;
					padding-top: 0rem !important;
				}
			}
		}
	}
	@media (min-width: 1200px) {
		footer {
			.container {
				.logo-contain {
					img {
						width: 250px;
						height: unset;
					}
				}

				.col {
					padding-top: 0rem !important;
				}
			}
		}
	}
</style>
