import Categories from "../components/Categories";
import CautionBar from "../components/CautionBar";
import FeaturedProducts from "../components/FeaturedProducts";
import ProductSwiper from "../components/ProductSwipperSection";
import ProProducts from "../components/ProProducts";
import SearchInput from "../components/SearchInput";
import ReactGA from "react-ga4";

function Home() {
	ReactGA.send({
		hitType: "pageview",
		page: "/",
		title: "Home Page",
	});
	return (
		<div>
			<main>
				<SearchInput />
				<CautionBar />
				<ProductSwiper />
				<ProProducts />
				<Categories />
				<FeaturedProducts />
			</main>
		</div>
	);
}

export default Home;
