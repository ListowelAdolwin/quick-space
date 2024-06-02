import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name required!'],
      unique: [true, 'Name already exists!']
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
      type: String,
      default: 'knust'
    },
    isVendor: {
      type: Boolean,
      default: false
    },
    isVerified: {
      type: Boolean,
      default: true
    },
    role: {
      type: String,
      enum: ['user', 'vendor', 'admin', 'superadmin'],
      default: 'user',
      required: true
    },
    vendorContact: String,
    vendorAddress: String,
    vendorCategory: String
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

export default User
