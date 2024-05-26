import health_and_beauty from "../assets/category_images/health_and_beauty.jpg";
import appliances from "../assets/category_images/appliance.jpg";
import airtime from "../assets/category_images/airtime.webp";
import furniture from "../assets/category_images/furniture.png";
import fashion from "../assets/category_images/fashion.jpeg";
import services from "../assets/category_images/services.jpg";
import food from "../assets/category_images/food.jpg";
import book from "../assets/category_images/book.avif";

export const categories = [
	{
		name: "Health and Beauty",
		val: "health_and_beauty",
		image: health_and_beauty,
		qty: 45,
	},
	{
		name: "Electronics",
		val: "electronics",
		image: appliances,
		qty: 89,
	},
	{
		name: "Airtime and Data",
		val: "airtime_and_data",
		image: airtime,
		qty: 106,
	},
	{
		name: "Furniture and Appliances",
		val: "furniture_and_appliances",
		image: furniture,
		qty: 19,
	},
	{
		name: "Fashion",
		val: "fashion",
		image: fashion,
		qty: 95,
	},
	{
		name: "Services",
		val: "services",
		image: services,
		qty: 465,
	},
	{
		name: "Food and Everyday Essentials",
		val: "food_and_everyday_essentials",
		image: food,
		qty: 211,
	},
	{
		name: "Everything Else",
		val: "others",
		image: book,
		qty: 203,
	},
];
