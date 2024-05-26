import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
//import { products } from "../data/products";
import { Link } from "react-router-dom";
import axios from "axios";

const FeaturedProductsCarousel = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [itemsPerView, setItemsPerView] = useState(1);
	const [products, setProducts] = useState([]);

	const BASE_URL = import.meta.env.VITE_BASE_URL;

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 1024) {
				setItemsPerView(7);
			} else if (window.innerWidth >= 768) {
				setItemsPerView(5);
			} else {
				setItemsPerView(3);
			}
		};

		window.addEventListener("resize", handleResize);
		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		const getFeaturedProducts = async () => {
			const response = await axios.get(
				`${BASE_URL}/api/products/featured`
			);
			if (response.status === 200) {
				setProducts(response.data);
				console.log("Featured response: ", response);
			} else {
				console.log("Featured response: ", response);
			}
		};

		getFeaturedProducts();
	}, []);

	const handleNext = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === products.length - itemsPerView ? 0 : prevIndex + 1
		);
	};

	const handlePrev = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? products.length - itemsPerView : prevIndex - 1
		);
	};

	return (
		<div className="relative w-full max-w-7xl mx-auto py-16">
			<h1 className="text-3xl font-bold ml-3">Featured Products</h1>
			<div className="overflow-x-auto scrollbar-hide">
				<div
					className="flex transition-transform duration-300"
					style={{
						transform: `translateX(-${
							(currentIndex * 100) / itemsPerView
						}%)`,
						width: `${100 * (10 / itemsPerView)}%`,
					}}
				>
					{products.map((product, index) => (
						<Link
							to={`/product/${product._id}`}
							key={index}
							className="w-full p-4 flex-shrink-0"
							style={{ flex: `0 0 ${100 / itemsPerView}%` }}
						>
							<div className="bg-white p-6 rounded-lg shadow-md">
								<img
									src={product.imageUrls[0]}
									alt={product.name}
									className="w-full h-40 object-contain mb-4"
								/>
								<h2 className="text-lg font-semibold line-clamp-1">
									{product.name}
								</h2>
								<p className="text-gray-600">
									₵{product.price}
								</p>
							</div>
						</Link>
					))}
				</div>
			</div>
			<button
				onClick={handlePrev}
				className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
			>
				<FiChevronLeft size={24} />
			</button>
			<button
				onClick={handleNext}
				className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
			>
				<FiChevronRight size={24} />
			</button>
		</div>
	);
};

export default FeaturedProductsCarousel;
