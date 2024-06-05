import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="bg-gray-300 py-8 shadow-inner text-gray-800">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-around items-center flex-wrap">
					<div className="w-full md:w-1/2 mt-6 md:mt-0">
						<h3 className="text-xl font-semibold text-blue-800">
							Quick Links
						</h3>
						<ul className="flex flex-wrap mt-2 space-x-2">
							<li>
								<Link to="/" className="hover:text-gray-400">
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
						<h3 className="text-xl font-semibold text-blue-800">
							Contact Us
						</h3>
						<ul className="mt-2 space-y-2">
							<li>
								Email:{" "}
								<a href="mailto:quickspacegh@gmail.com">
									{" "}
									quickspacegh@gmail.com
								</a>
							</li>
							<li>
								Phone:{" "}
								<a href="tel:+233543737889"> +233543737889</a>{" "}
							</li>
						</ul>
					</div>
				</div>
				<div className="mt-8 border-t border-gray-700 pt-4 flex justify-between items-center">
					<p>&copy; 2024 Quickspace. All rights reserved.</p>
					<div className="flex space-x-4">
						{/* Twitter */}
						<Link
							to="https://twitter.com/quickspacegh"
							className="hover:text-gray-400"
						>
							<svg
								fill="currentColor"
								className="w-6 h-6"
								viewBox="0 0 24 24"
							>
								<path d="M23.954 4.569c-.885.394-1.83.658-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.897-.957-2.178-1.555-3.594-1.555-2.717 0-4.92 2.203-4.92 4.917 0 .385.045.76.127 1.122C7.691 8.094 4.066 6.13 1.64 3.161c-.422.724-.666 1.562-.666 2.475 0 1.708.869 3.216 2.188 4.099-.806-.026-1.566-.078-2.224-.41v.041c0 2.385 1.698 4.374 3.946 4.83-.413.111-.849.171-1.296.171-.315 0-.624-.03-.924-.086.631 1.953 2.445 3.377 4.6 3.417-1.68 1.316-3.801 2.103-6.104 2.103-.396 0-.79-.023-1.175-.068 2.188 1.402 4.768 2.217 7.557 2.217 9.054 0 14.002-7.496 14.002-13.986 0-.21 0-.423-.015-.634.962-.695 1.8-1.562 2.462-2.549z" />
							</svg>
						</Link>
						{/* Instagram */}
						<Link
							to="https://instagram.com/quickspacegh"
							className="hover:text-gray-400"
						>
							<svg
								fill="currentColor"
								className="w-6 h-6"
								viewBox="0 0 24 24"
							>
								<path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.317 3.608 1.292.974.975 1.229 2.242 1.291 3.608.059 1.267.071 1.647.071 4.851s-.012 3.584-.071 4.85c-.062 1.366-.317 2.633-1.291 3.608-.975.974-2.242 1.229-3.608 1.291-1.267.059-1.647.071-4.851.071s-3.584-.012-4.85-.071c-1.366-.062-2.633-.317-3.608-1.291-.974-.975-1.229-2.242-1.291-3.608C2.175 15.786 2.163 15.406 2.163 12s.012-3.584.071-4.85c.062-1.366.317-2.633 1.291-3.608C4.5 2.48 5.767 2.225 7.133 2.163 8.4 2.104 8.78 2.163 12 2.163zm0-2.163C8.756 0 8.338.015 7.052.072 5.773.13 4.667.355 3.756 1.267c-.912.911-1.137 2.017-1.195 3.296C2.015 5.663 2 6.081 2 9.333v5.334c0 3.252.015 3.67.072 4.948.058 1.279.283 2.385 1.195 3.296.911.912 2.017 1.137 3.296 1.195 1.286.057 1.704.072 4.948.072s3.662-.015 4.948-.072c1.279-.058 2.385-.283 3.296-1.195.912-.911 1.137-2.017 1.195-3.296.057-1.286.072-1.704.072-4.948V9.333c0-3.252-.015-3.67-.072-4.948-.058-1.279-.283-2.385-1.195-3.296-.911-.912-2.017-1.137-3.296-1.195C15.662.015 15.244 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
							</svg>
						</Link>
						{/* Facebook */}
						<Link
							to="https://facebook.com/quickspacegh"
							className="hover:text-gray-400"
						>
							<svg
								fill="currentColor"
								className="w-6 h-6"
								viewBox="0 0 24 24"
							>
								<path d="M23.994 12c0-6.626-5.373-12-12-12S.003 5.374.003 12c0 5.992 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.05V9.41c0-3.02 1.793-4.693 4.533-4.693 1.313 0 2.686.235 2.686.235v2.99H15.8c-1.484 0-1.944.924-1.944 1.873v2.254h3.324l-.532 3.47H13.86v8.385c5.738-.9 10.134-5.862 10.134-11.854z" />
							</svg>
						</Link>
						{/* YouTube */}
						<Link
							to="https://youtube.com/quickspacegh"
							className="hover:text-gray-400"
						>
							<svg
								fill="currentColor"
								className="w-6 h-6"
								viewBox="0 0 24 24"
							>
								<path d="M23.498 6.186c-.26-1.013-.985-1.822-1.965-2.12C19.605 3.642 12 3.642 12 3.642s-7.605 0-9.532.423c-.98.298-1.704 1.108-1.965 2.12C0 8.243 0 12.001 0 12.001s0 3.758.503 5.814c.261 1.012.985 1.822 1.965 2.12 1.927.423 9.532.423 9.532.423s7.605 0 9.532-.423c.98-.298 1.704-1.108 1.965-2.12.503-2.056.503-5.814.503-5.814s0-3.758-.503-5.814zm-13.38 8.014V9.796l5.763 2.203-5.763 2.201z" />
							</svg>
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
