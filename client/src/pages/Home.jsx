import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProductsCarousal";
import SearchInput from "../components/SearchInput";

function Home() {
	return (
		<div>
			<main>
				<SearchInput />
				<Categories />
				<FeaturedProducts />
			</main>
		</div>
	);
}

export default Home;
