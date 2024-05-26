import { CiViewList } from "react-icons/ci";
import { FiHeart } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
//import { products } from "../data/products";
import { useEffect, useState } from "react";
import axios from "axios";

const CategoryItems = () => {
	const [products, setProducts] = useState([]);
	const params = useParams();
	const category = params.category;

	const BASE_URL = import.meta.env.VITE_BASE_URL;

	useEffect(() => {
		const getCategoryProducts = async () => {
			const response = await axios.get(
				`${BASE_URL}/api/products/category/${category}`
			);
			if (response.status === 200) {
				setProducts(response.data);
				console.log("Category response: ", response);
			} else {
				console.log("Category response: ", response);
			}
		};

		getCategoryProducts();
	}, []);

	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex-grow">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<h1 className="text-3xl font-bold text-gray-800 mb-4">
						Shop
					</h1>
					{products.length === 0 && (
						<div className="text-2xl">
							No items found under this category{" "}
						</div>
					)}
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{products.map((product) => (
							<Link
								to={`/product/${product._id}`}
								key={product._id}
								className="bg-white rounded-lg overflow-hidden shadow-md"
							>
								<img
									src={product.imageUrls[0]}
									alt={product.name}
									className="w-full h-44 pt-2 object-contain object-center"
								/>
								<div className="p-4">
									<h2 className="text-xl font-semibold text-gray-800">
										{product.name}
									</h2>
									<p className="text-gray-600 mt-2">
										₵{product.price}
									</p>
									<div className="flex items-center mt-6 space-x-4">
										<button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
											<CiViewList className="mr-2" />{" "}
											Details
										</button>
										<button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center">
											<FiHeart className="mr-2" />{" "}
											Favourite
										</button>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			</main>
		</div>
	);
};

export default CategoryItems;
