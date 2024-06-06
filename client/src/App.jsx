import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProdutDetail";
import About from "./pages/About";
import Favourites from "./pages/Favourites";
import UserProfile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CategoryItems from "./pages/CategoryItems";
import AddProduct from "./pages/AddProduct";
import UpdateProfile from "./pages/UpdateProfile";
import ScrollToTop from "./components/ScrollToTop";
import SearchProducts from "./pages/SearchProducts";
import RegisterAlert from "./components/RegisterAlert";
import PrivateRoute from "./components/PrivateRoute";
import UpdateProduct from "./pages/UpdateProduct";
import { useSelector } from "react-redux";
import AddCategory from "./pages/admin/AddCategory";
import Vendors from "./pages/admin/Vendors";
import AdminHome from "./pages/admin/AdminHome";
import ManageProducts from "./pages/admin/ManageProducts";
import AdminNavbar from "./components/admin/AdminNavbar";
import MakeAdmin from "./pages/admin/MakeAdmin";
import ProtectedAdminRoutes from "./components/admin/ProtectedAdminRoutes";
import ProtectedVendorRoute from "./components/ProtectedVendorRoute";
import ManageFeaturedProducts from "./pages/admin/ManageFeaturedProducts";

function App() {
	const { currentUser } = useSelector((state) => state.user);
	const path = window.location.pathname;
	const admin = path.startsWith("/admin") && currentUser?.role === "admin";
	return (
		<>
			<BrowserRouter>
				{admin ? <AdminNavbar /> : <Header />}

				{!currentUser && <RegisterAlert />}

				<ScrollToTop />
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route path="/home" element={<Home />} />
					<Route path="/shop" element={<Shop />} />
					<Route path="/about" element={<About />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/profile/:id" element={<UserProfile />} />
					<Route path="/product/:id" element={<ProductDetail />} />
					<Route path="/search" element={<SearchProducts />} />
					<Route
						path="/products/:category"
						element={<CategoryItems />}
					/>

					{/**Login Required Routes */}
					<Route element={<PrivateRoute />}>
						<Route
							path="/update-profile/:id"
							element={<UpdateProfile />}
						/>
						<Route
							path="/update-product/:id"
							element={<UpdateProduct />}
						/>
						<Route path="/favourites" element={<Favourites />} />
					</Route>

					{/**Vendor Routes */}
					<Route element={<ProtectedVendorRoute />}>
						<Route path="/add-product" element={<AddProduct />} />
					</Route>

					{/**Admin Routes */}
					<Route element={<ProtectedAdminRoutes />}>
						<Route
							path="/admin/categories/add"
							element={<AddCategory />}
						/>
						<Route
							path="/admin/dashboard"
							element={<AdminHome />}
						/>
						<Route
							path="/admin/products"
							element={<ManageProducts />}
						/>
						<Route path="/admin/users" element={<Vendors />} />
						<Route
							path="/admin/make-admin"
							element={<MakeAdmin />}
						/>
						<Route
							path="/admin/featured"
							element={<ManageFeaturedProducts />}
						/>
					</Route>
				</Routes>

				<Footer />
			</BrowserRouter>
		</>
	);
}

export default App;
