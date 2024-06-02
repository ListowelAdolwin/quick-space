import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { logoutUser } from "../redux/features/user/userSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import { CiViewList } from "react-icons/ci";
import PageLoader from "../components/PageLoader";
import { FaPhone } from "react-icons/fa";

const UserProfile = () => {
	const [userData, setUserData] = useState(null);
	const [pageLoading, setPageLoading] = useState(true);

	const { currentUser } = useSelector((state) => state.user);
	const BASE_URL = import.meta.env.VITE_BASE_URL;

	const location = useLocation();
	console.log(location)

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const params = useParams();
	const id = params.id;

	useEffect(() => {
		const getUserProfile = async () => {
			setPageLoading(true);
			const response = await axios.get(
				`${BASE_URL}/api/users/profile/${id}`,
				{
					headers: {
						Authorization: `Bearer ${currentUser?.accessToken}`,
					},
				}
			);
			if (response.status === 200) {
				setUserData(response.data);
				console.log("Profile response: ", response.data);
			} else {
				console.log("Profile response: ", response.data);
			}
			setPageLoading(false);
		};

		getUserProfile();
	}, [location.pathname]);

	const logout = async () => {
		dispatch(logoutUser());
		navigate("/");
	};

	return (
		<div className="flex flex-col min-h-screen">
			{pageLoading ? (
				<PageLoader />
			) : (
				<main className="flex-grow">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-8">
						<h1 className="text-3xl font-bold text-gray-800 mb-4">
							User Profile
						</h1>
						{userData && (
							<div className="flex flex-wrap items-start justify-start gap-5">
								<div className="w-full lg:basis-3/12 flex flex-col gap-4 text-start bg-white p-6 rounded-lg shadow-md">
									<p className="text-2xl font-semibold text-gray-800">
										Name: {userData.name}
									</p>
									<p className="text-gray-600">
										Email: {userData.email}
									</p>
									{userData.isVendor && (
										<p className="text-gray-600 flex items-center gap-3">
											Contact Number:{" "}
											{userData?.vendorContact}{" "}
											<a
												href={`tel:${userData.vendorContact}`}
												className="flex items-center gap-1 px-2 py-1 border border-blue-500 rounded-md"
											>
												<FaPhone className="text-xs" />
												call
											</a>
										</p>
									)}
									<p className="text-gray-600">
										School:{" "}
										<span className="uppercase">
											{userData.school}
										</span>
									</p>
									{currentUser?._id === userData._id && (
										<div className="flex gap-2">
											<button
												onClick={logout}
												className="mt-4 bg-red-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
											>
												Logout
											</button>
											<Link
												to={`/update-profile/${userData._id}`}
												className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
											>
												Update Profile
											</Link>
										</div>
									)}
								</div>

								<div className="w-full lg:-mt-12 lg:basis-8/12">
									<h2 className="text-2xl font-semibold text-gray-800 mb-4">
										Catalogue
									</h2>
									<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2">
										{userData.products.map((product) => (
											<Link
												to={`/product/${product._id}`}
												key={product._id}
												className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
											>
												<div className="flex items-center justify-center">
													<p className="mx-0 sm:mx-0 mt-3 flex h-36 sm:h-40 overflow-hidden rounded-xl">
														<img
															className="object-cover"
															src={
																product
																	.imageUrls[0]
															}
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
																	product.price -
																	product.discount
																).toFixed(2)}
															</span>
															<span className="text-xs sm:text-sm text-slate-900 line-through">
																₵
																{product.price.toFixed(
																	2
																)}
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
													{currentUser?._id ===
														userData._id && (
														<Link
															to={`/update-product/${product._id}`}
															className="w-full flex items-center justify-center gap-2 rounded-md bg-blue-900 mt-2 px-2 sm:px-5 py-2.5 sm:py-2 text-center text-xs sm:text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
														>
															Update product
														</Link>
													)}
												</div>
											</Link>
										))}
									</div>
								</div>
							</div>
						)}
					</div>
				</main>
			)}
		</div>
	);
};

export default UserProfile;
