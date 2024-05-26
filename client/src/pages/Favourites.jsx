import { CiViewList } from "react-icons/ci";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";

const Favourites = () => {
	// Dummy data for products
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
		},
		// Add more dummy products as needed
	];

	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex-grow">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<h1 className="text-3xl font-bold text-gray-800 mb-4">
						My Favourites
					</h1>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{products.map((product) => (
							<Link
								to={`/product/${product.id}`}
								key={product.id}
								className="bg-white rounded-lg overflow-hidden shadow-md"
							>
								<img
									src={product.image}
									alt={product.name}
									className="w-full h-56 object-cover object-center"
								/>
								<div className="p-4">
									<h2 className="text-xl font-semibold text-gray-800">
										{product.name}
									</h2>
									<p className="text-gray-600 mt-2">
										{product.price}
									</p>
									<div className="flex items-center mt-6 space-x-4">
										<button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
											<CiViewList className="mr-2" />{" "}
											Details
										</button>
										<button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center">
											<FiHeart className="mr-2" />{" "}
											Unfavourite
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

export default Favourites;
