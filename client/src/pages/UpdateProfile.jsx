import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/features/user/userSlice";
import { categories } from "../data/categories";

function UpdateProfile() {
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		vendorContact: "",
		vendorCategory: "",
	});

	const { currentUser } = useSelector((state) => state.user);
	const BASE_URL = import.meta.env.VITE_BASE_URL;
	const params = useParams();
	const { id } = params;
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const getUserProfile = async () => {
			const response = await axios.get(
				`${BASE_URL}/api/users/profile/${id}`
			);
			if (response.status === 200) {
				const data = response.data;
				setFormData({
					name: data.name,
					email: data.email,
					vendorContact: data.vendorContact,
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

		const userPayload = {
			name: formData.name,
			email: formData.email,
			vendorContact: formData.vendorContact,
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
			console.log("Profile Updated successfully:", response);
			if (response.status === 200) {
				dispatch(logoutUser());
				navigate("/login");
			} else if (response.status === 401) {
				navigate("/login");
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
									htmlFor="name"
								>
									Name
								</label>
								<input
									type="text"
									name="name"
									id="name"
									value={formData.name}
									onChange={handleChange}
									className="bg-gray-200 focus:bg-white text-gray-800 p-2 rounded w-full"
									placeholder="Enter name"
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
							<>
								<div className="mb-4">
									<label
										className="block text-gray-700 font-bold mb-2"
										htmlFor="contact"
									>
										Phone Number
									</label>
									<input
										type="text"
										name="vendorContact"
										id="contvendorContactact"
										value={formData.vendorContact}
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
										<option value="">
											Select Category
										</option>
										{Object.entries(categories).map(
											([key, category]) => (
												<option key={key} value={key}>
													{category.name}
												</option>
											)
										)}
									</select>
								</div>
							</>

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
