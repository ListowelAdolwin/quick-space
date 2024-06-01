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
		<div className="py-8">
			<div className="w-full max-w-7xl mx-auto px-1">
				<h2 className="text-3xl font-bold text-gray-800">
					Shop by Category
				</h2>
				{pageLoading && (
					<div>
						<div className="w-full flex gap-2 ps-2">
							<div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full animate-pulse bg-blue-600"></div>
							<div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full animate-pulse bg-blue-600"></div>
							<div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full animate-pulse bg-blue-600"></div>
						</div>
						<p className="ps-2 mt-3">Loading category data. This may take a few seconds</p>
					</div>
				)}
				<div className="mt-6 grid grid-cols-3 gap-y-6 gap-x-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:gap-x-8">
					{categoryCounts.map((category) => (
						<Link
							to={`products/${category.val}`}
							key={category.val}
							className="group flex flex-col items-center justify-center text-center"
						>
							<img
								src={category.imageUrl}
								alt={category.displayName}
								className="h-24 w-24 md:w-40 md:h-40 rounded-full object-center object-cover hover:opacity-100"
							/>
							<div className="text-black">
								<div className="text-xs md:text-lg">
									{category.displayName}
								</div>
							</div>
							<div className="flex items-center justify-center text-xs text-white rounded-full w-6 h-6 p-3 mx-auto bg-blue-800">
								{category.count}
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default Categories;
