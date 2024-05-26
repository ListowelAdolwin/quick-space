import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const userProfile = async (req, res) => {
	const { id } = req.params;
	try {
		const userProfile = await User.findById(id);
		const { password: pass, ...rest } = userProfile._doc;
		return res.status(200).json(rest);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};


export const updateProfile = async (req, res) => {
	const { id } = req.params;
	if (id !== req.user.id) {
		return res
			.status(403)
			.json({ message: "You can only update your profile!" });
	}
	try {
		const userProfile = await User.findByIdAndUpdate(id, {
				$set: req.body,
			},
			{ new: true });
		const { password: pass, ...rest } = userProfile._doc;
		return res.status(200).json(rest);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};