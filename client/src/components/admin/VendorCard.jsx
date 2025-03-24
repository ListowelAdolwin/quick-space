/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../Spinner";
import { useSelector } from "react-redux";

// Confirmation Modal Component
const ConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
			<div className="bg-white p-6 rounded-lg shadow-md">
				<h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
				<p className="text-gray-600 mb-4">This action will permanently delete the vendor. Do you want to continue?</p>
				<div className="flex justify-end space-x-4">
					<button
						onClick={onCancel}
						className="bg-gray-500 text-white py-2 px-4 rounded hover:opacity-85"
					>
						Cancel
					</button>
					<button
						onClick={onConfirm}
						className="bg-red-500 text-white py-2 px-4 rounded hover:opacity-85"
					>
						Confirm
					</button>
				</div>
			</div>
		</div>
	);
};

const VendorCard = ({ initialVendor, setVendors, vendors }) => {
	const [vendor, setVendor] = useState(initialVendor);
	const [isLoading, setIsLoading] = useState(false);
	const [isDeleteLoading, setIsDeleteLoading] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [vendorToDelete, setVendorToDelete] = useState(null);
	const BASE_URL = import.meta.env.VITE_BASE_URL;
	const { currentUser } = useSelector((state) => state.user);

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

	const handleDeleteVendor = async (id) => {
		setIsDeleteLoading(true);
		try {
			await axios.delete(`${BASE_URL}/api/users/delete/${id}`, {
				headers: {
					Authorization: `Bearer ${currentUser?.accessToken}`,
				},
			});
			setVendors(vendors.filter((vendor) => vendor._id !== id));
			toast.success("Vendor deleted successfully");
			setIsModalOpen(false);
		} catch (error) {
			toast.error("Error deleting vendor");
		} finally {
			setIsDeleteLoading(false);
			setIsModalOpen(false);
		}
	};

	// Open the modal and store the vendor ID to delete
	const openDeleteModal = (id) => {
		setVendorToDelete(id);
		setIsModalOpen(true);
	};

	// Close the modal without doing anything
	const closeModal = () => {
		setIsModalOpen(false);
		setVendorToDelete(null);
	};

	return (
		<div className="bg-white shadow-md rounded-lg p-4 mb-4">
			<h3 className="text-lg font-semibold mb-2">{vendor.vendorName}</h3>
			<p className="text-gray-600 mb-1">
				Contact: {vendor.contact}
			</p>
			<p className="text-gray-600 mb-2">Email: {vendor.email}</p>
			<p className="text-gray-600 mb-2">School: {vendor.school}</p>
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
							<span>Unverify</span>
						) : (
							<span>Verify</span>
						)}
					</button>
				)}
				<Link
					to={`/profile/${vendor._id}`}
					className="bg-blue-500 text-white py-2 px-4 rounded hover:opacity-85"
					title={`View ${vendor.vendorName}'s profile`}
				>
					View profile
				</Link>
			
				{isDeleteLoading ? (
					<Spinner />
				) : (
					<button
						onClick={() => openDeleteModal(vendor._id)} // Open modal on click
						className="bg-red-500 text-white py-2 px-4 rounded hover:opacity-85"
					>
						Delete
					</button>
				)}
			</div>

			{/* Confirmation Modal */}
			<ConfirmationModal
				isOpen={isModalOpen}
				onConfirm={() => handleDeleteVendor(vendorToDelete)} // Call delete on confirmation
				onCancel={closeModal} // Close modal without action
			/>
		</div>
	);
};

export default VendorCard;
