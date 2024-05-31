import Product from "../models/Product.js";
import User from "../models/User.js";

export const addProduct = async (req, res) => {
	try {
		const { name, price, category, imageUrls, discount, description } =
			req.body;
		const vendor = req.user;
		const school = vendor.school;

		const newProduct = new Product({
			name,
			price,
			category,
			imageUrls,
			vendor,
			school,
			discount,
			description,
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

export const updateProduct = async (req, res) => {
	const { id } = req.params;
	try {
		const prod = await Product.findById(id).populate("vendor");
		console.log("vendor: ", prod.vendor.name)
		console.log("User: ", req.user.name)
		if (prod.vendor.name !== req.user.name) {
			return res
				.status(403)
				.json({ message: "You can only update your product!" });
		}

		try {
			const newProduct = await Product.findByIdAndUpdate(
				id,
				{
					$set: req.body,
				},
				{ new: true }
			);
			return res.status(200).json(newProduct);
		} catch (error) {
			return res
				.status(400)
				.json({ message: "Server error: failed to update product!" });
		}
	} catch (error) {
		return res.json({
			message: "Server error while trying to retrieving product!",
		});
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
	// const all = await Product.find()
	// for (let i = 0; i < all.length; i++){
	// 	prod = all[i]
	// 	prod.discount = Math.floor(Math.random() * 100) + 5
	// 	await prod.save()
	// }
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
			discount: result.discount,
			category: result.category,
			description: result.description,
			vendorId: result.vendor._id,
			vendorName: result.vendor.name,
			vendorContact: result.vendor.vendorContact,
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

export const getFavoriteProducts = async (req, res) => {
	try {
		const userId = req.params.id;

		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: "User not found!" });
		}

		const favorites = await Product.find({ _id: { $in: user.favourites } });

		res.status(200).json(favorites);
	} catch (error) {
		res.status(500).json({
			message: "An error occurred retrieving favorite products",
			error: error.message,
		});
	}
};

export const filterProducts = async (req, res) => {
	try {
		const searchTerm = req.query.searchTerm || "";
		const price = req.query.price || "";
		const category = req.query.category || "";
		const school = req.query.school || "";
		const limit = Number(req.query.limit) || 10;
		const startIndex = Number(req.query.startIndex) || 0;

		let sort = {};
		if (price) {
			sort.price = price === "asc" ? 1 : -1;
		}

		let query = {
			$or: [{ name: { $regex: searchTerm, $options: "i" } }],
		};

		if (school) {
			query.school = school;
		}

		if (category) {
			query.category = category;
		}

		if (searchTerm) {
			const users = await User.find({
				name: { $regex: searchTerm, $options: "i" },
			});

			const userIds = users.map((user) => user._id);

			query.$or.push({ vendor: { $in: userIds } });
		}

		const products = await Product.find(query)
			.populate("vendor", "name")
			.sort(sort)
			.skip(startIndex)
			.limit(limit);

		res.status(200).json(products);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error in over" });
	}
};
