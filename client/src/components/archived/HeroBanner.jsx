import { Link } from "react-router-dom";

const HeroBanner = () => {
	return (
		<div className="bg-blue-100 py-20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center">
					<h1 className="text-4xl font-bold text-gray-800">
						Welcome to E-Shop
					</h1>
					<p className="mt-4 text-lg text-gray-600">
						Discover the best products at unbeatable prices
					</p>
					<Link
						to="/shop"
						className="mt-6 inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500"
					>
						Shop Now
					</Link>
				</div>
			</div>
		</div>
	);
};

export default HeroBanner;
