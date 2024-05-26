import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="bg-gray-200 py-8 shadow-inner text-gray-800">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-around items-center flex-wrap">
					<div className="w-full md:w-1/2 mt-6 md:mt-0">
						<h3 className="text-xl font-semibold">Quick Links</h3>
						<ul className="mt-2 space-y-2">
							<li>
								<Link
									to="/home"
									className="hover:text-gray-400"
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									to="/shop"
									className="hover:text-gray-400"
								>
									Shop
								</Link>
							</li>
							<li>
								<Link
									to="/about"
									className="hover:text-gray-400"
								>
									About
								</Link>
							</li>
							<li>
								<Link
									to="/contact"
									className="hover:text-gray-400"
								>
									Contact
								</Link>
							</li>
						</ul>
					</div>
					<div className="w-full md:w-1/2 mt-6 md:mt-0">
						<h3 className="text-xl font-semibold">Contact Us</h3>
						<ul className="mt-2 space-y-2">
							<li>Email: support@eshop.com</li>
							<li>Phone: +233 234 567 890</li>
							<li>Address: 123 E-Shop St, Online City</li>
						</ul>
					</div>
				</div>
				<div className="mt-8 border-t border-gray-700 pt-4 flex justify-between items-center">
					<p>&copy; 2024 E-Shop. All rights reserved.</p>
					<div className="flex space-x-4">
						<Link to="#" className="hover:text-gray-400">
							<svg
								fill="currentColor"
								className="w-6 h-6"
								viewBox="0 0 24 24"
							>
								<path d="M24 4.557c-.883.392-1.832.656-2.828.775a4.933 4.933 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.384 4.482c-4.086-.195-7.702-2.165-10.126-5.144a4.822 4.822 0 00-.666 2.475 4.92 4.92 0 002.188 4.096 4.903 4.903 0 01-2.224-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.084 4.93 4.93 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.396 0-.79-.023-1.17-.068a13.945 13.945 0 007.557 2.212c9.054 0 14.01-7.498 14.01-13.986 0-.215-.005-.427-.014-.637A10.025 10.025 0 0024 4.557z" />
							</svg>
						</Link>
						<Link to="#" className="hover:text-gray-400">
							<svg
								fill="currentColor"
								className="w-6 h-6"
								viewBox="0 0 24 24"
							>
								<path d="M23.994 12c0-6.626-5.373-12-12-12S.003 5.374.003 12c0 5.992 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.05V9.41c0-3.02 1.793-4.693 4.533-4.693 1.313 0 2.686.235 2.686.235v2.99H15.8c-1.484 0-1.944.924-1.944 1.873v2.254h3.324l-.532 3.47H13.86v8.385c5.738-.9 10.134-5.862 10.134-11.854z" />
							</svg>
						</Link>
						<Link to="#" className="hover:text-gray-400">
							<svg
								fill="currentColor"
								className="w-6 h-6"
								viewBox="0 0 24 24"
							>
								<path d="M12 2.163c-5.51 0-9.937 4.426-9.937 9.936 0 4.393 2.861 8.124 6.84 9.446-.094-.814-.18-2.065.038-2.957.2-.817 1.287-5.188 1.287-5.188s-.327-.654-.327-1.62c0-1.518.88-2.65 1.974-2.65.93 0 1.38.698 1.38 1.533 0 .933-.595 2.328-.902 3.626-.257 1.084.536 1.966 1.588 1.966 1.903 0 3.367-2.01 3.367-4.902 0-2.558-1.84-4.35-4.468-4.35-3.046 0-4.835 2.284-4.835 4.633 0 .917.357 1.904.803 2.44.088.104.1.195.075.299-.08.325-.258 1.033-.293 1.177-.048.198-.156.241-.363.146-1.35-.627-2.192-2.594-2.192-4.181 0-3.413 2.482-6.545 7.158-6.545 3.758 0 6.675 2.686 6.675 6.28 0 3.724-2.348 6.71-5.594 6.71-1.091 0-2.116-.567-2.467-1.232l-.671 2.55c-.24.923-.891 2.079-1.333 2.785.998.31 2.052.478 3.148.478 5.508 0 9.938-4.427 9.938-9.937 0-5.51-4.428-9.937-9.937-9.937z" />
							</svg>
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
