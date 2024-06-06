import { useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/features/user/userSlice";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

const Login = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		contact: "",
		password: "",
	});

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { state } = useLocation();

	const BASE_URL = import.meta.env.VITE_BASE_URL;

	const toggleShowPassword = () => {
		setShowPassword((prevState) => !prevState);
	};

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
				if (data.user.isVendor) {
					navigate(`/profile/${data.user._id}`);
				} else {
					navigate("/");
				}
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
					<h1 className="text-3xl font-bold text-blue-800 mb-4">
						Login
					</h1>
					<div className="bg-white p-6 rounded-lg shadow-md">
						{state && (
							<p className="mb-3 text-white bg-red-500 p-2">
								{state}
							</p>
						)}
						{errorMessage && (
							<ErrorMessage errorMessage={errorMessage} />
						)}
						<form onSubmit={handleSubmit}>
							<>
								<div className="mb-4">
									<label
										className="block text-gray-700 font-bold mb-2"
										htmlFor="contact"
									>
										Contact Number
									</label>
									<input
										type="text"
										name="contact"
										id="contact"
										value={formData.contact}
										onChange={handleChange}
										className="bg-gray-200 focus:bg-white text-gray-800 p-2 rounded w-full"
										placeholder="Enter contact"
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
									<div className="relative">
										<input
											type={
												showPassword
													? "text"
													: "password"
											}
											name="password"
											id="password"
											value={formData.password}
											onChange={handleChange}
											className="bg-gray-200 focus:bg-white text-gray-800 p-2 rounded w-full"
											placeholder="Enter password"
											required
										/>
										<button
											type="button"
											onClick={toggleShowPassword}
											className="absolute inset-y-0 right-0 px-4 py-2 text-gray-700"
										>
											{showPassword ? (
												<FaRegEyeSlash size={20} />
											) : (
												<IoMdEye size={20} />
											)}
										</button>
									</div>
								</div>
							</>

							{isLoading ? (
								<Spinner />
							) : (
								<div className="mb-2">
									<button
										type="submit"
										className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
									>
										Login
									</button>
								</div>
							)}
							<div>
								<p className="mb-2">
									Don&apos;t have an account yet?
								</p>
								<Link
									to="/register"
									className="px-2 py-1 border border-blue-500 rounded"
								>
									Register
								</Link>
							</div>
						</form>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Login;
