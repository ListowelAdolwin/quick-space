import axios from "axios";
import { useSelector } from "react-redux";

const useFavorites = () => {
	const BASE_URL = import.meta.env.VITE_BASE_URL;
	const { currentUser } = useSelector((state) => state.user);
    
	const addToFavorites = async (productId) => {
		try {
			const response = await axios.post(
				`${BASE_URL}/api/products/favorites/add`,
				{ productId },
				{
					headers: {
						Authorization: `Bearer ${currentUser?.accessToken}`,
					},
				}
			);
			return response.data;
		} catch (error) {
			console.error("Error adding to favorites:", error);
			throw error;
		}
	};

	const removeFromFavorites = async (productId) => {
		try {
			const response = await axios.post(
				`${BASE_URL}/api/products/favorites/remove`,
				{ productId },
				{
					headers: {
						Authorization: `Bearer ${currentUser?.accessToken}`,
					},
				}
			);
			return response.data;
		} catch (error) {
			console.error("Error removing from favorites:", error);
			throw error;
		}
	};

	return { addToFavorites, removeFromFavorites };
};

export default useFavorites;
