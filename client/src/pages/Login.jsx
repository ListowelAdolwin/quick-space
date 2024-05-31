import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/features/user/userSlice";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

const Login = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [formData, setFormData] = useState({
		name: "",
		password: "",
	});

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const BASE_URL = import.meta.env.VITE_BASE_URL;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setIsLoading(true);
			const response = await axios.post(
				`${BASE_URL}/api/auth/login`,
				formData
			);
			if (response.status === 200) {
				const data = response.data;
				console.log(data);
				dispatch(loginUser(data.user));
				navigate("/");
			} else {
				setErrorMessage(response.data.message);
			}
			console.log("User login successfully:", response.data);
		} catch (error) {
			setErrorMessage(
				error.response?.data?.message || "An error occurred"
			);
			console.error("Error logging in user:", error.response);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex-grow">
				<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<h1 className="text-3xl font-bold text-gray-800 mb-4">
						Login
					</h1>
					<div className="bg-white p-6 rounded-lg shadow-md">
						{errorMessage && (
							<ErrorMessage errorMessage={errorMessage} />
						)}
						<form onSubmit={handleSubmit}>
							<>
								<div className="mb-4">
									<label
										className="block text-gray-700 font-bold mb-2"
										htmlFor="name"
									>
										Vendor or user name
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
										htmlFor="password"
									>
										Password
									</label>
									<input
										type="password"
										name="password"
										id="password"
										value={formData.password}
										onChange={handleChange}
										className="bg-gray-200 focus:bg-white text-gray-800 p-2 rounded w-full"
										placeholder="Enter password"
										required
									/>
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
										Login
									</button>
								</div>
							)}
						</form>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Login;
