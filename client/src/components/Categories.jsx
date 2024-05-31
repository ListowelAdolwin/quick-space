import { Link } from "react-router-dom";
import { categories } from "../data/categories";

const Categories = () => {
	return (
		<div className="bg-gray-50 py-8">
			<div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8">
				<h2 className="text-3xl font-bold text-gray-800">
					Shop by Category
				</h2>
				<div className="mt-6 grid grid-cols-3 gap-y-6 gap-x-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:gap-x-8">
					{Object.entries(categories).map(([key, category]) => (
						<Link
							to={`products/${key}`}
							key={key}
							className="group flex flex-col items-center justify-center text-center"
						>
							<img
								src={category.image}
								alt={category.name}
								className="h-24 w-24 md:w-40 md:h-40 rounded-full object-center object-cover hover:opacity-100"
							/>
							<div className="text-gray-900">
								<div className="text-xs md:text-sm">
									{category.name}
								</div>
							</div>
							<div className="flex items-center justify-center text-xs text-white rounded-full w-6 h-6 p-3 mx-auto bg-blue-800">
								{category.qty}
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default Categories;
