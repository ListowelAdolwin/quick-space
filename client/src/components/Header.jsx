import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FaRegHeart, FaRegUserCircle } from "react-icons/fa";
import logo_desktop from "../assets/logo_desktop.png";
import logo_mobile from "../assets/logo_mobile.png";
import { useSelector } from "react-redux";

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);

	const { currentUser } = useSelector((state) => state.user);

	return (
		<nav className="bg-white shadow-md">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<Link to="/" className="flex items-center">
						<img
							className="hidden sm:inline-block sm:w-32 sm:h-auto md:w-40 md:h-16"
							src={logo_desktop}
							alt="Logo"
						/>
						<img
							className="sm:hidden w-12 h-12"
							src={logo_mobile}
							alt="Logo"
						/>
					</Link>
					<div className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 pl-2 py-1 rounded-md font-medium">
						<select className="bg-gray-200 hover:bg-gray-300 text-gray-800 focus:outline-none focus:bg-gray-300 py-1 rounded-l-md">
							<option value="">Select School</option>
							<option value="KNUST">KNUST</option>
							<option value="UCC">UCC</option>
							<option value="UG">UG</option>
							<option value="UDS">UDS</option>
							<option value="UEW">UEW</option>
							<option value="UHAS">UHAS</option>
							<option value="UMAT">UMAT</option>
						</select>
						<div className="border-l border-gray-400 h-6 mx-2"></div>
						<input
							type="text"
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
							className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white  hover:outline-none hover:ring-1 hover:ring-offset-1 hover:ring-offset-gray-800 hover:ring-white"
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

			<div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
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
					<Link
						to="/contact"
						className="text-gray-800 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium"
					>
						Contact
					</Link>
					{currentUser ? (
						<div>
							<Link
								to="/favourites"
								className="text-gray-800 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium"
							>
								<FaRegHeart
									className="inline-block"
									size={20}
								/>
							</Link>
							<Link
								to="/cart"
								className="text-gray-800 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium"
							>
								<FiShoppingCart
									className="inline-block"
									size={20}
								/>
							</Link>
							<Link
								to={`/profile/${currentUser._id}`}
								className="text-gray-800 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium"
							>
								<FaRegUserCircle
									className="inline-block"
									size={20}
								/>
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
		</nav>
	);
};

export default Header;
