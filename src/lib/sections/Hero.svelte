<section class="hero">
	<div class="content">
		<h1>NO.1 Electronics Vendor in Tulsa, OK</h1>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, nihil! Lorem ipsum dolor sit
			amet.
		</p>
		<a href="/products" class="btn">Shop Now</a>
	</div>
</section>

<style lang="scss">
	.hero {
		background: url(/hero.jpg) center / cover no-repeat;
		height: 80vh;
		width: 100%;
		position: relative;
		&::before {
			content: '';
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			background-color: rgba(0, 0, 0, 0.3);
		}
		.content {
			position: absolute;
			top: 35%;
			left: 50%;
			width: 100%;
			transform: translate(-50%, -50%);
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			color: white;
			text-align: center;
			padding: 0 1em;
			h1 {
				color: white;
				text-align: center;
				margin-bottom: 0.5em;
				text-transform: uppercase;
				background: -webkit-linear-gradient(260deg, #373b44, #4286f4);
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
				letter-spacing: 1px;
			}
			p {
				color: #f2f2f2;
				margin-bottom: 1em;
			}
			.btn {
				width: 10em;
				height: 3em;
				background-color: #fff;
				text-decoration: none;
				color: #000;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 0.5em;
			}
		}
	}
</style>
