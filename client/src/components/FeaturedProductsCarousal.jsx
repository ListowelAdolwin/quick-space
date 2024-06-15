import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { CiViewList } from "react-icons/ci";
import { MdOutlinePerson3 } from "react-icons/md";
import { useSelector } from "react-redux";

const FeaturedProducts = () => {
	const [products, setProducts] = useState([]);
	const [pageLoading, setPageLoading] = useState(true);

	const BASE_URL = import.meta.env.VITE_BASE_URL;
	const { currentSchool } = useSelector((state) => state.user);

	useEffect(() => {
		const getFeaturedProducts = async () => {
			setPageLoading(true);
			try {
				const response = await axios.get(
					`${BASE_URL}/api/products/featured?school=${currentSchool}`
				);
				if (response.status === 200) {
					setProducts(response.data);
					setPageLoading(false);
				} else {
					console.error(
						"Failed to fetch featured products:",
						response
					);
				}
			} catch (error) {
				console.error("Error fetching featured products:", error);
			}
		};

		getFeaturedProducts();
	}, []);

	return (
		<div className="w-full max-w-7xl mx-auto py-10 px-1">
			<h2 className="text-3xl font-bold text-blue-700 mb-6">
				Featured Products
			</h2>
			{pageLoading ? (
				<div>
					<div className="w-full flex gap-2 px-2">
						<div className="w-4 h-4 rounded-full animate-pulse bg-blue-600"></div>
						<div className="w-4 h-4 rounded-full animate-pulse bg-blue-600"></div>
						<div className="w-4 h-4 rounded-full animate-pulse bg-blue-600"></div>
					</div>
					<p className="px-2 mt-3 text-gray-700">
						Loading featured products. This may take a few
						seconds...
					</p>
				</div>
			) : (
				<>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-x-1 gap-y-2 sm:gap-x-4 sm-gap-y-4">
						{products.map((product) => (
							<Link
								to={`/product/${product._id}`}
								key={product._id}
								className="relative flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md transition-transform transform hover:scale-105"
							>
								<div className="flex items-center justify-center">
									<p className="px-1 sm:mx-0 mt-3 flex h-32 sm:h-40 overflow-hidden rounded-xl">
										<img
											className="object-cover"
											src={product.imageUrls[0]}
											alt="product image"
										/>
									</p>
								</div>
								<div className="t-4 px-2 sm:px-4 pb-3">
									<h5 className="text-lg sm:text-xl tracking-tight text-slate-900 truncate">
										{product.name}
									</h5>
									<div className="mt-2 mb-2 flex items-center justify-between">
										<p>
											<span className="text-xl sm:text-2xl font-bold text-slate-900">
												₵
												{(
													product.price -
													product.discount
												).toFixed(2)}
											</span>
											{product.discount > 0 && (
												<span className="text-sm text-slate-500 line-through ml-2">
													₵{product.price.toFixed(2)}
												</span>
											)}
										</p>
									</div>
									<p className="flex items-center text-xs font-light">
										<MdOutlinePerson3 className="mr-1" />
										{product.vendorName}
									</p>
									<button className="w-full mt-3 flex items-center justify-center gap-2 rounded-md bg-blue-700 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300">
										<CiViewList className="text-xl font-bold" />
										View details
									</button>
								</div>
							</Link>
						))}
					</div>
					<Link
						to="/shop"
						className="mt-6 flex items-center justify-center w-full sm:w-96 px-6 py-3 text-lg font-bold text-white bg-blue-700 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600"
					>
						See more products
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							className="w-5 h-5 ml-2 fill-current"
						>
							<path d="M17.92,11.62a1,1,0,0,0-.21-.33l-5-5a1,1,0,0,0-1.42,1.42L14.59,11H7a1,1,0,0,0,0,2h7.59l-3.3,3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l5-5a1,1,0,0,0,.21-.33A1,1,0,0,0,17.92,11.62Z"></path>
						</svg>
					</Link>
				</>
			)}
		</div>
	);
};

export default FeaturedProducts;
