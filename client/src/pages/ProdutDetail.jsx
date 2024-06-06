import { FiHeart } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import "./SwipperStyles.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageLoader from "../components/PageLoader";
import useFavorites from "../hooks/useFavorites";
import { FaHeart, FaPhone } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { useSelector } from "react-redux";
import { Hearts } from "react-loader-spinner";

const ProductDetail = () => {
	const { addToFavorites, removeFromFavorites } = useFavorites();
	const [isFavorited, setIsFavorited] = useState(false);
	const [product, setProduct] = useState(null);
	const [reviews, setReviews] = useState([])
	const [pageLoading, setPageLoading] = useState(true);
	const [likeLoading, setLikeLoading] = useState(false);
	const [showReviewForm, setShowReviewForm] = useState(false);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");
	const [reviewLoading, setReviewLoading] = useState(false);

	const params = useParams();
	const id = params.id;
	const BASE_URL = import.meta.env.VITE_BASE_URL;
	const { currentUser } = useSelector((state) => state.user);

	const handleRatingSubmit = async (e) => {
		e.preventDefault();
		setReviewLoading(true);
		try {
			const response = await axios.post(
				`${BASE_URL}/api/reviews/add/${id}`,
				{
					rating,
					comment,
				},
				{
					headers: {
						Authorization: `Bearer ${currentUser?.accessToken}`,
					},
				}
			);
			if (response.status === 201) {
				console.log(response.data)
				setReviews([response.data.review, ...reviews]);
				setComment("");
				setRating(0);
				setShowReviewForm(false);
				toast.success("Review added successfully");
			}
		} catch (error) {
			toast.error("Failed to add review");
		}
		setReviewLoading(false);
	};

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
				setProduct(response.data.product);
				setReviews(response.data.reviews)
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
			<ToastContainer />
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
													className="flex items-center justify-center h-full transition-transform duration-500 ease-in-out transform hover:scale-105"
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
									<h1 className="text-3xl font-bold text-blue-900">
										{product.name}
									</h1>
									<div className="flex items-center gap-2 sm:gap-5">
										<div className="mt-4">
											<span className="text-xl sm:text-3xl lg:text-3xl font-bold text-blue-900">
												₵
												{(
													product.price -
													product.discount
												).toFixed(2)}
											</span>
											<span className="text-md sm:text-lg text-gray-500 line-through">
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
												{/* Repeat the above SVG for the stars */}
												<span className="text-white mr-2 ml-3 rounded bg-yellow-600 px-2.5 py-0.5 text-xs font-semibold">
													{product.averageRating}
												</span>
											</div>
										</div>
									</div>
									<div className="py-3 mt-3">
										<h2 className="text-xl font-semibold text-blue-900">
											Product description
										</h2>
										{!product.description && (
											<p className="text-gray-500">
												No description provided
											</p>
										)}
										<p className="text-gray-700">
											{product.description}
										</p>
									</div>
									<div className="mt-3">
										<h2 className="text-xl font-semibold text-blue-900">
											About the product owner
										</h2>
										<p className="mt-2 flex items-center gap-1 text-gray-600">
											<span className="font-bold">
												Business name:
											</span>{" "}
											{product.vendorName}
											{product.isVendorVerified && (
												<MdVerified
													className=" text-blue-600"
													size={20}
												/>
											)}
										</p>
										<p className="mt-1 text-gray-600">
											<span className="font-bold">
												Email:
											</span>{" "}
											<a
												href={`mailto:${product.email}`}
												className="text-blue-500"
											>
												{product.email}
											</a>
										</p>
										<p className="mt-1 text-gray-600">
											<span className="font-bold">
												Phone:
											</span>{" "}
											{product.contact}
										</p>
									</div>

									<div className="w-full flex items-center mt-6 space-x-2 sm:space-x-4 overflow-hidden text-xs sm:text-sm">
										<a
											href={`tel:${product.contact}`}
											className="basis-1/2 border border-blue-600 hover:bg-blue-600 hover:text-white text-blue-600 font-bold py-2 px-1 sm:px-2 rounded transition-colors duration-300 flex items-center justify-center"
										>
											<FaPhone className="mr-1 sm:mr-2" />{" "}
											Call Owner
										</a>
										<button
											onClick={
												isFavorited
													? handleUnfavorite
													: handleFavorite
											}
											className={`relative basis-1/2 border text-blue-600 hover:bg-blue-600 hover:text-white border-blue-600 focus:bg-blue-600 focus:text-white font-bold py-2 px-1 sm:px-2 rounded transition-colors duration-300 flex items-center justify-center ${
												likeLoading
													? "cursor-not-allowed"
													: ""
											}`}
											disabled={likeLoading}
										>
											{likeLoading ? (
												<Hearts
													height="20"
													width="20"
													color="blue"
													ariaLabel="hearts-loading"
													wrapperClass="flex items-center justify-center"
													visible={true}
												/>
											) : isFavorited ? (
												<>
													<FaHeart className="mr-1 sm:mr-2" />{" "}
													<span>Remove Favorite</span>
												</>
											) : (
												<>
													<FiHeart className="mr-1 sm:mr-2" />{" "}
													<span>
														Save as Favorite
													</span>
												</>
											)}
										</button>
									</div>
									<Link
										to={`/profile/${product.vendorId}`}
										className="basis-1/3 border border-blue-600 hover:opacity-75 text-blue-700 font-bold py-2 mt-3 px-1 sm:px-2 rounded flex items-center justify-center"
									>
										See more products from this seller
									</Link>
									<div className="mt-8">
										<h2 className="text-xl font-semibold text-blue-900 mb-3">
											Reviews
										</h2>
										{product.reviews.length === 0 && (
											<p className="pb-2">
												No reviews given for this
												product yet
											</p>
										)}
										{!showReviewForm ? (
											<button
												onClick={() => {
													setShowReviewForm(true);
												}}
												className="border border-gray-600 px-2 py-1 hover:opacity-85"
											>
												Add review
											</button>
										) : (
											<form
												onSubmit={handleRatingSubmit}
												className="mb-4 bg-gray-50 py-5 px-3 rounded-md"
											>
												<div className="mb-5">
													<label className="block text-gray-700 text-base font-bold mb-2">
														Rating
													</label>
													<select
														value={rating}
														onChange={(e) =>
															setRating(
																e.target.value
															)
														}
														className="shadow border border-gray-400 rounded w-full py-2 px-3 text-gray-700  focus:outline-none"
													>
														<option value="">
															Choose rating...
														</option>
														<option value="1">
															1 - Poor
														</option>
														<option value="2">
															2 - Fair
														</option>
														<option value="2.5">
															2.5 - Very Fair
														</option>
														<option value="3">
															3 - Good
														</option>
														<option value="3.5">
															3.5 - Very Good
														</option>
														<option value="4">
															4 - Great
														</option>
														<option value="4.5">
															4.5 - Very Great
														</option>
														<option value="5">
															5 - Excellent
														</option>
													</select>
												</div>
												<div className="mb-4">
													<label className="block text-gray-700 text-base font-bold mb-2">
														Add Comment
													</label>
													<textarea
														value={comment}
														onChange={(e) =>
															setComment(
																e.target.value
															)
														}
														cols="5"
														className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-gray-200"
													/>
												</div>
												{reviewLoading ? (
													<p>loading</p>
												) : (
													<button
														type="submit"
														className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
													>
														Submit review
													</button>
												)}
											</form>
										)}
										<div className="mt-4 space-y-4">
											{reviews.map((review) => (
												<div
													key={review._id}
													className="bg-gray-100 p-4 rounded-lg shadow-md"
												>
													<div className="flex items-center">
														<span className="text-yellow-500 text-lg font-semibold">
															{review.rating}
														</span>
														<span className="ml-2 text-gray-600">
															/ 5.0
														</span>
														<span className="ml-4 text-blue-800 font-bold">
															{review.user.email}
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
