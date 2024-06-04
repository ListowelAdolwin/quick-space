import { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoInformationCircleOutline, IoHomeOutline } from "react-icons/io5";
import { TbCategory, TbUsersGroup } from "react-icons/tb";
import { useSelector } from "react-redux";
import { MdOutlineDashboardCustomize } from "react-icons/md";

const AdminNavbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const { currentUser } = useSelector((state) => state.user);

	const handleOverlayClick = () => {
		setIsOpen(false);
	};

	const handleMenuClick = (event) => {
		if (event.target.tagName === "A") {
			setIsOpen(false);
		}
	};

	return (
		<nav className="bg-white shadow-md">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<Link to="/admin/dashboard" className="flex items-center">
						<img
							className="hidden sm:inline-block sm:w-32 sm:h-auto md:w-40 md:h-16"
							src="/logo-desktop.png"
							alt="Logo"
						/>
						<img
							className="sm:hidden w-12 h-12"
							src="/logo-mobile.png"
							alt="Logo"
						/>
					</Link>
					<div className="hidden md:block">
						<div className="ml-10 flex items-baseline space-x-4">
							<a
								href="/"
								className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
							>
								Back to Home
							</a>
							<Link
								to="/admin/dashboard"
								className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
							>
								Dashboard
							</Link>
							<Link
								to="/admin/users"
								className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
							>
								Manage Users
							</Link>
							<Link
								to="/admin/products"
								className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
							>
								Manage Products
							</Link>
							<div>
								<Link
									to="/add-product"
									className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
								>
									Add Product
								</Link>
								<Link
									to="/admin/categories/add"
									className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
								>
									Add Category
								</Link>
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
							<a
								href="/"
								className="flex items-center gap-2 text-gray-800 hover:text-gray-600 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
							>
								<IoHomeOutline
									className="inline-block"
									size={20}
								/>
								Back to Home
							</a>
							<Link
								to="/admin/dashboard"
								className="flex items-center gap-2 text-gray-800 hover:text-gray-600 hover:bg-gray-200 px-3 py-2 rounded-md text-base font-medium"
							>
								<TbCategory
									className="inline-block"
									size={20}
								/>
								Dashboard
							</Link>
							<Link
								to="/admin/users"
								className="flex items-center gap-2 text-gray-800 hover:text-gray-600 hover:bg-gray-200 px-3 py-2 rounded-md text-base font-medium"
							>
								<TbUsersGroup
									className="inline-block"
									size={20}
								/>{" "}
								Users
							</Link>
							<Link
								to="/admin/products"
								className="flex items-center  gap-2 text-gray-800 hover:text-gray-600 hover:bg-gray-200 px-3 py-2 rounded-md text-base font-medium"
							>
								<IoInformationCircleOutline
									className="inline-block"
									size={20}
								/>
								Products
							</Link>
							<Link
								to="/add-product"
								className="flex items-center  gap-2 text-gray-800 hover:text-gray-600 hover:bg-gray-200 px-3 py-2 rounded-md text-base font-medium"
							>
								<IoIosAddCircleOutline
									className="inline-block"
									size={20}
								/>
								Add Product
							</Link>
							<Link
								to="/admin/categories/add"
								className="flex items-center  gap-2 text-gray-800 hover:text-gray-600 hover:bg-gray-200 px-3 py-2 rounded-md text-base font-medium"
							>
								<MdOutlineDashboardCustomize
									className="inline-block"
									size={20}
								/>
								Add Category
							</Link>
							<Link
								to={`/profile/${currentUser._id}`}
								className="flex items-center  gap-2 text-gray-800 hover:text-gray-600 hover:bg-gray-200 px-3 py-2 rounded-md text-base font-medium"
							>
								<FaRegUserCircle
									className="inline-block"
									size={20}
								/>
								Profile
							</Link>
						</div>
					</div>
				</div>
			)}
		</nav>
	);
};

export default AdminNavbar;
