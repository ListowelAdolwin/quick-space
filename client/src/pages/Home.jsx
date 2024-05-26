import Categories from "../components/Categories";
import FeaturedProductsCarousel from "../components/FeaturedProductsCarousal";
import FeaturedProducts from "../components/FeaturedProduct";

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
