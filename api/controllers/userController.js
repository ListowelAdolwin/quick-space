const User = require("../models/User.js");
const Product = require("../models/Product.js");

const userProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const userProfile = await User.findById(id);
        if (!userProfile) {
            return res.status(404).json({ message: "User not found" });
        }
        const userProducts = await Product.find({ vendor: userProfile });
        const { password: pass, ...rest } = userProfile._doc;
        return res.status(200).json({ ...rest, products: userProducts });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const updateProfile = async (req, res) => {
    const { id } = req.params;
    if (id !== req.user.id) {
        return res
            .status(403)
            .json({ message: "You can only update your profile!" });
    }
    try {
        const userProfile = await User.findByIdAndUpdate(
            id,
            {
                $set: req.body,
            },
            { new: true }
        );
        const { password: pass, ...rest } = userProfile._doc;
        return res.status(200).json(rest);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
    }
};

const getVendors = async (req, res) => {
    try {
        const vendors = await User.find({ isVendor: true }).sort({createdAt: -1 });
        res.json(vendors);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const verifyUnverifyVendor = async (req, res) => {
    const { id } = req.params;
    try {
        const vendor = await User.findById(id);
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }
        vendor.isVerified = !vendor.isVerified;
        await vendor.save();
        const status = vendor.isVerified ? "verified" : "unverified";
        return res
            .status(200)
            .json({ message: `Vendor ${vendor.vendorName} successfully ${status}` });
    } catch (error) {
        console.error("Error verifying/unverifying vendor:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const makeAdmin = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: `User ${email} not found` });
        }
        user.role = "admin";
        await user.save();
        res.status(200).send({ message: `${user.email} has been made an admin` });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const deleteVendor = async (req, res) => {
    const { id } = req.params;

  try {
    const vendor = await User.findById(id);

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({ message: "Vendor deleted successfully" });
  } catch (error) {
    console.error("Error deleting vendor:", error);
    res.status(500).json({ message: "Server error, could not delete vendor" });
  }

}
const getProRequests = async (req, res) => {
    try {
        const vendors = await User.find({ isVendor: true, isPro: false }).sort({ createdAt: -1 });
        res.status(200).json(vendors);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
  }

const makePro = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send({ message: `User not found` });
        }
        user.isPro = true;
        await user.save();
        res.status(200).send({ message: `${user.email} has been made a pro` });
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: error.message });
    }
};

module.exports = {
    userProfile,
    updateProfile,
    getVendors,
    verifyUnverifyVendor,
    makeAdmin,
    deleteVendor,
    makePro,
    getProRequests
};
