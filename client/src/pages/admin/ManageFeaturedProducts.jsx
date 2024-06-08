import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageFeaturedProducts = () => {
	const [products, setProducts] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [loading, setLoading] = useState(true);

	const BASE_URL = import.meta.env.VITE_BASE_URL;

	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = async () => {
		try {
			setLoading(true);
			const response = await axios.get(`${BASE_URL}/api/products`);
			setProducts(response.data);
			setLoading(false);
		} catch (error) {
			toast.error("Failed to fetch products");
			setLoading(false);
		}
	};

	const handleFeature = async (id, feature) => {
		try {
			await axios.get(
				`${BASE_URL}/api/products/${feature ? "feature" : "unfeature"}/${id}`
			);
			fetchProducts();
			toast.success(
				`Product ${feature ? "featured" : "unfeatured"} successfully`
			);
		} catch (error) {
			toast.error(
				`Failed to ${feature ? "feature" : "unfeature"} product`
			);
		}
	};

	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
	};

	const filteredProducts = products.filter((product) =>
		product.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">
				Manage Featured Products
			</h1>
			<input
				type="text"
				placeholder="Search products"
				value={searchTerm}
				onChange={handleSearch}
				className="p-2 border rounded mb-4 w-full"
			/>
			{loading ? (
				<p>Loading...</p>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{filteredProducts.map((product) => (
						<div
							key={product._id}
							className="border p-4 rounded shadow"
						>
							<h2 className="text-lg font-bold mb-2">
								{product.name}
							</h2>
							<p className="text-gray-700 mb-2">
								Vendor: {product.vendorName}
							</p>
							<button
								onClick={() =>
									handleFeature(
										product._id,
										!product.isFeatured
									)
								}
								className={`p-2 rounded text-white ${
									product.isFeatured
										? "bg-red-500"
										: "bg-green-500"
								}`}
							>
								{product.isFeatured ? "Unfeature" : "Feature"}
							</button>
						</div>
					))}
				</div>
			)}
			<ToastContainer />
		</div>
	);
};

export default ManageFeaturedProducts;
