<footer>
	<div class="container">
		<div class="logo-contain col">
			<img src="/RivasWebDesigns.svg" alt="Rivas Web Designs Logo" width="300" height="109" />
		</div>
		<div class="col">
			<h3>Site Navigation</h3>
			<ul>
				<li><a href="/">Link</a></li>
				<li><a href="/">Link</a></li>
				<li><a href="/">Link</a></li>
				<li><a href="/">Link</a></li>
				<li><a href="/">Link</a></li>
			</ul>
		</div>
		<div class="col">
			<h3>Our Services</h3>
			<ul>
				<li>link</li>
				<li>link</li>
				<li>link</li>
				<li>link</li>
				<li>link</li>
			</ul>
		</div>
		<div class="contact col">
			<h3>Contact Us</h3>
			<ul>
				<li>
					<div>
						<img src="/pointed-star.svg" alt="icon" />
					</div>
					<a href="tel:918-288-0028">918-288-0028</a>
				</li>
				<li>
					<div>
						<img src="/pointed-star.svg" alt="icon" />
					</div>
					<a
						href="mailto:	
            info@rivaswebdesigns.com"
					>
						info@rivaswebdesigns.com</a
					>
				</li>
				<li>
					<div>
						<img src="/pointed-star.svg" alt="icon" />
					</div>
					<p>Mon - Fri | 9am - 5pm CST</p>
				</li>
			</ul>
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
			padding: 2em;
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
					background-color: white;
					border-radius: 1rem;
					padding: 1rem;
					h3 {
						color: #212529;
					}
					ul {
						li {
							display: flex;
							justify-content: flex-start;
							align-items: center;
							& > div {
								width: 2rem;
								height: 2rem;
								background-color: #f2f2f2;
								border-radius: 50%;
								margin-right: 0.5rem;
								display: flex;
								justify-content: center;
								align-items: center;
								img {
									width: 1rem;
									height: 1rem;
								}
							}
							p {
								color: #212529;
							}
							a {
								color: #212529;
								text-decoration: none;
								&:hover,
								&:active {
									color: #000;
								}
							}
						}
					}
				}
			}
		}
		.credit {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 1rem 0;
			background-color: white;
			color: #212529;
			z-index: 20;
			position: relative;
			text-align: center;
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
