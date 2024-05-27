import axios from "axios";
import { useEffect, useState } from "react";
import { CiViewList } from "react-icons/ci";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Favourites = () => {
	const [favorites, setFavorites] = useState([])

	const BASE_URL = import.meta.env.VITE_BASE_URL
	const { currentUser } = useSelector((state) => state.user);
	const products = [
		{
			id: 1,
			name: "Product 1",
			price: "$99.99",
			image: "https://via.placeholder.com/150",
		},
		{
			id: 2,
			name: "Product 2",
			price: "$149.99",
			image: "https://via.placeholder.com/150",
		},
		{
			id: 3,
			name: "Product 3",
			price: "$199.99",
			image: "https://via.placeholder.com/150",
		},
		{
			id: 4,
			name: "Product 4",
			price: "$249.99",
			image: "https://via.placeholder.com/150",
		},	];

	useEffect(() => {
		const getFavoriteProducts = async () => {
			const response = await axios.get(
				`${BASE_URL}/api/products/favorites/${currentUser?._id}`,
				{
					headers: {
						Authorization: `Bearer ${currentUser?.accessToken}`,
					},
				}
			);
			console.log("Favorite response: ", response);
			if (response.status === 200) {
				setFavorites(response.data);
				
			} else {
				console.log("Favorite response: ", response);
			}
		};

		getFavoriteProducts();
	}, []);

	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex-grow">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<h1 className="text-3xl font-bold text-gray-800 mb-4">
						My Favourites
					</h1>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{favorites.map((product) => (
							<Link
								to={`/product/${product.id}`}
								key={product._id}
								className="bg-white rounded-lg overflow-hidden shadow-md"
							>
								<img
									src={product.imageUrls[0]}
									alt={product.name}
									className="w-full h-56 object-contain object-center"
								/>
								<div className="p-4">
									<h2 className="text-xl font-semibold text-gray-800">
										{product.name}
									</h2>
									<p className="text-gray-600 mt-2">
										{product.price}
									</p>
									<div className="flex items-center mt-6 space-x-4">
										<Link to={`/product/${product._id}`} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
											<CiViewList className="mr-2" />{" "}
											Details
										</Link>
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

export default Favourites;
