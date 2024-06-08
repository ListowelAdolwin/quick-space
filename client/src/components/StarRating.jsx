// src/components/StarRating.jsx

import React from "react";

const StarRating = ({ rating }) => {
	const totalStars = 5;

	const getStarType = (index) => {
		if (index + 1 <= rating) {
			return fullStar;
		}
		if (index < rating && rating < index + 1) {
			const percentage = (rating - index) * 100;
			return (
				<div className="relative w-5 h-5">
					<svg
						aria-hidden="true"
						className="absolute top-0 left-0 text-yellow-500"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						style={{
							clipPath: `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`,
						}}
					>
						<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
					</svg>
					<svg
						aria-hidden="true"
						className="absolute top-0 left-0 text-gray-300"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						style={{
							clipPath: `polygon(${percentage}% 0, 100% 0, 100% 100%, ${percentage}% 100%)`,
						}}
					>
						<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
					</svg>
				</div>
			);
		}
		return emptyStar;
	};

	const fullStar = (
		<svg
			aria-hidden="true"
			className="h-5 w-5 text-yellow-500"
			fill="currentColor"
			viewBox="0 0 20 20"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
		</svg>
	);

	const emptyStar = (
		<svg
			aria-hidden="true"
			className="h-5 w-5 text-gray-300"
			fill="currentColor"
			viewBox="0 0 20 20"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
		</svg>
	);

	return (
		<div className="flex items-center">
			{[...Array(totalStars)].map((_, index) => (
				<span key={index}>{getStarType(index)}</span>
			))}
			<span className="text-white mr-2 ml-3 rounded bg-yellow-600 px-2.5 py-0.5 text-xs font-semibold">
				{rating.toFixed(1)}
			</span>
		</div>
	);
};

export default StarRating;
