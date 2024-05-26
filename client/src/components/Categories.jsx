import { Link } from "react-router-dom";
import { categories } from "../data/categories";

const Categories = () => {
	return (
		<div className="bg-gray-50 py-16">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<h2 className="text-2xl font-bold text-gray-800">
					Shop by Category
				</h2>
				<div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
					{categories.map((category) => (
						<Link
							to={`products/${category.val}`}
							key={category.val}
							className="group relative"
						>
							<div className="relative w-full h-72 bg-gray-200 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80">
								<img
									src={category.image}
									alt={category.name}
									className="w-full h-full object-center object-cover"
								/>
							</div>
							<div className="flex items-center gap-2 text-blue-900 bg-white p-3 absolute top-3/4 left-0 font-thin">
								<div className="font-bold">{category.name}</div>
								<div className="flex items-center justify-center text-xs text-white rounded-full w-6 h-6 mx-auto bg-blue-800">
									{category.qty}
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
