import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../../components/Spinner";
import { useSelector } from "react-redux";

const ManageProducts = () => {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isDeleteLoading, setIsDeleteLoading] = useState(false);
	const BASE_URL = import.meta.env.VITE_BASE_URL;
	const {currentUser} = useSelector((state) => state.user)

	useEffect(() => {
		const fetchProducts = async () => {
			setIsLoading(true);
			try {
				const response = await axios.get(`${BASE_URL}/api/products`);
				setProducts(response.data);
			} catch (error) {
				toast.error("Error fetching products");
			} finally {
				setIsLoading(false);
			}
		};

		fetchProducts();
	}, []);

	const handleDeleteProduct = async (id) => {
		setIsDeleteLoading(true);
		try {
			await axios.get(`${BASE_URL}/api/products/delete/${id}`, {
				headers: {
					Authorization: `Bearer ${currentUser?.accessToken}`,
				},
			});
			setProducts(products.filter((product) => product._id !== id));
			toast.success("Product deleted successfully");
		} catch (error) {
			toast.error("Error deleting product");
		} finally {
			setIsDeleteLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 p-8">
			<h1 className="text-4xl font-bold mb-10">Manage Products</h1>
			<ToastContainer />
			{isLoading ? (
				<Spinner />
			) : (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-1 gap-y-2 sm:gap-x-4 sm-gap-y-4">
					{products.map((product) => (
						<div
							key={product._id}
							className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
						>
							<Link
								to={`/product/${product._id}`}
								key={product._id}
							>
								<div className="flex items-center justify-center">
									<p className="relative mx-0 sm:mx-0 mt-3 flex h-36 sm:h-40 overflow-hidden rounded-xl">
										<img
											className="object-cover"
											src={product.imageUrls[0]}
											alt="product image"
										/>
									</p>
								</div>
								<div className="mt-4 px-2 sm:px-4">
									<h5 className="text-lg sm:text-xl tracking-tight text-slate-900 line-clamp-1">
										{product.name}
									</h5>
									<div className="mt-0 sm:mt-2 mb-1 sm:mb-5 flex items-center justify-between">
										<p>
											<span className="text-md sm:text-xl lg:text-2xl font-bold text-slate-900">
												₵
												{(
													product.price -
													product.discount
												).toFixed(2)}
											</span>
											<span className="text-xs sm:text-sm text-slate-900 line-through">
												₵{product.price.toFixed(2)}
											</span>
										</p>
									</div>
								</div>
							</Link>
							<div className="p-2 flex gap-1">
								{/* <button className="basis-1/2 w-full flex items-center justify-center gap-2 rounded-md bg-blue-900 px-2 sm:px-5 py-2 text-center text-xs sm:text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300">
									Edit
								</button> */}
								{isDeleteLoading ? (
									<Spinner />
								) : (
									<button
										onClick={() => {
											handleDeleteProduct(product._id);
										}}
										className="w-full flex items-center justify-center gap-2 rounded-md bg-red-600 px-2 sm:px-5 py-2 text-center text-xs sm:text-sm font-medium text-white hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
									>
										Delete
									</button>
								)}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default ManageProducts;
