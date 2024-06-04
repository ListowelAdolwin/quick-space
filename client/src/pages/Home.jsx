import Categories from "../components/Categories";
import FeaturedProductsCarousel from "../components/FeaturedProductsCarousal";
import SearchInput from "../components/SearchInput";

function Home() {
	return (
		<div>
			<main>
				<SearchInput />
				<Categories />
				<FeaturedProductsCarousel />
			</main>
		</div>
	);
}

export default Home;
