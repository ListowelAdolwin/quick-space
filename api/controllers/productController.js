const Product = require('../models/Product');
const User = require('../models/User');
const Category = require('../models/Category');
const Review = require('../models/Review');

const addProduct = async (req, res) => {
  try {
    const { name, price, category, imageUrls, videoUrl, discount, description } = req.body;
    const vendor = req.user;
    const vendorName = vendor.vendorName;
    const school = vendor.school;
    const prodCategory = await Category.findOne({ val: category });
    const categoryName = prodCategory.val;

    if (Number(discount) > Number(price)) {
      return res
        .status(400)
        .json({ message: 'Discount cannot be greater than product price' });
    }

    const newProduct = new Product({
      name,
      vendorName,
      price,
      category: prodCategory,
      categoryName,
      imageUrls,
      videoUrl,
      vendor,
      school,
      discount,
      description,
    });

    await newProduct.save();
    // Increment product category count by one
    prodCategory.count = prodCategory.count + 1;
    await prodCategory.save();

    res.status(201).json({
      message: 'Product added successfully',
      product: newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {name, price, discount, description, category, imageUrls, videoUrl} = req.body
  const prodCategory = await Category.findOne({val: category})
  try {
    const prod = await Product.findById(id).populate('vendor');
    if (prod.vendor.contact !== req.user.contact) {
      return res
        .status(403)
        .json({ message: 'You can only update your product!' });
    }

    try {
      const newProduct = await Product.findByIdAndUpdate(
        id,
        {
          $set: {name, price, discount, description, imageUrls, videoUrl, category: prodCategory},
        },
        { new: true }
      );
      return res.status(200).json(newProduct);
    } catch (error) {
      console.log(error)
      return res
        .status(400)
        .json({ message: 'Server error: failed to update product!' });
    }
  } catch (error) {
    return res.json({
      message: 'Server error while trying to retrieve product!',
    });
  }
};

const getProducts = async (req, res) => {
  const startIndex = parseInt(req.query.startIndex) || 0;
  const limit = parseInt(req.query.limit) || 20;
  const school = req.query.school;

  try {
    const query = {};

    if (school) {
      query.school = { $regex: school, $options: 'i' };
    }

    const products = await Product.find(query)
      .populate('vendor')
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);
      
    res.status(200).json(products);
  } catch (error) {
    console.log("Error: ", error)
    res.status(500).json({ message: error.message });
  }
};


const getFeaturedProducts = async (req, res) => {
  const school = req.query.school;

  try {
    //const query = { isFeatured: true };
    const query = {};
    
    if (school) {
      query.school = { $regex: school, $options: 'i' };
    }

    const products = await Product.find(query)
      .populate('vendor')
      .sort({ createdAt: -1 })
      .limit(10);
    
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const featureProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    product.isFeatured = true;
    await product.save();

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const unfeatureProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    product.isFeatured = false;
    await product.save();

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCategoryProducts = async (req, res) => {
  const categoryName = req.params.category;
  const school = req.query.school
  try {
    const query = { categoryName };
    
    if (school) {
      query.school = { $regex: school, $options: 'i' };
    }
    const products = await Product.find(query)
      .populate('vendor')
      .sort({
        createdAt: -1,
      });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Product by ID
const getProduct = async (req, res) => {
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
    const tempProduct = await Product.findById(id).populate('vendor');
    if (!tempProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const reviews = await Review.find({ product: tempProduct._id })
      .populate('user')
      .sort({ createdAt: -1 });

    const product = {
      _id: tempProduct._id,
      name: tempProduct.name,
      price: tempProduct.price,
      rating: tempProduct.rating,
      imageUrls: tempProduct.imageUrls,
      videoUrl: tempProduct.videoUrl,
      discount: tempProduct.discount,
      category: tempProduct.categoryName,
      description: tempProduct.description,
      vendorId: tempProduct.vendor._id,
      vendorName: tempProduct.vendor.vendorName,
      isVendorVerified: tempProduct.vendor.isVerified,
      contact: tempProduct.vendor.contact,
      email: tempProduct.vendor.email,
      isFavorited: isFavoritedArray[0],
      averageRating: tempProduct.averageRating,
      totalReviews: tempProduct.totalReviews,
      reviews,
    };
    return res.status(200).json({ product, reviews });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addToFavorites = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ message: 'Please login to favourite product' });
    }

    if (user.favourites.includes(productId)) {
      return res.status(400).json({ message: 'Product already in favorites' });
    }

    user.favourites.push(productId);
    await user.save();

    res.status(200).json({ message: 'Added to favorites' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error adding to favorites', error });
  }
};

// Remove from favorites
const removeFromFavorites = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ message: 'Please login to unfavorite product' });
    }

    if (!user.favourites.includes(productId)) {
      return res.status(400).json({ message: 'Product not in favorites' });
    }

    user.favourites = user.favourites.filter(fav => fav !== productId);
    await user.save();

    res.status(200).json({ message: 'Removed from favorites' });
  } catch (error) {
    res.status(500).json({
      message: 'Error removing from favorites',
      error,
    });
  }
};

