import { Link } from "react-router-dom";
import ReactGA from "react-ga4";

const AdminHome = () => {
	ReactGA.send({
		hitType: "pageview",
		page: "/admin/home",
		title: "Admin HomePage",
	});
	return (
		<div className="min-h-screen bg-gray-100 p-2 sm:p-8">
			<h1 className="text-4xl font-bold my-8">Admin Dashboard</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<Link
					to="/admin/users"
					className="bg-green-500 text-white p-6 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
				>
					<h2 className="text-2xl font-semibold">Manage Vendors</h2>
					<p className="mt-2">Manage vendor accounts</p>
				</Link>
				<Link
					to="/admin/products"
					className="bg-yellow-500 text-white p-6 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300"
				>
					<h2 className="text-2xl font-semibold">Manage Products</h2>
					<p className="mt-2">View and manage products</p>
				</Link>
				<Link
					to="/admin/make-admin"
					className="bg-red-500 text-white p-6 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
				>
					<h2 className="text-2xl font-semibold">
						Make Someone Admin
					</h2>
					<p className="mt-2">Make a regular user an admin</p>
				</Link>
				<Link
					to="/admin/categories/add"
					className="bg-blue-500 text-white p-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
				>
					<h2 className="text-2xl font-semibold">Create Category</h2>
					<p className="mt-2">Add new product categories</p>
				</Link>
				<Link
					to="/admin/featured"
					className="bg-purple-500 text-white p-6 rounded-lg shadow-md hover:bg-purple-600 transition duration-300"
				>
					<h2 className="text-2xl font-semibold">Feature Products</h2>
					<p className="mt-2">Monitor product features. Add new products to Featured Products</p>
				</Link>
				<Link
					to="/admin/pro"
					className="bg-slate-500 text-white p-6 rounded-lg shadow-md hover:bg-slate-600 transition duration-300"
				>
					<h2 className="text-2xl font-semibold">Manage Pro Requests</h2>
					<p className="mt-2">Upgrade vendors to Pro</p>
				</Link>
				{/* <Link
					to="/admin/pro-products"
					className="bg-cyan-500 text-white p-6 rounded-lg shadow-md hover:bg-cyan-600 transition duration-300"
				>
					<h2 className="text-2xl font-semibold">Manage Pro Products</h2>
					<p className="mt-2">Manage pro products</p>
				</Link> */}
				{/*<Link
					to="/admin/settings"
					className="bg-indigo-500 text-white p-6 rounded-lg shadow-md hover:bg-indigo-600 transition duration-300"
				>
					<h2 className="text-2xl font-semibold">Settings</h2>
					<p className="mt-2">Admin settings and configurations</p>
				</Link> */}
			</div>
		</div>
	);
};

export default AdminHome;
