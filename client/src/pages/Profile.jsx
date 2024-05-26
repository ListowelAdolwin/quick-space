import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { logoutUser } from "../redux/features/user/userSlice";
import { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = () => {
	const [userData, setUserData] = useState(null);

	const user = {
		name: "John Doe",
		email: "john.doe@example.com",
		phone: "123-456-7890",
		school: "School 1",
		profilePicture: "https://via.placeholder.com/150",
	};

	const postedProducts = [
		{
			id: 1,
			name: "Product 1",
			price: "$99.99",
			image: "https://via.placeholder.com/150",
		},
		{
			id: 2,
			name: "Product 2",
			price: "$149.99",
			image: "https://via.placeholder.com/150",
		},
		{
			id: 3,
			name: "Product 3",
			price: "$199.99",
			image: "https://via.placeholder.com/150",
		},
	];

	const { currentUser } = useSelector((state) => state.user);
	const BASE_URL = import.meta.env.VITE_BASE_URL;

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const params = useParams();
	const id = params.id;

	useEffect(() => {
		const getUserProfile = async () => {
			const response = await axios.get(
				`${BASE_URL}/api/users/profile/${id}`,
				{
					headers: {
						Authorization: `Bearer ${currentUser?.accessToken}`,
					},
				}
			);
			if (response.status === 200) {
				setUserData(response.data);
				console.log("Profile response: ", response.data);
			} else {
				console.log("Profile response: ", response.data);
			}
		};

		getUserProfile();
	}, []);

	const logout = async () => {
		dispatch(logoutUser());
		navigate("/");
	};

	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex-grow">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<h1 className="text-3xl font-bold text-gray-800 mb-4">
						User Profile
					</h1>
					{userData && (
						<div className="flex flex-wrap items-start justify-between gap-5 bg-white p-6 rounded-lg shadow-md">
							<div className="lg:basis-3/12 flex flex-col gap-4 text-start">
								<p className="text-2xl font-semibold text-gray-800">
									{userData.username}
								</p>
								<p className="text-gray-600">
									{userData.email}
								</p>
								<p className="text-gray-600">{user.phone}</p>
								<p className="text-gray-600">
									School: {user.school}
								</p>
								<div className="flex gap-2">
									<button
										onClick={logout}
										className="mt-4 bg-red-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
									>
										Logout
									</button>
									<Link
										to={`/update-profile/${userData._id}`}
										className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
									>
										Update Profile
									</Link>
								</div>
							</div>

							<div className="lg:basis-8/12">
								<h2 className="text-2xl font-semibold text-gray-800 mb-4">
									Catalogue
								</h2>
								<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
									{postedProducts.map((product) => (
										<div
											key={product.id}
											className="bg-gray-100 p-4 rounded-lg shadow-md"
										>
											<img
												src={product.image}
												alt={product.name}
												className="w-full h-56 object-cover object-center"
											/>
											<div className="mt-4">
												<h3 className="text-xl font-semibold text-gray-800">
													{product.name}
												</h3>
												<p className="text-gray-600 mt-2">
													{product.price}
												</p>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					)}
				</div>
			</main>
		</div>
	);
};

export default UserProfile;
