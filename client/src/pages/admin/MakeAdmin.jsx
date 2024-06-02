import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner";

const MakeAdmin = () => {
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const BASE_URL = import.meta.env.VITE_BASE_URL;
	const { currentUser } = useSelector((state) => state.user);

	const handleMakeAdmin = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const response = await axios.get(
				`${BASE_URL}/api/users/make-admin/${email}`,
				{
					headers: {
						Authorization: `Bearer ${currentUser?.accessToken}`,
					},
				}
			);
			setMessage(response.data.message);
			setError("");
			console.log(response.data);
			setIsLoading(false);
		} catch (error) {
			if (error.response?.status === 404) {
				setError(error.response.data.message);
			} else {
				setError(
					"Could not make user admin. Verify that you entered the right name"
				);
			}
			setMessage("");
			setIsLoading(false);
			console.log(error.response.data);
		}
	};

	return (
		<div className="my-10 mx-auto pb-80 flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
				<h2 className="text-2xl font-semibold mb-2 text-center">
					Make User Admin
				</h2>
				<p className="py-3">
					Enter the email (Email used to register their account) of
					the user you want to make admin
				</p>
				{message && <p className="mb-2 text-green-500">{message}</p>}
				{error && <p className="mb-2 text-red-500">{error}</p>}
				<form onSubmit={handleMakeAdmin}>
					<div className="mb-4">
						<input
							type="email"
							placeholder="Enter user email"
							value={email}
							onChange={(e) => {
								setIsLoading(false);
								setEmail(e.target.value);
							}}
							className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>
					{isLoading ? (
						<Spinner />
					) : (
						<button
							type="submit"
							className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							Make Admin
						</button>
					)}
				</form>
			</div>
		</div>
	);
};

export default MakeAdmin;
