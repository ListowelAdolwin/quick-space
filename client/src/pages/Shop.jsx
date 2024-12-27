import { CiViewList } from "react-icons/ci";
import { Link } from "react-router-dom";
//import { products } from "../data/products";
import { useEffect, useState } from "react";
import axios from "axios";
import PageLoader from "../components/PageLoader";
import { MdOutlinePerson3, MdVerified } from "react-icons/md";
import { useSelector } from "react-redux";
import ReactGA from "react-ga4";
import { FaStar } from "react-icons/fa";

const Shop = () => {
	ReactGA.send({
		hitType: "pageview",
		page: "/shop",
		title: "Shop Page",
	});
	const [products, setProducts] = useState([]);
	const [pageLoading, setPageLoading] = useState(true);
	const [showMore, setShowMore] = useState(false);
	const [isShowMoreLoading, setIsShowMoreLoading] = useState(false);

	const BASE_URL = import.meta.env.VITE_BASE_URL;

	const limit = 20;
	const { currentSchool } = useSelector((state) => state.user);

	useEffect(() => {
		const getProducts = async () => {
			setPageLoading(true);
			const response = await axios.get(`${BASE_URL}/api/products/?limit=${limit}&&school=${currentSchool}`);
			if (response.status === 200) {
				setProducts(response.data);
				setShowMore(response.data.length >= limit)
				setPageLoading(false);
			} else {
				console.log("Products response: ", response);
			}
		};

		getProducts();
	}, []);

	const onShowMoreClick = async () => {
		setIsShowMoreLoading(true)
		const numberOfProducts = products.length;
		const res = await axios.get(
			`${BASE_URL}/api/products?startIndex=${numberOfProducts}&&limit=${limit}`
		);
		const data = res.data;
		if (data.length < limit) {
			setShowMore(false);
		}
		setProducts([...products, ...data]);
		setIsShowMoreLoading(false);
	};

	return (
		<main>
			{pageLoading ? (
				<PageLoader />
			) : (
				<div className="flex flex-col min-h-screen">
					<main className="flex-grow">
						<div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-8">
							<h2 className="text-3xl font-bold text-blue-700 mb-6">
								Shop Items
							</h2>
							{products.length === 0 && (
								<p>
									No items in shop at this time. Come back
									later and shop
								</p>
							)}
							<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-x-1 gap-y-2 sm:gap-x-4 sm-gap-y-4">
								{products.map((product) => (
									<Link
										to={`/product/${product._id}`}
										key={product._id}
										className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
									>
										<div className="flex items-center justify-center">
											<p className="relative mx-0 sm:mx-0 mt-3 flex h-36 sm:h-40 overflow-hidden rounded-xl">
												<img
													className="object-cover"
													src={product.imageUrls[0]}
													alt="product image"
												/>
												{product.discount > 0 && (
													<span className="absolute top-0 left-0 rounded-full bg-blue-700 px-2 text-sm font-medium text-white">
														{(
															(product.discount /
																product.price) *
															100
														).toFixed(0)}
														% off
													</span>
												)}
											</p>
										</div>
										<div className="mt-4 px-2 sm:px-4 pb-3">
											<h5 className="text-lg sm:text-xl tracking-tight text-slate-900 line-clamp-1">
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
											<p className="pb-3 flex gap-0.5 items-center+ text-xs font-extralight">
												<MdOutlinePerson3 />

												{product.vendor.vendorName}
												{product.vendor.isPro ? (
													<FaStar className="text-amber-600 text-bold"
														size={15} />
												) : product.vendor.isVerified ? <MdVerified
													className=" text-blue-600"
													size={16}
												/> : <span></span>}
											</p>
											<button className="w-full flex items-center justify-center gap-2 rounded-md bg-blue-700 px-2 sm:px-5 py-2 text-center text-xs sm:text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300">
												<CiViewList className="text-xl font-bold" />
												View details
											</button>
										</div>
									</Link>
								))}
							</div>
							{showMore && (
								<button
									onClick={onShowMoreClick}
									className="w-full sm:w-60 mt-5 flex flex-row items-center justify-center px-4 py-3 mb-4 text-sm font-bold bg-blue-700 leading-6 duration-100 transform rounded-sm shadow cursor-pointer focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none hover:shadow-lg hover:-translate-y-1 text-white"
								>
									<h1 className="text-md">
										{isShowMoreLoading ? "Loading more products..." : "Load more products"}
									</h1>
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
								</button>
							)}
						</div>
					</main>
				</div>
			)}
		</main>
	);
};

export default Shop;
