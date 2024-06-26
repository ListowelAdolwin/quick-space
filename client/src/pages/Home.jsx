import Categories from "../components/Categories";
import CautionBar from "../components/CautionBar";
import FeaturedProducts from "../components/FeaturedProductsCarousal";
import SearchInput from "../components/SearchInput";

function Home() {
	return (
		<div>
			<main>
				<SearchInput />
				<CautionBar />
				<Categories />
				<FeaturedProducts />
			</main>
		</div>
	);
}

export default Home;
