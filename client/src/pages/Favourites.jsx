import axios from "axios";
import { useEffect, useState } from "react";
import { CiViewList } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PageLoader from "../components/PageLoader";
import { MdOutlinePerson3 } from "react-icons/md";

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
					<div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 py-8">
						<h1 className="text-3xl font-bold text-blue-800 mb-4">
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
										<FaHeart className="text-blue-700" />
									</span>
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
														₵
														{product.price.toFixed(
															2
														)}
													</span>
												)}
											</p>
										</div>
										<p className="flex items-center text-xs font-light">
											<MdOutlinePerson3 className="mr-1" />
											{product.vendor.name}
										</p>
										<button className="w-full mt-3 flex items-center justify-center gap-2 rounded-md bg-blue-700 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300">
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
