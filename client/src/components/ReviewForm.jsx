/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReviewForm = ({ data }) => {
	const BASE_URL = import.meta.env.VITE_BASE_URL;
	const { currentUser } = useSelector((state) => state.user);

	const [rating, setRating] = useState(data.rating);
	const [comment, setComment] = useState(data.comment);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleUpdate = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const payload = { rating, comment, productId: data.productId };
			const res = await axios.post(
				`${BASE_URL}/api/reviews/edit/${data.reviewId}`,
				payload,
				{
					headers: {
						Authorization: `Bearer ${currentUser?.accessToken}`,
					},
				}
			);

			if (res.status === 200) {
				data.setProduct({
					...data.product,
					averageRating: res.data.averageRating,
				});
				const updatedReviews = data.reviews.map((review) => {
					if (review._id === data.reviewId) {
						return res.data.review;
					}
					return review;
				});
				data.setReviews(updatedReviews);

				toast("Review updated");
			} else {
				toast.error("Failed to edit review, retry");
			}
		} catch (error) {
			toast.error("Failed to edit review, retry");
			console.error(error);
		} finally {
			data.setShowEditForm(false);
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleUpdate}>
			<div className="mb-5">
				<label className="block text-gray-700 text-base font-bold mb-2">
					Edit Rating
				</label>
				<select
					value={rating}
					onChange={(e) => setRating(e.target.value)}
					required
					className="shadow border border-gray-400 rounded w-full py-2 px-3 text-gray-700  focus:outline-none"
				>
					<option value="">Choose rating...</option>
					<option value="1">1 - Poor</option>
					<option value="2">2 - Fair</option>
					<option value="3">3 - Good</option>
					<option value="4">4 - Great</option>
					<option value="5">5 - Excellent</option>
				</select>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700 text-base font-bold mb-2">
					Edit Comment
				</label>
				<textarea
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					required
					cols="5"
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-gray-200"
				/>
			</div>
			{isSubmitting ? (
				<FaSpinner size={20} className="text-blue-700" />
			) : (
				<button
					type="submit"
					className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					Submit Review
				</button>
			)}
		</form>
	);
};

export default ReviewForm;
