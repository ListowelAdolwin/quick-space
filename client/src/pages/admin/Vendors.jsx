import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import VendorCard from "../../components/admin/VendorCard";
import { useSelector } from "react-redux";

const Vendors = () => {
	const [vendors, setVendors] = useState([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL
	const {currentUser} = useSelector((state) => state.user)

	useEffect(() => {
		const fetchVendors = async () => {
			try {
				const response = await axios.get(`${BASE_URL}/api/users`, {
					headers: {
						Authorization: `Bearer ${currentUser?.accessToken}`,
					},
				});
				setVendors(response.data);
			} catch (error) {
				console.error("Error fetching vendors:", error);
			}
		};

		fetchVendors();
	}, []);


	return (
		<div className="container mx-auto p-4">
			<ToastContainer />
			<h1 className="text-2xl font-bold mb-6">Vendors</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				{vendors &&
					vendors.map((vendor) => (
						<VendorCard key={vendor._id} initialVendor={vendor} />
					))}
			</div>
		</div>
	);
};

export default Vendors;
