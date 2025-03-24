import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import VendorCard from "../../components/admin/VendorCard";
import { useSelector } from "react-redux";
import ReactGA from "react-ga4";
import { schools } from "../../data/schools";

const Vendors = () => {
	ReactGA.send({
		hitType: "pageview",
		page: "/admin/vendors",
		title: "Manage Businesses Page",
	});
	const [vendors, setVendors] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [school, setSchool] = useState("all")

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

	const handleSchoolChange = (event) => {
		setSchool(event.target.value)
	}

	let filteredVendors = vendors.filter((vendor) =>
		vendor.vendorName.toLowerCase().includes(searchTerm.toLowerCase())
	);

	filteredVendors = filteredVendors.filter((vendor) => {
		if (school === "all") {
			return true;
		}
		if (school === "other") {
			return !Object.keys(schools).some(key => vendor.school.toLowerCase() === key.toLowerCase());
		}
		return vendor.school.toLowerCase().includes(school.toLowerCase());
	});




	return (
		<div className="container mx-auto p-4 min-h-screen">
			<h1 className="text-2xl font-bold mb-6">Vendors</h1>
			<div className="sm:w-1/2 sm:flex justify-start gap-2">
				<div className="mb-4 w-full sm:w-1/2">
					<input
						type="text"
						placeholder="Search vendors..."
						value={searchTerm}
						onChange={handleSearchChange}
						className="p-2 border border-blue-300 rounded w-full focus:bg-white focus:outline-none"
					/>
				</div>
				<div className="mb-4 w-full sm:w-1/2">
					<select
						name="school"
						id="school"
						value={school}
						onChange={handleSchoolChange}
						className="p-2.5 border border-blue-300 text-gray-600 rounded w-full focus:bg-white focus:outline-none"
						required
					>
						<option value="">
							Select school
						</option>
						{Object.entries(schools).map(
							([key, school]) => (
								<option
									key={key}
									value={key}
									className="text-sm"
								>
									{school}
								</option>
							)
						)}
					</select>
				</div>
			</div>

			<div className="mb-3"><span className="font-bold">{filteredVendors && filteredVendors.length}</span> vendors found</div>
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
