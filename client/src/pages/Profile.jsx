import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { logoutUser } from "../redux/features/user/userSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import { CiViewList } from "react-icons/ci";
import PageLoader from "../components/PageLoader";
import { FaPhone } from "react-icons/fa";
import { MdOutlineDoubleArrow, MdVerified } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RotatingLines } from "react-loader-spinner";
import ReactGA from "react-ga4";

const UserProfile = () => {
		ReactGA.send({
			hitType: "pageview",
			page: "/profile/:userId",
			title: "User Profile Page",
		});
	const [userData, setUserData] = useState(null);
	const [isVendor, setIsVendor] = useState(false);
	const [pageLoading, setPageLoading] = useState(true);
	const [isDeleteLoading, setIsDeleteLoading] = useState(null);

	const { currentUser } = useSelector((state) => state.user);
	const BASE_URL = import.meta.env.VITE_BASE_URL;

	const location = useLocation();

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const params = useParams();
	const id = params.id;

	useEffect(() => {
		const getUserProfile = async () => {
			setPageLoading(true);
			try {
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
					setIsVendor(response.data.role === "vendor");
				}
			} catch (error) {
				if (
					error.response &&
					(error.response.status === 401 ||
						error.response.status === 404)
				) {
					navigate("/login", {
						state: "Your session expired. Please re-login",
					});
				} else {
					console.log(
						"Profile response error: ",
						error.response ? error.response.data : error.message
					);
				}
			} finally {
				setPageLoading(false);
			}
		};

		getUserProfile();
	}, [location.pathname]);

	const logout = async () => {
		dispatch(logoutUser());
		navigate("/");
	};

	const handleDeleteProduct = async (id) => {
		setIsDeleteLoading(id);
		try {
			await axios.get(`${BASE_URL}/api/products/delete/${id}`, {
				headers: {
					Authorization: `Bearer ${currentUser?.accessToken}`,
				},
			});
			setUserData((prevUserData) => ({
				...prevUserData,
				products: prevUserData.products.filter(
					(product) => product._id !== id
				),
			}));
			setIsDeleteLoading(null);
			toast.success("Product deleted successfully");
		} catch (error) {
			toast.error("Error deleting product");
			console.error(error); // Changed console.log to console.error for better error logging
		} finally {
			setIsDeleteLoading(null);
		}
	};

	return (
		<div className="flex flex-col min-h-screen">
			<ToastContainer />
			{pageLoading ? (
				<PageLoader />
			) : (
				<main className="flex-grow">
					<div className="mx-auto px-4 sm:px-6 py-8">
						<h1 className="text-2xl sm:text-3xl flex items-center font-bold text-blue-800 mb-4">
							<span className="text-base">Profile</span>
							<span className="text-base text-gray-800">
								<MdOutlineDoubleArrow />
							</span>
							{userData.vendorName || userData.email}
						</h1>
						{userData && (
							<div className="flex flex-wrap items-start justify-start gap-5">
								<div
									className={`w-full lg:basis-3/12 flex flex-col gap-4 text-start bg-white ${
										!isVendor ? "pt-6" : ""
									} px-6 pb-6 rounded-lg shadow-md mt-6`}
								>
									{isVendor && userData.vendorFlyerUrl && (
										<Link
											to={userData.vendorFlyerUrl}
											target="_blank"
											className="mx-auto sm:mx-0 lg:mx-auto -mt-4 relative block"
										>
											<img
												src={userData?.vendorFlyerUrl}
												alt="Business flyer"
												className="h-56 w-56 rounded-full object-center object-cover shadow-lg transition-opacity duration-300 hover:opacity-90"
											/>
											<span className="bg-blue-700 text-white absolute bottom-1 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded">
												View Flyer
											</span>
										</Link>
									)}
									{isVendor && !userData?.vendorFlyerUrl && (
										<p className="mx-auto sm:mx-0 lg:mx-auto -mt-4 relative block">
											<img
												src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019"
												alt="Business flyer"
												className="h-56 w-56 rounded-full object-center object-cover shadow-lg transition-opacity duration-300 hover:opacity-90"
											/>
										</p>
									)}

									{isVendor && (
										<>
											<p className="flex items-center text-md font-semibold text-gray-600">
												Name:{" "}
												{userData.vendorName}
												{userData.isVerified && (
												<MdVerified
													className=" text-blue-600"
													size={20}
												/>
										)}
											</p>
											<p className="text-md text-gray-600">
												<span className="font-semibold">
													Description:{" "}
												</span>
												{userData.vendorDescription ? (
													<span>
														{
															userData.vendorDescription
														}
													</span>
												) : !userData.vendorDescription &&
												userData._id ===
														currentUser._id ? (
													<Link
														to={`/update-profile/${userData._id}`}
														className="underline text-blue-600"
													>
														Add business description
													</Link>
												) : (
													<span className="italic">
														{" "}
														No description provided{" "}
													</span>
												)}
											</p>
										</>
									)}
									<p className="text-gray-600">
										Email: {userData.email}
									</p>
									<p className="text-gray-600 flex items-center gap-3">
										Contact Number: {userData?.contact}{" "}
										<a
											href={`tel:${userData?.contact}`}
											className="flex items-center gap-1 px-2 py-1 border border-blue-500 rounded-md"
										>
											<FaPhone className="text-xs" />
											call
										</a>
									</p>
									{isVendor && (
										<p className="text-gray-600">
											School:{" "}
											<span className="uppercase">
												{userData.school}
											</span>
										</p>
									)}
									{currentUser?._id === userData._id && (
										<div className="flex gap-2">
											<button
												onClick={logout}
												className="mt-4 border border-red-600 hover:bg-red-700 text-red-600 hover:text-white py-2 px-4 rounded"
											>
												Logout
											</button>
											{currentUser.isVendor && (
												<Link
													to={`/update-profile/${userData._id}`}
													className="mt-4 border border-blue-600 hover:bg-blue-700 text-blue-600 hover:text-white py-2 px-4 rounded"
												>
													Update Profile
												</Link>
											)}
										</div>
									)}
								</div>

								<div className="w-full lg:-mt-3 lg:basis-8/12">
									<div className="flex items-center justify-between mb-4">
										<h2 className="text-2xl font-semibold text-blue-800">
											Catalogue
										</h2>
										<Link
											to="/add-product"
											className="border bg-blue-700 hover:bg-blue-800 px-3 py-2 text-white font-bold"
										>
											Add Product
										</Link>
									</div>
									{userData?.products?.length === 0 && (
										<div>
											<p>
												No items in user catalogue at
												this time. Come back later and
												shop
											</p>
										</div>
									)}
									<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2">
										{userData.products.map((product) => (
											<p
												key={product._id}
												className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
											>
												<Link
													to={`/product/${product._id}`}
													className="flex items-center justify-center"
												>
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
												</Link>
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
													</div>
													<div className="flex justify-between gap-1">
														<Link
															to={`/product/${product._id}`}
															className="w-full flex items-center justify-center gap-1 rounded-md bg-blue-700 px-2 sm:px-2 py-2 text-center text-xs sm:text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
														>
															<CiViewList className="text-xl font-bold" />
															Details
														</Link>
														{currentUser?._id ===
															userData._id ||
														currentUser?.role ===
															"admin" ? (
															<>
																{isDeleteLoading ===
																product._id ? (
																	<div
																		key={
																			product._id
																		}
																	>
																		<RotatingLines
																			visible={
																				true
																			}
																			height="32"
																			width="32"
																			color="red"
																			strokeWidth="5"
																			animationDuration="0.75"
																			ariaLabel="rotating-lines-loading"
																			wrapperStyle={{}}
																			wrapperClass=""
																		/>
																	</div>
																) : (
																	<button
																		onClick={() => {
																			handleDeleteProduct(
																				product._id
																			);
																		}}
																		className="w-full flex items-center justify-center gap-1 rounded-md bg-red-700 px-2 sm:px-2 py-2 text-center text-xs sm:text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300"
																	>
																		Delete
																	</button>
																)}
															</>
														) : (
															""
														)}
													</div>
													{currentUser?._id ===
														userData._id && (
														<Link
															to={`/update-product/${product._id}`}
															className="w-full flex items-center justify-center gap-2 rounded-md bg-blue-800 mt-2 px-2 sm:px-5 py-2.5 sm:py-2 text-center text-xs sm:text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
														>
															Update product
														</Link>
													)}
												</div>
											</p>
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
