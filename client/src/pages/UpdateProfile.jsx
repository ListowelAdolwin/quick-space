import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import { useSelector, useDispatch } from "react-redux";
//import { logoutUser } from "../redux/features/user/userSlice";
import { categories } from "../data/categories";

function UpdateProfile() {
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [formData, setFormData] = useState({
		vendorName: "",
		vendorFlyer: "",
		email: "",
		contact: "",
		vendorCategory: "",
	});

	const { currentUser } = useSelector((state) => state.user);
	const BASE_URL = import.meta.env.VITE_BASE_URL;
	const params = useParams();
	const { id } = params;
	//const dispatch = useDispatch();
	const navigate = useNavigate();
	const cloudName = import.meta.env.VITE_CLOUDINARY_NAME;
	const apiKey = import.meta.env.VITE_CLOUDINARY_SECRET;
	const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

	useEffect(() => {
		const getUserProfile = async () => {
			const response = await axios.get(
				`${BASE_URL}/api/users/profile/${id}`
			);
			if (response.status === 200) {
				const data = response.data;
				setFormData({
					vendorName: data.vendorName,
					vendorFlyer: data.vendorFlyer,
					email: data.email,
					contact: data.contact,
					vendorCategory: data.vendorCategory,
				});
			} else {
				console.log("Profile response: ", response.data);
			}
		};

		getUserProfile();
	}, []);

	const handleChange = (e) => {
		setIsLoading(false);
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setErrorMessage("");

		// Upload Flyer
		let vendorFlyerUrl;
		if (formData.vendorFlyer) {
		const fileData = new FormData();
		fileData.append("file", formData.vendorFlyer);
		fileData.append("upload_preset", uploadPreset);
		fileData.append("api_key", apiKey);
		fileData.append("timestamp", (Date.now() / 1000) | 0);

		const response = await axios.post(
			`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
			fileData,
			{
				headers: {
					"X-Requested-With": "XMLHttpRequest",
				},
			}
		);

		if (response.status !== 200) {
			toast.error("Failed to upload image. Please retry");
			setIsLoading(false);
			return;
		}

		vendorFlyerUrl = response.data.secure_url;
	}

		const userPayload = {
			vendorName: formData.vendorName,
			vendorFlyerUrl: vendorFlyerUrl,
			email: formData.email,
			contact: formData.contact,
			vendorCategory: formData.vendorCategory,
		};

		try {
			setIsLoading(true);
			const response = await axios.post(
				`${BASE_URL}/api/users/update-profile/${id}`,
				userPayload,
				{
					headers: {
						Authorization: `Bearer ${currentUser?.accessToken}`,
					},
				}
			);
			if (response.status === 200) {
				//dispatch(logoutUser());
				navigate(`/profile/${id}`);
			} else if (response.status === 401) {
				navigate("/login", {state: "Your session has expired, please relogin "});
			} else {
				setErrorMessage(response.data.message);
			}
		} catch (error) {
			setErrorMessage(
				error.response?.data?.message || "An error occurred"
			);
			console.error("Error registering user:", error.response);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex-grow">
				<ToastContainer />
				<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<h1 className="text-3xl font-bold text-blue-800 mb-4">
						Update Profile
					</h1>
					<div className="bg-white p-6 rounded-lg shadow-md">
						{errorMessage && (
							<ErrorMessage errorMessage={errorMessage} />
						)}
						<form onSubmit={handleSubmit}>
							<div className="mb-4">
								<label
									className="block text-gray-700 font-bold mb-2"
									htmlFor="vendorName"
								>
									Business Name
								</label>
								<input
									type="text"
									name="vendorName"
									id="vendorName"
									value={formData.vendorName}
									onChange={handleChange}
									className="bg-gray-200 focus:bg-white text-gray-800 p-2 rounded w-full"
									placeholder="Enter business name"
									required
								/>
							</div>
							<div className="mb-4">
								<label
									className="block text-gray-700 font-bold mb-2"
									htmlFor="email"
								>
									Email
								</label>
								<input
									type="email"
									name="email"
									id="email"
									value={formData.email}
									onChange={handleChange}
									className="bg-gray-200 focus:bg-white text-gray-800 p-2 rounded w-full"
									placeholder="Enter email address"
									required
								/>
							</div>
							<div className="mb-4">
								<label
									className="block text-gray-700 font-bold mb-2"
									htmlFor="contact"
								>
									Phone Number
								</label>
								<input
									type="text"
									name="contact"
									id="contact"
									value={formData.contact}
									onChange={handleChange}
									className="bg-gray-200 focus:bg-white text-gray-800 p-2 rounded w-full"
									placeholder="Enter your contact number"
									required
								/>
							</div>
							<div className="mb-4">
								<label
									className="block text-gray-700 font-bold mb-2"
									htmlFor="vendorCategory"
								>
									Category
								</label>
								<select
									name="vendorCategory"
									id="vendorCategory"
									value={formData.vendorCategory}
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
									htmlFor="image"
								>
									Business Flyer
									<div className="text-xs italic font-light py-1">
										Upload your business flyer. Do not worry
										if it is not available now, you can
										always add it later.
									</div>
								</label>
								<input
									type="file"
									name="vendorFlyer"
									id="vendorFlyer"
									accept="image/*"
									onChange={(e) => {
										setFormData({
											...formData,
											vendorFlyer: e.target.files[0],
										});
									}}
									className="bg-gray-200 focus:bg-white text-gray-800 p-2 rounded w-full"
									placeholder="Upload business flyer"
								/>
							</div>

							{isLoading ? (
								<Spinner />
							) : (
								<div className="mb-4">
									<button
										type="submit"
										className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
									>
										Update
									</button>
								</div>
							)}
						</form>
					</div>
				</div>
			</main>
		</div>
	);
}

export default UpdateProfile;
