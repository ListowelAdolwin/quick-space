import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { FaRegEyeSlash } from "react-icons/fa";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import { schools } from "../data/schools";
import { categories } from "../data/categories";

const Register = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [otherSchool, setOtherSchool] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [userType, setUserType] = useState("normal");
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		vendorContact: "",
		vendorCategory: "",
		vendorAddress: "",
		school: "",
		otherSchool: "",
	});

	const navigate = useNavigate();

	const BASE_URL = import.meta.env.VITE_BASE_URL;


	const toggleShowPassword = () => {
		setShowPassword((prevState) => !prevState);
	};

	const handleChange = (e) => {
		setIsLoading(false);
		let { name, value } = e.target;
		if (name === "school" && value == "other") {
			setOtherSchool(true);
		} else if (name !== "otherSchool") {
			setOtherSchool(false);
		}
		setFormData({ ...formData, [name]: value });
	};

	const handleUserTypeChange = (type) => {
		setIsLoading(false);
		setUserType(type);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setErrorMessage("");

		let userPayload = {
			name: formData.name,
			email: formData.email,
			password: formData.password,
			isVendor: userType === "vendor",
			school: formData.otherSchool
				? formData.otherSchool
				: formData.school,
		};

		if (userType === "vendor") {
			userPayload = {
				...userPayload,
				vendorContact: formData.vendorContact,
				vendorCategory: formData.vendorCategory,
				vendorAddressa: formData.vendorAddress,
			};
		}
		console.log(userPayload);

		try {
			setIsLoading(true);
			const response = await axios.post(
				`${BASE_URL}/api/auth/register`,
				userPayload
			);
			if (response.status === 201) {
				navigate("/login");
			} else {
				setErrorMessage(response.data.message);
			}
			console.log("User registered successfully:", response.data);
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
				<div className="max-w-3xl mx-auto px-0 sm:px-6 lg:px-8 py-8">
					<h1 className="text-3xl font-bold text-gray-800 mb-4 px-4">
						Register
					</h1>
					<div className="bg-white p-6 rounded-lg shadow-md">
						<div className="mb-6">
							<button
								className={`mr-4 py-2 px-4 rounded ${
									userType === "normal"
										? "bg-blue-600 text-white"
										: "bg-gray-200 text-gray-800"
								}`}
								onClick={() => handleUserTypeChange("normal")}
							>
								Register as buyer
							</button>
							<button
								className={`py-2 px-4 rounded ${
									userType === "vendor"
										? "bg-blue-600 text-white"
										: "bg-gray-200 text-gray-800"
								}`}
								onClick={() => handleUserTypeChange("vendor")}
							>
								Register as Business
							</button>
						</div>
						{errorMessage && (
							<ErrorMessage errorMessage={errorMessage} />
						)}
						<form onSubmit={handleSubmit}>
							{userType === "normal" ? (
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
							) : (
								<div className="mb-4">
									<label
										className="block text-gray-700 font-bold mb-2"
										htmlFor="vendorName"
									>
										Business Name
									</label>
									<input
										type="text"
										name="name"
										id="name"
										value={formData.name}
										onChange={handleChange}
										className="bg-gray-200 focus:bg-white text-gray-800 p-2 rounded w-full"
										placeholder="Enter business name here"
										required
									/>
								</div>
							)}
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
									htmlFor="school"
								>
									School
								</label>
								<select
									name="school"
									id="school"
									value={formData.school}
									onChange={handleChange}
									className="bg-gray-200 focus:bg-white text-gray-800 p-2 rounded w-full"
									required
								>
									<option value="">Select school</option>
									{Object.entries(schools).map(
										([key, school]) => (
											<option key={key} value={key}>
												{school}
											</option>
										)
									)}
								</select>
							</div>
							{otherSchool && (
								<div className="mb-4 ms-5">
									<label
										className="block text-gray-700 font-bold mb-2"
										htmlFor="other-school"
									>
										Please enter school name here
									</label>
									<input
										type="text"
										name="otherSchool"
										id="other-school"
										value={formData.otherSchool}
										onChange={handleChange}
										className="bg-gray-200 focus:bg-white text-gray-800 p-2 rounded w-full"
										placeholder="Enter your school name here (Abbreviated)"
										required
									/>
								</div>
							)}
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
											showPassword ? "text" : "password"
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

							{userType === "vendor" && (
								<>
									<div className="mb-4">
										<label
											className="block text-gray-700 font-bold mb-2"
											htmlFor="vendorContact"
										>
											Phone Number
										</label>
										<input
											type="text"
											name="vendorContact"
											id="vendorContact"
											value={formData.vendorContact}
											onChange={handleChange}
											className="bg-gray-200 focus:bg-white text-gray-800 p-2 rounded w-full"
											placeholder="Enter your vendor contact number"
											required
										/>
									</div>
									<div className="mb-4">
										<label
											className="block text-gray-700 font-bold mb-2"
											htmlFor="vendorCategory"
										>
											Products Category{" "}
											<div className="text-xs italic font-light py-1">
												Select the category your
												products fall under
											</div>
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
													<option
														key={key}
														value={key}
													>
														{category.name}
													</option>
												)
											)}
										</select>
									</div>
								</>
							)}

							{isLoading ? (
								<Spinner />
							) : (
								<div className="mb-2">
									<button
										type="submit"
										className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
									>
										Register
									</button>
								</div>
							)}
							<div>
								<p className="mb-2">Already have an account?</p>
								<Link
									to="/login"
									className="px-2 py-1 border border-blue-500 rounded"
								>
									Login
								</Link>
							</div>
						</form>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Register;
