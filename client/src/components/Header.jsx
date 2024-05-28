import { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { FaRegHeart, FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { schools } from "../data/schools";

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [school, setSchool] = useState("");

	const { currentUser } = useSelector((state) => state.user);
	const navigate = useNavigate();

	const handleOverlayClick = () => {
		setIsOpen(false);
	};

	const handleMenuClick = (event) => {
		if (event.target.tagName === "A") {
			setIsOpen(false);
		}
	};

	const handleSchoolChange = (e) => {
		navigate(`/search?school=${e.target.value}`);
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		navigate(`/search?searchTerm=${e.target.value}`);
	};

	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		setSearchTerm(urlParams.get("searchTerm"));
		setSchool(urlParams.get("school"));
	}, [location.search]);

	return (
		<nav className="bg-white shadow-md">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<Link to="/" className="flex items-center">
						<img
							className="hidden sm:inline-block sm:w-32 sm:h-auto md:w-40 md:h-16"
							src="/logo_desktop.png"
							alt="Logo"
						/>
						<img
							className="sm:hidden w-12 h-12"
							src="/logo_mobile.png"
							alt="Logo"
						/>
					</Link>
					<div className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 pl-2 py-1 rounded-md font-medium">
						<select
							onChange={handleSchoolChange}
							className="bg-gray-200 hover:bg-gray-300 text-gray-800 focus:outline-none focus:bg-gray-300 py-1 rounded-l-md"
							value={school}
						>
							<option value="">Select School</option>
							<option value="all">All</option>
							{Object.entries(schools).map(([key, school]) => (
								<option key={key} value={key}>
									{school}
								</option>
							))}
						</select>
						<div className="border-l border-gray-400 h-6 mx-2"></div>
						<input
							onChange={handleFormSubmit}
							type="text"
							value={searchTerm}
							placeholder="Search product"
							className="bg-gray-200 w-12 sm:w-36 hover:bg-gray-300 text-gray-800 focus:outline-none focus:bg-gray-300 py-2 pr-2 rounded-r-md"
						/>
					</div>

					<div className="hidden md:block">
						<div className="ml-10 flex items-baseline space-x-4">
							<Link
								to="/"
								className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
							>
								Home
							</Link>
							<Link
								to="/shop"
								className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
							>
								Shop
							</Link>
							<Link
								to="/about"
								className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
							>
								About
							</Link>
							{currentUser ? (
								<div>
									<Link
										to="/add-product"
										className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
									>
										Add Product
									</Link>
									<Link
										to="/favourites"
										className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
									>
										<FaRegHeart
											className="inline-block"
											size={20}
										/>
									</Link>
									<Link
										to="/cart"
										className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
									>
										<FiShoppingCart
											className="inline-block"
											size={20}
										/>
									</Link>{" "}
									<Link
										to={`/profile/${currentUser._id}`}
										className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
									>
										<FaRegUserCircle
											className="inline-block"
											size={20}
										/>
									</Link>
								</div>
							) : (
								<div>
									<Link
										to="login"
										className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
									>
										Login
									</Link>{" "}
									<Link
										to="register"
										className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
									>
										Register
									</Link>
								</div>
							)}
						</div>
					</div>
					<div className="-mr-2 flex md:hidden">
						<button
							onClick={() => setIsOpen(!isOpen)}
							type="button"
							className="z-50 inline-flex items-center justify-center p-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white  hover:outline-none hover:ring-1 hover:ring-offset-1 hover:ring-offset-gray-800 hover:ring-white"
						>
							<span className="sr-only">Open main menu</span>
							<svg
								className={`${
									isOpen ? "hidden" : "block"
								} h-6 w-6`}
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16m-7 6h7"
								/>
							</svg>

							<svg
								className={`${
									isOpen ? "block" : "hidden"
								} h-6 w-6`}
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>

			{/* Overlay to close mobile view menu */}
			{isOpen && (
				<div className="fixed inset-0 z-40 flex">
					<div
						className="bg-black bg-opacity-50 flex-grow"
						onClick={handleOverlayClick}
					></div>
					<div
						onClick={handleMenuClick}
						className="bg-white w-3/4 max-w-sm shadow-lg transform translate-x-0 transition-transform duration-300 ease-in-out pt-4 overflow-scroll"
					>
						<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
							<Link
								to="/"
								className="text-gray-800 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium"
							>
								Home
							</Link>
							<Link
								to="/shop"
								className="text-gray-800 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium"
							>
								Shop
							</Link>
							<Link
								to="/about"
								className="text-gray-800 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium"
							>
								About
							</Link>
							{currentUser ? (
								<div>
									<Link
										to="/add-product"
										className="text-gray-800 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium"
									>
										Add Product
									</Link>
									<Link
										to="/favourites"
										className="flex items-center  gap-2 text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-base font-medium"
									>
										<FaRegHeart
											className="inline-block"
											size={20}
										/>
										Favorites
									</Link>
									<Link
										to="/cart"
										className="flex items-center  gap-2 text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-base font-medium"
									>
										<FiShoppingCart
											className="inline-block"
											size={20}
										/>
										Cart
									</Link>
									<Link
										to={`/profile/${currentUser._id}`}
										className="flex items-center  gap-2 text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-base font-medium"
									>
										<FaRegUserCircle
											className="inline-block"
											size={20}
										/>
										Profile
									</Link>
								</div>
							) : (
								<div className="flex flex-col">
									{" "}
									<Link
										to="login"
										className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
									>
										Login
									</Link>{" "}
									<Link
										to="register"
										className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
									>
										Register
									</Link>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</nav>
	);
};

export default Header;
