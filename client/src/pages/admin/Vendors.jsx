import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import VendorCard from "../../components/admin/VendorCard";
import { useSelector } from "react-redux";
import ReactGA from "react-ga4";

const Vendors = () => {
		ReactGA.send({
			hitType: "pageview",
			page: "/admin/vendors",
			title: "Manage Businesses Page",
		});
	const [vendors, setVendors] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const BASE_URL = import.meta.env.VITE_BASE_URL;
	const { currentUser } = useSelector((state) => state.user);

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

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const filteredVendors = vendors.filter((vendor) =>
		vendor.vendorName.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-6">Vendors</h1>
			<div className="mb-4">
				<input
					type="text"
					placeholder="Search vendors..."
					value={searchTerm}
					onChange={handleSearchChange}
					className="p-2 border border-gray-300 rounded w-full"
				/>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				{filteredVendors &&
					filteredVendors.map((vendor) => (
						<VendorCard key={vendor._id} initialVendor={vendor} vendors={vendors} setVendors={setVendors} />
					))}
			</div>
		</div>
	);
};

export default Vendors;
