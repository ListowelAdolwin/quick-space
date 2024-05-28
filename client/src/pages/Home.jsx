import Categories from "../components/Categories";
import FeaturedProductsCarousel from "../components/FeaturedProductsCarousal";

function Home() {
	return (
		<div>
			<main>
				<FeaturedProductsCarousel />
				<Categories />
			</main>
		</div>
	);
}

export default Home;
