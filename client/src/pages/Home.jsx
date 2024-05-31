import Categories from "../components/Categories";
import FeaturedProductsCarousel from "../components/FeaturedProductsCarousal";

function Home() {
	return (
		<div>
			<main>
				<Categories />
				<FeaturedProductsCarousel />
			</main>
		</div>
	);
}

export default Home;
