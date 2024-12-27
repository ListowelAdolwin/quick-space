const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    vendorName: {
      type: String,
      validate: {
        validator: function(v) {
          return this.isVendor ? v && v.length > 0 : true;
        },
        message: props => 'Vendor name is required for vendors!'
      }
    },
    vendorDescription: String,
    vendorFlyerUrl: String,
    contact: {
      type: String,
      required: [true, 'Phone number is required'],
      validate: {
        validator: function(v) {
          return /^0\d{9}$/.test(v);
        },
        message: props => `${props.value} is not a valid contact number! It must start with a 0 and be exactly 10 digits long.`
      }
    },
    email: {
      type: String,
      required: [true, 'Email required!'],
      unique: [true, 'Email already exists!']
    },
    password: {
      type: String,
      required: [true, 'Password required!']
    },
    favourites: {
      type: [String],
      default: []
    },
    school: {
      type: String
    },
    isVendor: {
      type: Boolean,
      default: false
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      enum: ['user', 'vendor', 'admin', 'superadmin'],
      default: 'user',
      required: true
    },
    status: {
      type: String,
      enum: ['active', 'suspended', 'inactive'],
      default: 'active',
    },
    isPro: { type: Boolean, default: false },
    socialMedia: {
      tiktok: String,
      facebook: String,
      instagram: String,
    },
    vendorAddress: String,
    vendorCategory: String,
    token: String,
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
