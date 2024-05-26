import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username required!"],
        unique: [true, "Username already exists!"]
    },
    email: {
        type: String,
        required: [true, "Email required!"],
        unique: [true, "Email already exists!"]
    },
    password: {
        type: String,
        required: [true, "Password required!"],
    },
    favourites: {
        type: [String],
        default: []
    },
    isVendor: {
        type: Boolean,
        default: false
    },
    vendorDetails: {
        name: String,
        contact: String,
        category: String,
        address: String,
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
