import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import "./SwipperStyles.css";
import { CiStar } from "react-icons/ci";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PageLoader from "../components/PageLoader";
import useFavorites from "../hooks/useFavorites";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";

const ProductDetail = () => {
	const { addToFavorites, removeFromFavorites } = useFavorites();
	const [isFavorited, setIsFavorited] = useState(false);
	const [product, setProduct] = useState(null);
	const [pageLoading, setPageLoading] = useState(true);

	const params = useParams();
	const id = params.id;
	const BASE_URL = import.meta.env.VITE_BASE_URL;
	const { currentUser } = useSelector((state) => state.user);

	const reviews = [
		{ id: 1, name: "Alice", rating: 5, comment: "Great product!" },
		{ id: 2, name: "Bob", rating: 4, comment: "Good value for money." },
		{
			id: 3,
			name: "Charlie",
			rating: 4,
			comment: "Satisfied with the purchase.",
		},
	];

	useEffect(() => {
		const getProduct = async () => {
			setPageLoading(true);
			const response = await axios.get(`${BASE_URL}/api/products/${id}`, {
				headers: {
					userId: currentUser?._id,
				},
			});
			console.log(response.data);
			if (response.status === 200) {
				setProduct(response.data);
				setIsFavorited(response.data.isFavorited);
			} else {
				console.log("Category response: ", response);
			}
			setPageLoading(false);
		};

		getProduct();
	}, []);

	const handleFavorite = async () => {
		setIsFavorited(true);
		const response = await addToFavorites(product._id);
		console.log("Favorite results: ", response);
	};

	const handleUnfavorite = async () => {
		setIsFavorited(false);
		const response = await removeFromFavorites(product._id);
		console.log("Unfavorite results: ", response);
	};

	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex-grow">
				{pageLoading ? (
					<PageLoader />
				) : (
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
						{product && (
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="swipper-image w-full rounded-md">
									<div className="bg-white rounded-xl py-3 text-blue-900 flex flex-col space-y-4 h-full">
										<Swiper
											pagination={{
												type: "fraction",
											}}
											navigation={true}
											modules={[Pagination, Navigation]}
											className="mySwiper h-full"
										>
											{product.imageUrls.map((url) => (
												<SwiperSlide
													key={url}
													className="flex items-center justify-center h-full"
												>
													<img
														className="object-cover"
														src={url}
														alt=""
													/>
												</SwiperSlide>
											))}
										</Swiper>
									</div>
								</div>
								<div>
									<h1 className="text-3xl font-bold text-gray-800">
										{product.name}
									</h1>
									<div className="flex items-center gap-16">
										<p className="text-2xl text-gray-600 mt-4">
											₵{product.price}
										</p>
										<div className="text-white flex items-center mt-4 px-3 py-1 bg-yellow-400 rounded-md">
											<span className="flex items-center text-xl font-bold mr-1">
												<CiStar />
											</span>
											<span className="text-lg font-semibold">
												{product.rating}
											</span>
											<span className="ml-2">/ 5.0</span>
										</div>
									</div>

									<div className="mt-8">
										<h2 className="text-xl font-semibold text-gray-800">
											About the product owner
										</h2>
										<p className="mt-2 text-gray-600">
											Vendor name: {product.vendorName}
										</p>
										<p className="mt-1 text-gray-600">
											Email: {product.vendorEmail}
										</p>
										<p className="mt-1 text-gray-600">
											Phone: {product.vendorContact}
										</p>
									</div>
									<div className="flex items-center mt-6 space-x-4">
										<button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded flex items-center">
											<FiShoppingCart className="mr-2" />{" "}
											Add to Cart
										</button>
										<button className="border border-red-600 hover:opacity-85 text-red-600 font-bold py-2 px-2 rounded">
											{isFavorited ? (
												<span
													onClick={handleUnfavorite}
													className="flex items-center"
												>
													<FaHeart className="mr-2 text-red-700 font-bold" />
													Unfavourite
												</span>
											) : (
												<span
													onClick={handleFavorite}
													className="flex items-center"
												>
													<FiHeart className="mr-2 text-red-700 font-bold" />
													Favourite
												</span>
											)}
										</button>
									</div>
									<div className="mt-8">
										<h2 className="text-xl font-semibold text-gray-800">
											Reviews
										</h2>
										<div className="mt-4 space-y-4">
											{reviews.map((review) => (
												<div
													key={review.id}
													className="bg-gray-100 p-4 rounded-lg shadow-md"
												>
													<div className="flex items-center">
														<span className="text-yellow-500 text-lg font-semibold">
															{review.rating}
														</span>
														<span className="ml-2 text-gray-600">
															/ 5.0
														</span>
														<span className="ml-4 text-gray-800 font-bold">
															{review.name}
														</span>
													</div>
													<p className="mt-2 text-gray-600">
														{review.comment}
													</p>
												</div>
											))}
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				)}
			</main>
		</div>
	);
};

export default ProductDetail;
