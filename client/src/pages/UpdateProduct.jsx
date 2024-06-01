import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { categories } from "../data/categories";
import ErrorMessage from "../components/ErrorMessage";
import Spinner from "../components/Spinner";

// check if the image is of the correct type
// if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
// 	// create a new form instance

// } else {
// 	alert("A jpeg/png file could not be found");
// }

const UpdateProduct = () => {
	const [errorMessage, setErrowMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		itemName: "",
		price: "",
		discount: 0,
		category: "",
		description: "",
		images: [],
		imageUrls: [],
	});

	const { currentUser } = useSelector((state) => state.user);
	const navigate = useNavigate();
	const params = useParams();
	const { id } = params;

	const BASE_URL = import.meta.env.VITE_BASE_URL;

	const cloudName = import.meta.env.VITE_CLOUDINARY_NAME;
	const apiKey = import.meta.env.VITE_CLOUDINARY_SECRET;
	const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

	useEffect(() => {
		const getOldProduct = async () => {
			const response = await axios.get(`${BASE_URL}/api/products/${id}`);
			if (response.status === 200) {
				const data = response.data;
        console.log(data)
				setFormData({
					itemName: data.name,
					price: data.price,
					discount: data.discount,
					category: data.category,
					description: data.description,
					images: [],
					imageUrls: data.imageUrls,
				});
			} else {
        setErrowMessage('Product not found')
				console.log("Profile response error: ", response.data);
			}
		};

		getOldProduct();
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleFileChange = (e) => {
		setFormData({ ...formData, images: Array.from(e.target.files) });
		setIsLoading(false);
		setErrowMessage("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrowMessage("");
		setIsLoading(true);

		try {
			const uploaders = formData.images.map((image) => {
				const fileData = new FormData();
				fileData.append("file", image);
				fileData.append("upload_preset", uploadPreset);
				fileData.append("api_key", apiKey);
				fileData.append("timestamp", (Date.now() / 1000) | 0);

				return axios
					.post(
						`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
						fileData,
						{
							headers: {
								"X-Requested-With": "XMLHttpRequest",
							},
						}
					)
					.then((response) => response.data.secure_url);
			});

			const urls = await axios.all(uploaders);

			setFormData({ ...formData, imageUrls: urls });

			const productData = {
				name: formData.itemName,
				price: formData.price,
				discount: formData.discount,
				category: formData.category,
				description: formData.description,
				imageUrls: formData.imageUrls.concat(urls),
				vendor: currentUser._id,
			};

			console.log(productData)

			const saveProductResponse = await axios.post(
				`${BASE_URL}/api/products/update/${id}`,
				productData,
				{
					headers: {
						Authorization: `Bearer ${currentUser?.accessToken}`,
					},
				}
			);
			if (saveProductResponse.status === 200) {
				navigate(`/product/${id}`);
			} else {
				setErrowMessage(saveProductResponse.message);
			}
			setIsLoading(false);
			console.log("Product saved:", saveProductResponse.data);
		} catch (error) {
			setErrowMessage("Error uploading images. Please retry");
			setIsLoading(false);
			console.error("Error uploading images:", error);
		}
	};

	return (
		<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<h1 className="text-3xl font-bold text-gray-800 mb-4">
				Add Product
			</h1>
			{errorMessage && <ErrorMessage errorMessage={errorMessage} />}
			<div className="bg-white p-6 rounded-lg shadow-md">
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							className="block text-gray-700 font-bold mb-2"
							htmlFor="itemName"
						>
							Product Name
						</label>
						<input
							type="text"
							name="itemName"
							id="itemName"
							value={formData.itemName}
							onChange={handleChange}
							className="bg-gray-200 focus:bg-white text-gray-800 p-2 rounded w-full"
							placeholder="Enter product name"
							required
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 font-bold mb-2"
							htmlFor="price"
						>
							Price
						</label>
						<input
							type="number"
							name="price"
							id="price"
							value={formData.price}
							onChange={handleChange}
							className="bg-gray-200 focus:bg-white text-gray-800 p-2 rounded w-full"
							placeholder="Enter product price"
							required
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 font-bold mb-2"
							htmlFor="discount"
						>
							Discount
							<div className="text-xs italic font-light py-1">
								Want to offer a discount? How much discount?
							</div>
						</label>
						<input
							type="number"
							name="discount"
							id="discount"
							value={formData.discount}
							onChange={handleChange}
							className="bg-gray-200 focus:bg-white text-gray-800 p-2 rounded w-full"
							placeholder="Enter product discount"
							required
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 font-bold mb-2"
							htmlFor="category"
						>
							Category
						</label>
						<select
							name="category"
							id="category"
							value={formData.category}
							onChange={handleChange}
							className="bg-gray-200 focus:bg-white text-gray-800 p-2 rounded w-full"
							required
						>
							<option value="">Select Category</option>
							{Object.entries(categories).map(
								([key, category]) => (
									<option key={key} value={key}>
										{category.name}
									</option>
								)
							)}
						</select>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 font-bold mb-2"
							htmlFor="description"
						>
							Product description
							<div className="text-xs italic font-light py-1">
								Add some description to help buyers better
								understand the product
							</div>
						</label>
						<textarea
							name="description"
							id="description"
							value={formData.description}
							onChange={handleChange}
							className="bg-gray-200 focus:bg-white text-gray-800 p-2 rounded w-full"
							placeholder="Enter product description"
						></textarea>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 font-bold mb-2"
							htmlFor="images"
						>
							Images
						</label>
						<input
							type="file"
							name="images"
							id="images"
							multiple
							accept="image/*"
							onChange={handleFileChange}
							className="bg-gray-200 focus:bg-white text-gray-800 p-2 rounded w-full"
							placeholder="Upload product images"
						/>
					</div>
					{isLoading ? (
						<Spinner />
					) : (
						<div className="mb-3">
							<button
								type="submit"
								className="px-3 py-2 min-w-[120px] text-center text-white bg-blue-600 border border-blue-600 rounded active:text-blue-500 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring"
							>
								Update Product
							</button>
						</div>
					)}
				</form>
			</div>
		</div>
	);
};

export default UpdateProduct;