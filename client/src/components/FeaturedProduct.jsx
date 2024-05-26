import { products } from "../data/products";
import "./Featured.css"

const FeaturedProducts = () => {
	console.log(products)
	return (
		<div className="featured-products-carousel">
			<div className="carousel-container">
				{products.map((product) => (
					<div key={product.id} className="carousel-item">
						<img className="w-36 h-auto" src={product.image} alt="" />
						<p>{product.name}</p>
					</div>
				))}
			</div>
			<button className="carousel-control carousel-control-prev">
				&#8592;
			</button>
			<button className="carousel-control carousel-control-next">
				&#8594;
			</button>
		</div>
	);
};

export default FeaturedProducts;
