import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import "./SwipperStyles.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import PageLoader from "../components/PageLoader";
import useFavorites from "../hooks/useFavorites";
import { FaHeart, FaPhone } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Hearts } from "react-loader-spinner";

const ProductDetail = () => {
	const { addToFavorites, removeFromFavorites } = useFavorites();
	const [isFavorited, setIsFavorited] = useState(false);
	const [product, setProduct] = useState(null);
	const [pageLoading, setPageLoading] = useState(true);
	const [likeLoading, setLikeLoading] = useState(false);

	const params = useParams();
	const id = params.id;
	const BASE_URL = import.meta.env.VITE_BASE_URL;
	const { currentUser } = useSelector((state) => state.user);

	const reviews = [
		{
			id: 1,
			name: "Alice",
			rating: 5,
			comment: "Wow, Great product! Highly recommend",
		},
		{
			id: 2,
			name: "Bob",
			rating: 4,
			comment: "Good value for money. Could have been better though",
		},
		{
			id: 3,
			name: "Charlie",
			rating: 4,
			comment:
				"I was hesitant but went ahead to purchase. Satisfied with the purchase.",
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
		setLikeLoading(true);
		const response = await addToFavorites(product._id);
		setIsFavorited(true);
		setLikeLoading(false);
		console.log("Favorite results: ", response);
	};

	const handleUnfavorite = async () => {
		setLikeLoading(true);
		const response = await removeFromFavorites(product._id);
		setIsFavorited(false);
		setLikeLoading(false);
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
							<div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
								<div className="swipper-image w-full rounded-md">
									<div className="bg-white rounded-xl py-1 sm:py-3 text-blue-900 flex flex-col space-y-0 sm:space-y-4 h-full">
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
									<div className="flex items-center gap-5">
										<div className="mt-4">
											<span className="text-2xl sm:text-3xl lg:text-3xl font-bold text-slate-900">
												₵
												{(
													product.price -
													product.discount
												).toFixed(2)}
											</span>
											<span className="text-md sm:text-lg text-slate-900 line-through">
												₵{product.price.toFixed(2)}
											</span>
										</div>
										<div className="font-bold flex items-center mt-4 px-3">
											<div className="flex items-center">
												<svg
													aria-hidden="true"
													className="h-5 w-5 text-yellow-500"
													fill="currentColor"
													viewBox="0 0 20 20"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
												</svg>
												<svg
													aria-hidden="true"
													className="h-5 w-5 text-yellow-500"
													fill="currentColor"
													viewBox="0 0 20 20"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
												</svg>
												<svg
													aria-hidden="true"
													className="h-5 w-5 text-yellow-500"
													fill="currentColor"
													viewBox="0 0 20 20"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
												</svg>
												<svg
													aria-hidden="true"
													className="h-5 w-5 text-yellow-500"
													fill="currentColor"
													viewBox="0 0 20 20"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
												</svg>
												<svg
													aria-hidden="true"
													className="h-5 w-5 text-yellow-500"
													fill="currentColor"
													viewBox="0 0 20 20"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
												</svg>

												<span className="text-white mr-2 ml-3 rounded bg-yellow-600 px-2.5 py-0.5 text-xs font-semibold">
													5.0
												</span>
											</div>
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
									<Link
										to={`/profile/${product.vendorId}`}
										className="basis-1/3 border border-blue-600 hover:opacity-75 text-blue-700 font-bold py-2 mt-3 px-1 sm:px-2 rounded flex items-center justify-center"
									>
										See more products from vendor
									</Link>
									<div className="w-full flex items-center mt-6 space-x-2 sm:space-x-4 overflow-hidden text-xs sm:text-sm">
										<a
											href={`tel:${product.vendorContact}`}
											className="basis-1/3 border border-blue-600 hover:opacity-75 text-blue-700 font-bold py-2 px-1 sm:px-2 rounded flex items-center justify-center"
										>
											<FaPhone className="mr-1 sm:mr-2" />{" "}
											Call Vendor
										</a>
										<button className="basis-1/3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-1 sm:px-2 rounded flex items-center justify-center">
											<FiShoppingCart className="mr-1 sm:mr-2" />{" "}
											Add to Cart
										</button>
										{likeLoading ? (
											<Hearts
												height="40"
												width="40"
												color="red"
												ariaLabel="hearts-loading"
												wrapperStyle={{}}
												wrapperClass=""
												visible={true}
											/>
										) : (
											<button className="basis-1/3 border border-red-600 text-center hover:opacity-75 text-red-600 font-bold py-2 px-1 sm:px-2 rounded like-button">
												{isFavorited ? (
													<span
														onClick={
															handleUnfavorite
														}
														className="flex items-center justify-center"
													>
														<FaHeart className="mr-1 sm:mr-2 text-red-700 font-bold dislike transition-all duration-100" />
														Unfavourite
													</span>
												) : (
													<span
														onClick={handleFavorite}
														className="flex items-center justify-center"
													>
														<FiHeart className="mr-2 text-red-700 font-bold like transition-all duration-100" />
														Favourite
													</span>
												)}
											</button>
										)}
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
