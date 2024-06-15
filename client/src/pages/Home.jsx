import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProductsCarousal";
import SearchInput from "../components/SearchInput";
import CautionNotification from "../components/CautionNotication";

function Home() {
	return (
		<div>
			<main>
				<CautionNotification />
				<SearchInput />
				<Categories />
				<FeaturedProducts />
			</main>
		</div>
	);
}

export default Home;
