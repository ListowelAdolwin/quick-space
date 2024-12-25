import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../../components/Spinner";
import { useSelector } from "react-redux";
import ReactGA from "react-ga4";

const AddCategory = () => {
		ReactGA.send({
			hitType: "pageview",
			page: "/admin/add-category",
			title: "Add Category Page",
		});
	const [isLoading, setIsLoading] = useState(false);
	const [displayName, setDisplayName] = useState("");
	const [val, setVal] = useState("");
	const [image, setImage] = useState(null);

	const BASE_URL = import.meta.env.VITE_BASE_URL;
	const {currentUser} = useSelector((state) => state.user)

	const cloudName = import.meta.env.VITE_CLOUDINARY_NAME;
	const apiKey = import.meta.env.VITE_CLOUDINARY_SECRET;
	const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const fileData = new FormData();
			fileData.append("file", image);
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

      if (response.status !== 200){
        toast.error("Failed to upload image. Please retry");
        setIsLoading(false);
        return;
      }

			const url = response.data.secure_url;

			const res = await axios.post(
				`${BASE_URL}/api/categories/add`,
				{
					displayName,
					val,
					imageUrl: url,
				},
				{
					headers: {
						Authorization: `Bearer ${currentUser?.accessToken}`,
					},
				}
			);
      if (res.status !== 201){
        toast.error("Sever error: Could not add category. Please retry")
        setIsLoading(false);
        return
      }
			setIsLoading(false);
      toast("Category Added Successfully!");
		} catch (error) {
			setIsLoading(false);
      toast.error("Failed to add category. Please retry");
			console.error("Error adding category:", error);
		}
	};

	return (
		<div className="flex flex-col min-h-screen">
			<ToastContainer />
			<main className="flex-grow">
				<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<h1 className="text-3xl font-bold text-gray-800 mb-4">
						Add Category
					</h1>
					<div className="bg-white p-6 rounded-lg shadow-md">
						<form onSubmit={handleSubmit}>
							<div className="mb-4">
								<label
									className="block text-gray-700 font-bold mb-2"
									htmlFor="displayName"
								>
									Display Name
								</label>
								<input
									type="text"
									name="displayName"
									id="displayName"
									value={displayName}
									onChange={(e) => {
										setDisplayName(e.target.value);
									}}
									className="bg-gray-200 focus:bg-white text-gray-800 p-2 rounded w-full"
									placeholder="Enter display name"
									required
								/>
							</div>
							<div className="mb-4">
								<label
									className="block text-gray-700 font-bold mb-2"
									htmlFor="val"
								>
									Value
									<div className="text-xs italic font-normal">
										Name that would be stored in the
										database. Usually small case with
										hyphens in place of spaces
									</div>
								</label>
								<input
									type="text"
									name="val"
									id="val"
									value={val}
									onChange={(e) => {
										setVal(e.target.value);
									}}
									className="bg-gray-200 focus:bg-white text-gray-800 p-2 rounded w-full"
									placeholder="Enter value"
									required
								/>
							</div>
							<div className="mb-4">
								<label
									className="block text-gray-700 font-bold mb-2"
									htmlFor="image"
								>
									Image
								</label>
								<input
									type="file"
									name="image"
									id="image"
									accept="image/*"
									onChange={(e) => {
										setImage(e.target.files[0]);
									}}
									className="bg-gray-200 focus:bg-white text-gray-800 p-2 rounded w-full"
									placeholder="Upload banner category"
									required
								/>
							</div>
							<div className="mb-4">
								{isLoading ? (
									<Spinner />
								) : (
									<button
										type="submit"
										className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
									>
										Add Category
									</button>
								)}
							</div>
						</form>
					</div>
				</div>
			</main>
		</div>
	);
};

export default AddCategory;
