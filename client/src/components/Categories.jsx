import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Categories = () => {
	const [categoryCounts, setCategoryCounts] = useState([]);
	const [pageLoading, setPageLoading] = useState(true);

	const BASE_URL = import.meta.env.VITE_BASE_URL;

	useEffect(() => {
		setPageLoading(true);
		const getCategoryCounts = async () => {
			const res = await axios(`${BASE_URL}/api/categories/counts`);
			console.log(res.data.health_and_beauty);
			if (res.status === 200) {
				setCategoryCounts(res.data);
				setPageLoading(false);
			}
		};

		getCategoryCounts();
	}, []);

	return (
		<div className="py-8 bg-white sm:bg-inherit">
			<div className="w-full max-w-7xl mx-auto px-2">
				<h2 className="text-3xl font-bold text-blue-700 mb-6">
					Shop by Category
				</h2>
				{pageLoading && (
					<div>
						<div className="w-full flex gap-2 px-2">
							<div className="w-4 h-4 rounded-full animate-pulse bg-blue-600"></div>
							<div className="w-4 h-4 rounded-full animate-pulse bg-blue-600"></div>
							<div className="w-4 h-4 rounded-full animate-pulse bg-blue-600"></div>
						</div>
						<p className="px-2 mt-3 text-gray-700">
							Loading category data. This may take a few seconds
						</p>
					</div>
				)}
				<div className="mt-6 grid grid-cols-3 gap-y-8 gap-x-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:gap-x-8">
					{categoryCounts.map((category) => (
						<Link
							to={`products/${category.val}`}
							key={category.val}
							className="group flex flex-col items-center justify-center text-center transition-transform transform hover:scale-105"
						>
							<div className="relative">
								<img
									src={category.imageUrl}
									alt={category.displayName}
									className="h-20 w-20 md:w-32 md:h-32 rounded-full object-center object-cover shadow-lg transition-opacity duration-300 hover:opacity-90"
								/>
								<div className="absolute bottom-0 right-0 bg-blue-700 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
									{category.count}
								</div>
							</div>
							<div className="mt-2 text-blue-900 font-bold">
								<div className="text-xs md:text-lg">
									{category.displayName}
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default Categories;
