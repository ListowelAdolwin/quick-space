import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../../components/Spinner";
import { useSelector } from "react-redux";
import ReactGA from "react-ga4";
import { MdOutlinePerson3 } from "react-icons/md";
import { schools } from "../../data/schools";
import { useAxiosInstance } from "../../../config/axiosInstance";
import InlineSpinner from "../../components/InlineSpinner";

const ManageProducts = () => {
	ReactGA.send({
		hitType: "pageview",
		page: "/admin/manage-products",
		title: "Manage Products Page",
	});
	const [products, setProducts] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [school, setSchool] = useState("all")
	const [isLoading, setIsLoading] = useState(false);
	const [isDeleteLoading, setIsDeleteLoading] = useState(null);
	const [isUpdating, setIsUpdating] = useState(null);
	const [showMore, setShowMore] = useState(false);

	const BASE_URL = import.meta.env.VITE_BASE_URL;
	const { currentUser } = useSelector((state) => state.user);
	const axiosInstance = useAxiosInstance();
	const limit = 1000;

	useEffect(() => {
		const fetchProducts = async () => {
			setIsLoading(true);
			try {
				const response = await axios.get(`${BASE_URL}/api/products?limit=${limit}`);
				setProducts(response.data);
				setShowMore(response.data.length >= limit)
			} catch (error) {
				toast.error("Error fetching products");
			} finally {
				setIsLoading(false);
			}
		};

		fetchProducts();
	}, []);

	// const onShowMoreClick = async () => {
	// 	setIsShowMoreLoading(true)
	// 	const numberOfProducts = products.length;
	// 	const res = await axios.get(
	// 		`${BASE_URL}/api/products?startIndex=${numberOfProducts}&&limit=${limit}`
	// 	);
	// 	const data = res.data;
	// 	if (data.length < limit) {
	// 		setShowMore(false);
	// 	}
	// 	setProducts([...products, ...data]);
	// 	setIsShowMoreLoading(false);
	// };

	const handleDeleteProduct = async (id) => {
		setIsDeleteLoading(id);
		try {
			await axios.delete(`${BASE_URL}/api/products/delete/${id}`, {
				headers: {
					Authorization: `Bearer ${currentUser?.accessToken}`,
				},
			});
			setProducts(products.filter((product) => product._id !== id));
			toast.success("Product deleted successfully");
		} catch (error) {
			toast.error("Error deleting product");
		} finally {
			setIsDeleteLoading(null);
		}
	};

	const upgradeProduct = async (id) => {
		setIsUpdating(id);
		try {
			const response = await axiosInstance.post(`/api/products/pro-products/${id}`)
			if (response.status == 200) {
				const updatedProducts = filteredProducts.map((product) =>
					product._id === id
						? { ...product, isPro: true }
						: product
				);
				setProducts(updatedProducts);
			}
		} catch (error) {
			console.log("Error from axios response: ", error)
		}
		finally {
			setIsUpdating(null);
		}

	}

	const downgradeProduct = async (id) => {
		setIsUpdating(id)
		try {
			const response = await axiosInstance.delete(`/api/products/pro-products/${id}`)
			if (response.status == 200) {
				const updatedProducts = filteredProducts.map((product) =>
					product._id === id
						? { ...product, isPro: false }
						: product
				);
				setProducts(updatedProducts);
			}
		} catch (error) {
			console.log("Error from axios response: ", error)
		}
		finally {
			setIsUpdating(null);
		}

	}

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleSchoolChange = (event) => {
		setSchool(event.target.value)
	}

	let filteredProducts = products.filter((product) =>
		product.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	filteredProducts = filteredProducts.filter((product) => {
		if (school === "all") {
			return true;
		}
		if (school === "other") {
			return !Object.keys(schools).some(key => product.vendor?.school.toLowerCase() === key.toLowerCase());
		}
		return product.vendor?.school.toLowerCase().includes(school.toLowerCase());
	});

	return (
		<div className="min-h-screen bg-gray-100 py-8 px-4">
			<h1 className="text-3xl font-bold mb-10">Manage Products</h1>
			<div className="md:w-1/2 md:flex justify-start gap-2">
				<div className="mb-4 w-full md:w-1/2">
					<input
						type="text"
						placeholder="Search products..."
						value={searchTerm}
						onChange={handleSearchChange}
						className="p-2 border border-blue-300 text-gray-600 rounded focus:bg-white focus:outline-none w-full"
					/>
				</div>
				<div className="mb-4 w-full md:w-1/2">
					<select
						name="school"
						id="school"
						value={school}
						onChange={handleSchoolChange}
						className="p-2.5 border border-blue-300 text-gray-600 rounded w-full focus:bg-white focus:outline-none"
						required
					>
						<option value="">
							Select school
						</option>
						{Object.entries(schools).map(
							([key, school]) => (
								<option
									key={key}
									value={key}
									className="text-sm"
								>
									{school}
								</option>
							)
						)}
					</select>
				</div>
			</div>
			<div className="mb-3"><span className="font-bold">{filteredProducts && filteredProducts.length}</span> products found</div>
			{isLoading ? (
				<Spinner />
			) : (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-1 gap-y-2 sm:gap-x-4 sm-gap-y-4">
					{filteredProducts.map((product) => (
						<div
							key={product._id}
							className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
						>
							<Link
								to={`/product/${product._id}`}
								key={product._id}
							>
								<div className="flex items-center justify-center">
									<p className="relative mx-0 sm:mx-0 mt-3 flex h-36 sm:h-40 overflow-hidden rounded-xl">
										<img
											className="object-cover"
											src={product.imageUrls[0]}
											alt="product image"
										/>
									</p>
								</div>
								<div className="mt-4 px-2 sm:px-4">
									<h5 className="text-lg sm:text-xl tracking-tight text-slate-900 line-clamp-1">
										{product.name}
									</h5>
									<p className="flex items-center"><MdOutlinePerson3 className="mr-1" /> {product.vendorName}</p>
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
												₵{product.price.toFixed(2)}
											</span>
										</p>
									</div>
								</div>
							</Link>
							<div className="p-2 flex gap-1">
								{isDeleteLoading == product._id ? (
									<InlineSpinner />
								) : (
									<button
										onClick={() =>
											handleDeleteProduct(product._id)
										}
										className="w-1/2 flex items-center justify-center gap-2 rounded-md bg-red-600 px-2 sm:px-5 py-2 text-center text-xs sm:text-sm font-medium text-white hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
									>
										Delete
									</button>
								)}
								{isUpdating == product._id ? <InlineSpinner /> : <>{product.isPro ? <button onClick={() => { downgradeProduct(product._id) }} className="w-1/2 bg-green-500 text-white rounded-md px-2 text-xs sm:text-sm">Downgrade</button> : <button onClick={() => { upgradeProduct(product._id) }} className="w-1/2 text-white bg-green-500 rounded-md px-2 text-xs sm:text-sm">Upgrade</button>}</>}
							</div>
						</div>
					))}
				</div>
			)}
			{/* {showMore && (
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
			)} */}
		</div>
	);
};

export default ManageProducts;
