import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { CiViewList } from "react-icons/ci";
import { MdOutlinePerson3 } from "react-icons/md";

const FeaturedProductsCarousel = () => {
	const [products, setProducts] = useState([]);
	const [pageLoading, setPageLoading] = useState(true);

	const BASE_URL = import.meta.env.VITE_BASE_URL;

	useEffect(() => {
		const getFeaturedProducts = async () => {
			setPageLoading(true);
			const response = await axios.get(
				`${BASE_URL}/api/products/featured`
			);
			if (response.status === 200) {
				setProducts(response.data);
				console.log(response.data)
				setPageLoading(false);
			} else {
				console.log("Featured response: ", response);
			}
		};

		getFeaturedProducts();
	}, []);

	return (
		<div className="w-full max-w-7xl mx-auto py-10 px-1">
			<h2 className="text-3xl font-bold text-gray-800 mb-5">
				Featured Products
			</h2>
			{pageLoading && (
				<div>
					<div className="w-full flex gap-2 ps-2">
						<div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full animate-pulse bg-blue-600"></div>
						<div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full animate-pulse bg-blue-600"></div>
						<div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full animate-pulse bg-blue-600"></div>
					</div>
					<p className="ps-2 mt-3">
						Loading featured products. This may take a few seconds
					</p>
				</div>
			)}
			<div className="overflow-x-auto scrollbar-hide">
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-x-1 gap-y-2 sm:gap-x-4 sm-gap-y-4">
					{products.map((product) => (
						<Link
							to={`/product/${product._id}`}
							key={product._id}
							className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
						>
							<div className="flex items-center justify-center">
								<p className="mx-0 sm:mx-0 mt-3 flex h-36 sm:h-40 overflow-hidden rounded-xl">
									<img
										className="object-cover"
										src={product.imageUrls[0]}
										alt="product image"
									/>
								</p>
							</div>
							<div className="mt-4 px-2 sm:px-4 pb-3">
								<h5 className="text-lg sm:text-xl tracking-tight text-slate-900 line-clamp-1">
									{product.name}
								</h5>
								<div className="mt-0 sm:mt-2 mb-1 sm:mb-2 flex items-center justify-between">
									<p>
										<span className="text-md sm:text-xl lg:text-2xl font-bold text-slate-900">
											₵
											{(
												product.price - product.discount
											).toFixed(2)}
										</span>
										<span className="text-xs sm:text-sm text-slate-900 line-through">
											₵{product.price.toFixed(2)}
										</span>
									</p>
								</div>
								<p className="pb-3 flex items-center text-xs font-extralight">
									<MdOutlinePerson3 />

									{product.vendor.name}
								</p>
								<button className="w-full flex items-center justify-center gap-2 rounded-md bg-blue-700 px-2 sm:px-5 py-2 text-center text-xs sm:text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300">
									<CiViewList className="text-xl font-bold" />
									View details
								</button>
							</div>
						</Link>
					))}
				</div>
			</div>
			<Link
				to="/shop"
				className="ml-1 mt-3 flex flex-row items-center justify-center w-64 px-2 py-3 mb-4 text-sm font-bold bg-blue-700 leading-6 duration-100 transform rounded-sm shadow cursor-pointer focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 focus:outline-none hover:shadow-lg hover:-translate-y-1 text-white"
			>
				<h1 className="text-xl font-bold">See more products</h1>
				<span className="">
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
