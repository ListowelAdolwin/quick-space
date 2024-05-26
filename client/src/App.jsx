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

function App() {
	return (
		<>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route path="/home" element={<Home />} />
					<Route path="/shop" element={<Shop />} />
					<Route path="/favourites" element={<Favourites />} />
					<Route path="/about" element={<About />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/profile/:id" element={<UserProfile />} />
					<Route path="/update-profile/:id" element={<UpdateProfile />} />
					<Route path="/product/:id" element={<ProductDetail />} />
					<Route path="/add-product" element={<AddProduct />} />
					<Route
						path="/products/:category"
						element={<CategoryItems />}
					/>
				</Routes>

				<Footer />
			</BrowserRouter>
		</>
	);
}

export default App;
