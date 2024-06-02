import axios from "axios";
import { useEffect, useState } from "react";
import { CiViewList } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PageLoader from "../components/PageLoader";

const Favourites = () => {
	const [favorites, setFavorites] = useState([]);
	const [pageLoading, setPageLoading] = useState(true);

	const BASE_URL = import.meta.env.VITE_BASE_URL;
	const { currentUser } = useSelector((state) => state.user);

	useEffect(() => {
		const getFavoriteProducts = async () => {
			setPageLoading(true)
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
			setPageLoading(false)
		};

		getFavoriteProducts();
	}, []);

	return (
		<div className="flex flex-col min-h-screen">
			{pageLoading ? (
				<PageLoader />
			) : (
				<main className="flex-grow">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
						<h1 className="text-3xl font-bold text-gray-800 mb-4">
							My Favourites
						</h1>
						{favorites.length === 0 && (
							<p>
								No favourited items. Add some items to your
								favourites and come view them
							</p>
						)}
						<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-1 gap-y-2 sm:gap-x-4 sm-gap-y-4">
							{favorites.map((product) => (
								<Link
									to={`/product/${product._id}`}
									key={product._id}
									className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
								>
									<span className="text-lg absolute right-2 top-2 hover:text-xl hover:opacity-85 transition-all duration-300">
										<FaHeart className="text-red-700" />
									</span>
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
													₵{product.price}
												</span>
												<span className="text-xs sm:text-sm text-slate-900 line-through">
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
										<button className="w-full flex items-center justify-center gap-2 rounded-md bg-blue-900 px-2 sm:px-5 py-2 text-center text-xs sm:text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300">
											<CiViewList className="text-xl font-bold" />
											View details
										</button>
									</div>
								</Link>
							))}
						</div>
					</div>
				</main>
			)}
		</div>
	);
};

export default Favourites;
