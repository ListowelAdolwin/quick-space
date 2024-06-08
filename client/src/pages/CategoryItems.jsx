import { CiViewList } from "react-icons/ci";
import { Link, useParams } from "react-router-dom";
//import { products } from "../data/products";
import { useEffect, useState } from "react";
import axios from "axios";
import { categories } from "../data/categories";
import PageLoader from "../components/PageLoader";
import { MdOutlinePerson3 } from "react-icons/md";

const CategoryItems = () => {
	const [products, setProducts] = useState([]);
	const [pageLoading, setPageLoading] = useState(true);
	const params = useParams();
	const category = params.category;

	const BASE_URL = import.meta.env.VITE_BASE_URL;

	useEffect(() => {
		const getCategoryProducts = async () => {
			setPageLoading(true);
			const response = await axios.get(
				`${BASE_URL}/api/products/category/${category}`
			);
			if (response.status === 200) {
				setProducts(response.data);
			} else {
				console.log("Category response: ", response);
			}
			setPageLoading(false);
		};

		getCategoryProducts();
	}, []);

	return (
		<div className="flex flex-col min-h-screen">
			{pageLoading ? (
				<PageLoader />
			) : (
				<main className="flex-grow">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
						<h1 className="text-3xl font-bold text-blue-700 mb-4">
							{categories[category].name}
						</h1>
						{products.length === 0 && (
							<div className="text-2xl">
								No items found under this category{" "}
							</div>
						)}
						<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-x-1 gap-y-2 sm:gap-x-4 sm-gap-y-4">
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
									<div className="mt-4 px-2 sm:px-4 pb-3">
										<h5 className="text-lg sm:text-xl tracking-tight text-slate-900 line-clamp-1">
											{product.name}
										</h5>
										<div className="mt-0 sm:mt-2 mb-1 sm:mb-2 flex items-center justify-between">
											<p>
												<span className="text-md sm:text-xl lg:text-2xl font-bold text-slate-900">
													₵
													{(
														product.price -
														product.discount
													).toFixed(2)}
												</span>
												<span className="text-xs sm:text-sm text-slate-900 line-through">
													₵{product.price.toFixed(2)}
												</span>
											</p>
										</div>
										<p className="pb-3 flex items-center text-xs font-extralight">
											<MdOutlinePerson3 />

											{product.vendor.vendorName}
										</p>
										<button className="w-full flex items-center justify-center gap-2 rounded-md bg-blue-700 px-2 sm:px-5 py-2 text-center text-xs sm:text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300">
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

export default CategoryItems;
