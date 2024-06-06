import Category from "../models/Category.js";

export const getCategoryProductCounts = async (req, res) => {
  try {
    const categories = await Category.find()
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send({ message: "Error creating categories", error });
  }
};


export const addCategory = async (req, res) => {
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
