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
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      default: 0
    },
    ratings: {
      type: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
          },
          rating: {
            type: Number,
            required: true
          },
          review: String
        }
      ],
      required: false
    }
  },
  { timestamps: true }
)

const Product = mongoose.model('Product', productSchema)

export default Product
