import { CiViewList } from "react-icons/ci";
import { Link } from "react-router-dom";
//import { products } from "../data/products";
import { useEffect, useState } from "react";
import axios from "axios";
import PageLoader from "../components/PageLoader";

const Shop = () => {
	const [products, setProducts] = useState([]);
	const [pageLoading, setPageLoading] = useState(true);

	const BASE_URL = import.meta.env.VITE_BASE_URL;

	useEffect(() => {
		const getProducts = async () => {
			setPageLoading(true);
			const response = await axios.get(`${BASE_URL}/api/products/`);
			if (response.status === 200) {
				setProducts(response.data);
				setPageLoading(false);
				console.log("Products response: ", response);
			} else {
				console.log("Products response: ", response);
			}
		};

		getProducts();
	}, []);
	return (
		<main>
			{pageLoading ? (
				<PageLoader />
			) : (
				<div className="flex flex-col min-h-screen">
					<main className="flex-grow">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
							<h1 className="text-3xl font-bold text-gray-800 mb-4">
								Shop
							</h1>
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
								{products.map((product) => (
									<Link
										to={`/product/${product._id}`}
										key={product._id}
										className="relative lg:m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
									>
										<div className="flex items-center justify-center">
											<p className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
												<img
													className="object-cover"
													src={product.imageUrls[0]}
													alt="product image"
												/>
												<span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-sm font-medium text-white">
													39% OFF
												</span>
											</p>
										</div>
										<div className="mt-4 px-4 pb-5">
											<h5 className="text-xl tracking-tight text-slate-900">
												{product.name}
											</h5>
											<div className="mt-2 mb-5 flex items-center justify-between">
												<p>
													<span className="text-3xl font-bold text-slate-900">
														₵{product.price}
													</span>
													<span className="text-sm text-slate-900 line-through">
														₵
														{(
															product.price - 78
														).toFixed(2)}
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
											<button className="flex items-center justify-center gap-2 rounded-md bg-blue-900 px-5 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300">
												<CiViewList className="text-xl font-bold" />
												View details
											</button>
										</div>
									</Link>
								))}
							</div>
						</div>
					</main>
				</div>
			)}
		</main>
	);
};

export default Shop;
