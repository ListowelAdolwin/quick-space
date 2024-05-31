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

function App() {
	const { currentUser } = useSelector((state) => state.user);
	return (
		<>
			<BrowserRouter>
				<Header />
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
					<Route element={<PrivateRoute />}>
						<Route path="/add-product" element={<AddProduct />} />
						<Route
							path="/update-product/:id"
							element={<UpdateProduct />}
						/>
						<Route
							path="/update-profile/:id"
							element={<UpdateProfile />}
						/>
						<Route path="/favourites" element={<Favourites />} />
					</Route>
				</Routes>

				<Footer />
			</BrowserRouter>
		</>
	);
}

export default App;
