import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { CiViewList } from "react-icons/ci";

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
				setPageLoading(false);
			} else {
				console.log("Featured response: ", response);
			}
		};

		getFeaturedProducts();
	}, []);

	return (
		<div className="relative w-full max-w-7xl mx-auto py-10">
			<h1 className="text-3xl font-bold ml-3 pb-5">Featured Products</h1>
			{pageLoading && (
				<div>
					<div className="w-full flex gap-2 ps-2">
						<div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full animate-pulse bg-blue-600"></div>
						<div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full animate-pulse bg-blue-600"></div>
						<div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full animate-pulse bg-blue-600"></div>
					</div>
					<p className="ps-2 mt-3">This may take a few seconds</p>
				</div>
			)}
			<div className="overflow-x-auto scrollbar-hide">
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-1 gap-y-2 sm:gap-x-4 sm-gap-y-4">
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
							<div className="mt-4 px-2 sm:px-4 pb-3 sm:pb-5">
								<h5 className="text-lg sm:text-xl tracking-tight text-slate-900 line-clamp-1">
									{product.name}
								</h5>
								<div className="mt-0 sm:mt-2 mb-1 sm:mb-5 flex items-center justify-between">
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
									{/* <div className="flex items-center">
													<svg
														aria-hidden="true"
														className="h-5 w-5 text-yellow-300"
														fill="currentColor"
														viewBox="0 0 20 20"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
													</svg>
													<svg
														aria-hidden="true"
														className="h-5 w-5 text-yellow-300"
														fill="currentColor"
														viewBox="0 0 20 20"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
													</svg>
													<svg
														aria-hidden="true"
														className="h-5 w-5 text-yellow-300"
														fill="currentColor"
														viewBox="0 0 20 20"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
													</svg>
													<svg
														aria-hidden="true"
														className="h-5 w-5 text-yellow-300"
														fill="currentColor"
														viewBox="0 0 20 20"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
													</svg>
													<svg
														aria-hidden="true"
														className="h-5 w-5 text-yellow-300"
														fill="currentColor"
														viewBox="0 0 20 20"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
													</svg>
													<span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
														5.0
													</span>
												</div> */}
								</div>
								<button className="w-full flex items-center justify-center gap-2 rounded-md bg-blue-900 px-2 sm:px-5 py-2 text-center text-xs sm:text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300">
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
				className="ml-1 mt-3 flex flex-row items-center justify-center w-64 px-2 py-3 mb-4 text-sm font-bold bg-blue-600 leading-6 duration-100 transform rounded-sm shadow cursor-pointer focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none hover:shadow-lg hover:-translate-y-1 text-white"
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
