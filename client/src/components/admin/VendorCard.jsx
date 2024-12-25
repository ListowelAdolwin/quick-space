/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../Spinner";
import { useSelector } from "react-redux";

const VendorCard = ({ initialVendor }) => {
	const [vendor, setVendor] = useState(initialVendor);
	const [isLoading, setIsLoading] = useState(false);
	const BASE_URL = import.meta.env.VITE_BASE_URL;
	const { currentUser } = useSelector((state) => state.user);

	console.log(initialVendor)

	const handleVerifyVendor = async (id) => {
		setIsLoading(true);
		try {
			const response = await axios.get(
				`${BASE_URL}/api/users/verify-unverify/${id}`,
				{
					headers: {
						Authorization: `Bearer ${currentUser?.accessToken}`,
					},
				}
			);
			if (response.status === 200) {
				toast(response.data.message);
				setVendor((prevVendor) => ({
					...prevVendor,
					isVerified: !prevVendor.isVerified,
				}));
			} else {
				toast.error("Could not verify vendor. Please try again.");
			}
		} catch (error) {
			console.error("Error verifying/unverifying vendor:", error);
			toast.error("Could not verify vendor. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="bg-white shadow-md rounded-lg p-4 mb-4">
			<h3 className="text-lg font-semibold mb-2">{vendor.vendorName}</h3>
			<p className="text-gray-600 mb-1">
				Contact: {vendor.contact}
			</p>
			<p className="text-gray-600 mb-2">Email: {vendor.email}</p>
			<p className="text-gray-600 mb-4 font-bold">
				Status:{" "}
				{vendor.isVerified ? (
					<span>Verified</span>
				) : (
					<span className="text-red-500">Not Verified</span>
				)}
			</p>
			<div className="flex justify-between">
				{isLoading ? (
					<Spinner />
				) : (
					<button
						onClick={() => handleVerifyVendor(vendor._id)}
						className="bg-green-500 text-white py-2 px-4 rounded hover:opacity-85"
						disabled={isLoading}
					>
						{vendor.isVerified ? (
							<span>Unverify Vendor</span>
						) : (
							<span>Verify Vendor</span>
						)}
					</button>
				)}
				<Link
					to={`/profile/${vendor._id}`}
					className="bg-blue-500 text-white py-2 px-4 rounded hover:opacity-85"
					title={`View ${vendor.vendorName}'s profile`}
				>
					View Profile
				</Link>
			</div>
		</div>
	);
};

export default VendorCard;
