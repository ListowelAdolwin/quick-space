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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Product category required!']
    },
    categoryName: {
      type: String,
      required: true
    },
    imageUrls: {
      type: [String],
      required: [true, 'Product image(s) required!']
    },
    videoUrls: {
      type: [String]
    },
    school: {
      type: String
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    vendorName: { type: String, required: true },
    description: {
      type: String,
      required: false
    },
    discount: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'hidden', 'out of stock'],
      default: 'published',
      required: true
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    // reviews:[
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Review'
    //   }
    // ],
    totalReviews: {
      type: Number,
      default: 0
    },
    averageRating: { type: Number, min: 0, max: 5, default: 0 }
  },
  { timestamps: true }
)

const Product = mongoose.model('Product', productSchema)

export default Product
