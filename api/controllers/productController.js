import Product from "../models/Product.js";
import User from "../models/User.js";

export const addProduct = async (req, res) => {
	try {
		const { name, price, category, imageUrls } = req.body;
		const vendor = req.user;

		const newProduct = new Product({
			name,
			price,
			category,
			imageUrls,
			vendor,
		});

		await newProduct.save();

		res.status(201).json({
			message: "Product added successfully",
			product: newProduct,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

export const getProducts = async (req, res) => {
	try {
		const products = await Product.find();
		res.status(200).json(products);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getFeaturedProducts = async (req, res) => {
	try {
		const products = await Product.find().sort({ createdAt: -1 }).limit(10);
		res.status(200).json(products);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getCategoryProducts = async (req, res) => {
	const category = req.params.category;
	try {
		const products = await Product.find({ category }).sort({
			createdAt: -1,
		});
		res.status(200).json(products);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Get Product by ID
export const getProduct = async (req, res) => {
	const currentUserId = req.headers?.userid || req.headers.userId;
	const id = req.params.id;
	const isFavoritedArray = [false];
	try {
		const currentUser = await User.findById(currentUserId);
		if (currentUser.favourites.includes(id)) {
			isFavoritedArray[0] = true;
		}
	} catch (error) {}
	try {
		const result = await Product.findById(id).populate("vendor");
		if (!result) {
			return res.status(404).json({ message: "Product not found" });
		}

		const product = {
			_id: result._id,
			name: result.name,
			price: result.price,
			rating: result.rating,
			imageUrls: result.imageUrls,
			ratings: result.ratings,
			vendorName: result.vendor.vendorDetails.name,
			vendorContact: result.vendor.vendorDetails.contact,
			vendorEmail: result.vendor.email,
			isFavorited: isFavoritedArray[0],
		};
		return res.status(200).json(product);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const addToFavorites = async (req, res) => {
	const { productId } = req.body;
	const userId = req.user._id;

	try {
		const user = await User.findById(userId);

		if (!user) {
			return res
				.status(404)
				.json({ message: "Please login to favourite product" });
		}

		if (user.favourites.includes(productId)) {
			return res
				.status(400)
				.json({ message: "Product already in favorites" });
		}

		user.favourites.push(productId);
		await user.save();

		res.status(200).json({ message: "Added to favorites" });
	} catch (error) {
		res.status(500).json({ message: "Error adding to favorites", error });
	}
};

// Remove from favorites
export const removeFromFavorites = async (req, res) => {
	const { productId } = req.body;
	const userId = req.user._id;

	try {
		const user = await User.findById(userId);

		if (!user) {
			return res
				.status(404)
				.json({ message: "Please login to unfavorite product" });
		}

		if (!user.favourites.includes(productId)) {
			return res
				.status(400)
				.json({ message: "Product not in favorites" });
		}

		user.favourites = user.favourites.filter((fav) => fav !== productId);
		await user.save();

		res.status(200).json({ message: "Removed from favorites" });
	} catch (error) {
		res.status(500).json({
			message: "Error removing from favorites",
			error,
		});
	}
};
