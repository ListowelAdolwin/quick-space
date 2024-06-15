const Category = require("../models/Category.js");
const Product = require('../models/Product');

const getCategoryProductCounts = async (req, res) => {
  const school = req.query.school; // Get the school from the query parameters

  try {
    // Build the match stage for products based on the school filter
    const matchStage = {};
    if (school) {
      matchStage.school = school;
    }

    // Get all categories
    const categories = await Category.find().lean();

    // Build the aggregation pipeline for counting products in each category
    const pipeline = [
      { $match: matchStage },
      {
        $group: {
          _id: "$category", // Group by category
          count: { $sum: 1 }, // Count the number of products in each category
        },
      },
    ];

    // Execute the aggregation pipeline to get product counts
    const productCounts = await Product.aggregate(pipeline);

    // Convert the product counts to a dictionary for easier lookup
    const countMap = productCounts.reduce((acc, item) => {
      acc[item._id.toString()] = item.count;
      return acc;
    }, {});      

    // Combine categories with product counts, including those with a count of 0
    const result = categories.map((category) => ({
      ...category,
      count: countMap[category._id.toString()] || 0,
    }));

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: "Error fetching category product counts", error });
  }
};






const addCategory = async (req, res) => {
    const { displayName, val, imageUrl } = req.body;

    try {
        const newCategory = new Category({
            displayName,
            val,
            imageUrl,
        });

        await newCategory.save();

        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: 'Error adding category', error });
    }
};

module.exports = { getCategoryProductCounts, addCategory };