const getFavoriteProducts = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    const favorites = await Product.find({
      _id: { $in: user.favourites },
    }).populate('vendor');

    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred retrieving favorite products',
      error: error.message,
    });
  }
};

// const filterProducts = async (req, res) => {
//   try {
//     const searchTerm = req.query.searchTerm || '';
//     const price = req.query.price || '';
//     const category = req.query.category || '';
//     const school = req.query.school || '';
//     const limit = Number(req.query.limit) || 10;
//     const startIndex = Number(req.query.startIndex) || 0;

//     let sort = {};
//     if (price) {
//       sort.price = price === 'asc' ? 1 : -1;
//     }

//     let query = {
//       $or: [{ name: { $regex: searchTerm, $options: 'i' } }],
//     };

//     if (school) {
//       query.school = school;
//     }

//     if (category) {
//       query.categoryName = category;
//     }

//     if (searchTerm) {
//       const users = await User.find({
//         vendorName: { $regex: searchTerm, $options: 'i' },
//       });

//       const userIds = users.map(user => user._id);

//       query.$or.push({ vendor: { $in: userIds } });
//     }

//     const products = await Product.find(query)
//       .populate('vendor')
//       .sort(sort)
//       .skip(startIndex)
//       .limit(limit);

//     res.status(200).json(products);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error in over' });
//   }
// };

const filterProducts = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm || '';
    const price = req.query.price || '';
    const category = req.query.category || '';
    const school = req.query.school || '';
    const limit = Number(req.query.limit) || 10;
    const startIndex = Number(req.query.startIndex) || 0;

    let matchStage = {
      $or: [{ name: { $regex: searchTerm, $options: 'i' } }]
    };

    if (school) {
      matchStage.school = school;
    }

    if (category) {
      matchStage.categoryName = category;
    }

    if (searchTerm) {
      const users = await User.find({
        vendorName: { $regex: searchTerm, $options: 'i' }
      });

      const userIds = users.map(user => user._id);
      matchStage.$or.push({ vendor: { $in: userIds } });
    }

    let sort = {};
    if (price) {
      sort.price = price === 'asc' ? 1 : -1;
    } else {
      sort.isPro = -1;
    }

    // if (price){
    //   const priceSort = price === 'asc' ? 1 : -1;
    // }

    const products = await Product.aggregate([
      { $match: matchStage },
      {
        $lookup: {
          from: 'users',
          localField: 'vendor',
          foreignField: '_id',
          as: 'vendorDetails'
        }
      },
      { $unwind: '$vendorDetails' },
      {
        $addFields: {
          isPro: '$vendorDetails.isPro'
        }
      },
      {
        $sort: sort
      },
      { $skip: startIndex },
      { $limit: limit },
      {
        $project: {
          _id: 1,
          name: 1,
          price: 1,
          category: 1,
          categoryName: 1,
          imageUrls: 1,
          videoUrls: 1,
          school: 1,
          vendor: '$vendorDetails',
          vendorName: '$vendorDetails.vendorName',
          description: 1,
          discount: 1,
          status: 1,
          isFeatured: 1,
          totalReviews: 1,
          averageRating: 1,
          createdAt: 1,
          updatedAt: 1
        }
      }
    ]);

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const prod = await Product.findById(id).populate('vendor');
    if (prod.vendor.contact !== req.user.contact && req.user.role !== 'admin') {
      return res
        .status(403)
        .json({ message: 'You are not authorized to delete this product!' });
    }

    await Product.findByIdAndDelete(id);
    // Decrement product category count by one

    const prodCategory = await Category.findById(prod.category._id);
    prodCategory.count = prodCategory.count - 1;
    await prodCategory.save();

    return res.status(201).json({message: "Product deleted!"});
  } catch (error) {
    return res.status(400).json({ message: 'Failed to delete product!!' });
  }
};

// Hide product controller
const hideProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.status = 'hidden';
    await product.save();

    res.status(200).json({ message: 'Product status set to hidden', product });
  } catch (error) {
    console.error('Error hiding product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Suspend vendor controller
const suspendVendor = async (req, res) => {
  const { vendorId } = req.params;

  try {
    const vendor = await User.findById(vendorId);
    
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    vendor.status = 'suspended';
    await vendor.save();

    await Product.updateMany({ vendor: vendorId }, { status: 'hidden' });

    res.status(200).json({ message: 'Vendor suspended and all products set to hidden' });
  } catch (error) {
    console.error('Error suspending vendor:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




module.exports = {
  addProduct,
  updateProduct,
  getProducts,
  getFeaturedProducts,
  featureProduct,
  unfeatureProduct,
  getCategoryProducts,
  getProduct,
  addToFavorites,
  removeFromFavorites,
  getFavoriteProducts,
  filterProducts,
  deleteProduct,
  hideProduct,
  suspendVendor,
};
