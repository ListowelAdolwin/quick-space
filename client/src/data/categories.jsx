import health_and_beauty from "../assets/category_images/health_and_beauty.jpg";
import appliances from "../assets/category_images/appliance.jpg";
import airtime from "../assets/category_images/airtime.webp";
import furniture from "../assets/category_images/furniture.png";
import fashion from "../assets/category_images/fashion.jpeg";
import services from "../assets/category_images/services.jpg";
import food from "../assets/category_images/food.jpg";
import book from "../assets/category_images/book.avif";

export const categories = {
	health_and_beauty: {
		name: "Health and Beauty",
    image: health_and_beauty,
    qty: 45,
	},
	electronics: {
		name: "Electronics",
    image: appliances,
    qty: 89,
	},
	airtime_and_data: {
		name: "Airtime and Data",
    image: airtime,
    qty: 106,
	},
	furniture_and_appliances: {
		name: "Furniture and Appliances",
    image: furniture,
    qty: 19,
	},
	fashion: {
		name: "Fashion",
    image: fashion,
    qty: 95,
	},
	services: {
		name: "Services",
    image: services,
    qty: 465,
	},
	food: {
		name: "Food",
    image: food,
    qty: 123,
	},
	others: {
		name: "Everything else",
    image: book,
    qty: 123,
	}
};

