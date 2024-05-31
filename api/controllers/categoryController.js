import Category from "../models/Category.js";

export const getCategoryProductCounts = async (req, res) => {
  try {
    const categories = await Category.find()
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send({ message: "Error creating categories", error });
  }
};