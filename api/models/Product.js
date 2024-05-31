import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name required!']
    },
    price: {
      type: Number,
      required: [true, 'Product price required!']
    },
    category: {
      type: String,
      required: [true, 'Product category required!']
    },
    imageUrls: {
      type: [String],
      required: [true, 'Product image(s) required!']
    },
    school: {
        type: String,
        default: "knust"
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    description: {
      type: String,
      required: false
    },
    discount: {
      type: Number,
      default: 0
    },
    rating: {
      type: Number,
      default: 0
    },
  },
  { timestamps: true }
)

const Product = mongoose.model('Product', productSchema)

export default Product
