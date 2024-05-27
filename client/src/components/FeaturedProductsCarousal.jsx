import { useState, useEffect } from "react";
//import { products } from "../data/products";
import { Link } from "react-router-dom";
import axios from "axios";

const FeaturedProductsCarousel = () => {
	const [products, setProducts] = useState([]);

	const BASE_URL = import.meta.env.VITE_BASE_URL;

	useEffect(() => {
		const getFeaturedProducts = async () => {
			const response = await axios.get(
				`${BASE_URL}/api/products/featured`
			);
			if (response.status === 200) {
				setProducts(response.data);
				console.log("Featured response: ", response);
			} else {
				console.log("Featured response: ", response);
			}
		};

		getFeaturedProducts();
	}, []);

	return (
		<div className="relative w-full max-w-7xl mx-auto py-16">
			<h1 className="text-3xl font-bold ml-3">Featured Products</h1>
			<div className="overflow-x-auto scrollbar-hide">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
					{products.map((product, index) => (
						<Link
							to={`/product/${product._id}`}
							key={index}
							className="w-full px-5 py-3"
						>
							<div className="bg-white p-6 rounded-lg shadow-md">
								<img
									src={product.imageUrls[0]}
									alt={product.name}
									className="w-full h-52 object-contain mb-4"
								/>
								<h2 className="text-lg font-semibold line-clamp-1">
									{product.name}
								</h2>
								<p className="text-gray-600">
									₵{product.price}
								</p>
							</div>
						</Link>
					))}
				</div>
			</div>
			<Link to="/shop" className="ml-5 mt-3 flex flex-row items-center justify-center w-64 px-2 py-3 mb-4 text-sm font-bold bg-blue-600 leading-6 duration-100 transform rounded-sm shadow cursor-pointer focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none hover:shadow-lg hover:-translate-y-1 text-white">
				<h1 className="text-xl font-bold">See more products</h1>
				<span className="ml-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						data-name="Layer 1"
						viewBox="0 0 24 24"
						className="w-5 h-5 fill-current"
					>
						<path
							fill="currentColor"
							d="M17.92,11.62a1,1,0,0,0-.21-.33l-5-5a1,1,0,0,0-1.42,1.42L14.59,11H7a1,1,0,0,0,0,2h7.59l-3.3,3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l5-5a1,1,0,0,0,.21-.33A1,1,0,0,0,17.92,11.62Z"
						></path>
					</svg>
				</span>
			</Link>
		</div>
	);
};

export default FeaturedProductsCarousel;
