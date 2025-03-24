import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { CiViewList } from "react-icons/ci";
import { MdOutlinePerson3, MdVerified } from "react-icons/md";
import { useSelector } from "react-redux";
import { FaImages, FaStar } from "react-icons/fa";

const ProProducts = () => {
	const [products, setProducts] = useState([]);
	const [pageLoading, setPageLoading] = useState(true);

	const BASE_URL = import.meta.env.VITE_BASE_URL;
	const { currentSchool } = useSelector((state) => state.user);

	useEffect(() => {
		const getProProducts = async () => {
			setPageLoading(true);
			try {
				const response = await axios.get(
					`${BASE_URL}/api/products/pro-products?school=${currentSchool}`
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

		getProProducts();
	}, []);

	return (
		<div className="w-full max-w-7xl mx-auto pb-5 px-1">
			<h2 className="text-3xl font-bold text-blue-700 mb-4">
				Top Products
			</h2>
			{pageLoading ? (
				<div>
					<div className="w-full flex gap-2 px-2">
						<div className="w-4 h-4 rounded-full animate-pulse bg-blue-600"></div>
						<div className="w-4 h-4 rounded-full animate-pulse bg-blue-600"></div>
						<div className="w-4 h-4 rounded-full animate-pulse bg-blue-600"></div>
					</div>
					<p className="px-2 mt-3 text-gray-700">
						Loading top products. This may take a few
						seconds...
					</p>
				</div>
			) : products.length > 0 ? (
				<>
					<div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-x-1 gap-y-2 sm:gap-x-4 sm-gap-y-4">
						{products.map((product) => (
							<Link
								to={`/product/${product._id}`}
								key={product._id}
								className="relative flex flex-col overflow-hidden rounded-lg border border-white bg-white shadow-md transition-transform transform hover:scale-105"
							>
								<div className="flex items-center justify-center relative">
									<p className="px-1 sm:mx-0 mt-3 flex h-24 sm:h-40 overflow-hidden rounded-xl">
										<img
											className="object-cover"
											src={product.imageUrls[0]}
											alt="product image"
										/>
										<span className="absolute left-1 bottom-1 text-xs font-bold text-white px-1 bg-yellow-700 flex gap-1 items-center">{product.imageUrls.length} <FaImages /></span>

									</p>
								</div>
								<div className="t-4 px-2 sm:px-4 pb-3">
									<h5 className="text-md sm:text-lg tracking-tight truncate lowercase first-letter:uppercase text-yellow-600 font-bold">
										{product.name}
									</h5>
									<div className="mt-2 mb-2 flex items-center justify-between">
										<p>
											<span className="text-lg sm:text-xl font-bold text-slate-900">
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
									<p className="flex items-center text-xs font-light lowercase first-letter:uppercase">
										<MdOutlinePerson3 className="mr-1" />
										<span className="truncate">{product.vendorName}</span>
										{product.vendor.isPro ? (
											<FaStar className="text-amber-600 text-bold"
												size={15} />
										) : product.vendor.isVerified ? <MdVerified
											className=" text-blue-600"
											size={16}
										/> : <span></span>}
									</p>
									{/* <button className="w-full mt-3 flex items-center justify-center gap-2 rounded-md bg-yellow-600 px-3 py-2 text-sm font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-4 focus:ring-yellow-400">
										<CiViewList className="text-xl font-bold" />
										View details
									</button> */}
								</div>
							</Link>
						))}
					</div>

				</>
			) : <p> No pro products for selected school</p>}
		</div>
	);
};

export default ProProducts;
