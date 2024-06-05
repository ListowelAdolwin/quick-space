import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { categories } from "../data/categories";
import { schools } from "../data/schools";
import { CiViewList } from "react-icons/ci";
import { MdOutlinePerson3 } from "react-icons/md";

export default function SearchProducts() {
	const navigate = useNavigate();
	const location = useLocation();
	const [searchData, setSearchData] = useState({
		searchTerm: "",
		price: "",
		category: "",
		school: "",
	});

	const [loading, setLoading] = useState(false);
	const [products, setProducts] = useState([]);
	const [showMore, setShowMore] = useState(false);

	const BASE_URL = import.meta.env.VITE_BASE_URL;

	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const searchTermFromUrl = urlParams.get("searchTerm") || "";
		const categoryFromUrl = urlParams.get("category") || "";
		const priceFromUrl = urlParams.get("price") || "";
		const schoolFromUrl = urlParams.get("school") || "";
		if (schoolFromUrl === "all") {
			urlParams.set("school", "");
		}

		setSearchData({
			searchTerm: searchTermFromUrl,
			price: priceFromUrl,
			category: categoryFromUrl,
			school: schoolFromUrl,
		});

		const fetchProducts = async () => {
			setLoading(true);
			setShowMore(false);
			const searchQuery = urlParams.toString();
			const res = await axios.get(
				`${BASE_URL}/api/products/search?${searchQuery}`
			);
			const data = res.data;
			console.log(data);
			if (data.length > 8) {
				setShowMore(true);
			} else {
				setShowMore(false);
			}
			setProducts(data);
			setLoading(false);
		};

		fetchProducts();
	}, [location.search]);

	const handleSubmit = (e) => {
		const { id, value } = e.target;

		setSearchData((prevState) => {
			const updatedData = {
				...prevState,
				[id]: value,
			};

			const urlParams = new URLSearchParams({
				searchTerm: updatedData.searchTerm,
				price: updatedData.price,
				category: updatedData.category,
				school: updatedData.school,
			});
			const searchQuery = urlParams.toString();

			navigate(`/search?${searchQuery}`);

			return updatedData;
		});
	};

	const clearSearch = () => {
		navigate(`/search?`);
	};

	const onShowMoreClick = async () => {
		const numberOfProducts = products.length;
		const urlParams = new URLSearchParams(location.search);
		urlParams.set("startIndex", numberOfProducts);
		const searchQuery = urlParams.toString();
		const res = await axios.get(
			`${BASE_URL}/api/products/search?${searchQuery}`
		);
		const data = res.data;
		if (data.length < 9) {
			setShowMore(false);
		}
		setProducts([...products, ...data]);
	};

	return (
		<div className="flex flex-col md:flex-row min-h-screen">
			<div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
				<form onSubmit={handleSubmit} className="flex flex-col gap-8">
					<div className="flex items-center gap-2">
						<input
							type="text"
							id="searchTerm"
							placeholder="Search by product or business name"
							className="bg-gray-50 border border-blue-500 text-white-800 focus:outline-none p-3 rounded-md w-full"
							value={searchData.searchTerm}
							onChange={handleSubmit}
						/>
					</div>

					<div className="flex items-center gap-2">
						<label className="font-semibold">Price:</label>
						<select
							onChange={handleSubmit}
							value={searchData.price}
							id="price"
							className="w-full bg-gray-200 text-gray-800 focus:outline-none p-2 rounded-md"
						>
							<option value="">Select price</option>
							<option value="asc">Least expensive</option>
							<option value="desc">Most expensive</option>
						</select>
					</div>

					<div className="flex items-center gap-2">
						<label className="font-semibold">Category:</label>
						<select
							onChange={handleSubmit}
							value={searchData.category}
							id="category"
							className="w-full bg-gray-200 text-gray-800 focus:outline-none p-2 rounded-md"
						>
							<option value="">Select category</option>
							{Object.entries(categories).map(
								([key, category]) => (
									<option key={key} value={key}>
										{category.name}
									</option>
								)
							)}
						</select>
					</div>
					<div className="flex items-center gap-2">
						<label className="font-semibold">School:</label>
						<select
							onChange={handleSubmit}
							value={searchData.school}
							id="school"
							className="w-full bg-gray-200 text-gray-800 focus:outline-none p-2 rounded-md"
						>
							<option value="">Select school</option>
							<option value="all">All</option>
							{Object.entries(schools).map(([key, school]) => (
								<option key={key} value={key}>
									{school}
								</option>
							))}
						</select>
					</div>
					<button className="flex items-center justify-center text-blue-800 w-full px-4 py-3 text-md font-bold leading-6 capitalize duration-100 transform border-2 rounded-sm cursor-pointer border-blue-800 focus:ring-1 focus:ring-blue-900 focus:ring-opacity-90 focus:outline-none sm:w-auto sm:px-6 border-text  hover:shadow-lg hover:-translate-y-1">
						See filtered products
					</button>
					<button
						className="flex items-center justify-center text-gray-800 w-full px-4 py-3 text-md font-bold leading-6 capitalize duration-100 transform border-2 rounded-sm cursor-pointer border-gray-800 focus:ring-1 focus:ring-gray-900 focus:ring-opacity-90 focus:outline-none sm:w-auto sm:px-6 border-text  hover:shadow-lg hover:-translate-y-1"
						type="button"
						onClick={clearSearch}
					>
						Clear Search
					</button>
				</form>
			</div>

			<div className="flex-1 pb-8">
				<h1 className="text-3xl font-semibold border-b p-3 text-slate-700">
					Search results:
				</h1>
				<div className="">
					{!loading && products.length === 0 && (
						<p className="text-xl ps-4 text-slate-700 ">
							No products found!
						</p>
					)}

					{loading ? (
						<div className="w-full mt-5 flex gap-2 ps-5">
							<div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full animate-pulse bg-blue-600"></div>
							<div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full animate-pulse bg-blue-600"></div>
							<div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full animate-pulse bg-blue-600"></div>
						</div>
					) : (
						<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-x-1 gap-y-2">
							{products.map((product) => (
								<Link
									to={`/product/${product._id}`}
									key={product._id}
									className="relative flex w-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
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
									<div className="mt-4 px-2 pb-1 sm:pb-5">
										<h5 className="text-xs sm:text-xl tracking-tight text-slate-900 line-clamp-1">
											{product.name}
										</h5>
										<div className="mt-0 sm:mt-2 mb-1 sm:mb-3 flex items-center justify-between">
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

											{product.vendor.name}
										</p>
										<button className="w-full flex items-center justify-center gap-2 rounded-md bg-blue-700 px-2 sm:px-5 py-2 text-center text-xs sm:text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300">
											<CiViewList className="text-xl font-bold" />
											View details
										</button>
									</div>
								</Link>
							))}
						</div>
					)}

					{showMore && (
						<button
							onClick={onShowMoreClick}
							className="ml-1 mt-5 flex flex-row items-center justify-center px-4 py-3 mb-4 text-sm font-bold bg-blue-800 leading-6 duration-100 transform rounded-sm shadow cursor-pointer focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none hover:shadow-lg hover:-translate-y-1 text-white"
						>
							<h1 className="text-md">Load more products</h1>
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
			</div>
		</div>
	);
}
