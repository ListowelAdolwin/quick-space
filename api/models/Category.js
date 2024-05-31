import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
	{
		displayName: {
			type: String,
			required: [true, "Category name required!"],
		},
		val: {
			type: String,
			required: [true, "Category price required!"],
		},
		count: {
			type: Number,
			required: [true, "Category category required!"],
		},
		image: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
