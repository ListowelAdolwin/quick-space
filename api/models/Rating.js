import mongoose from 'mongoose'

const ratingSchema = new mongoose.Schema(
  {
    val: {
      type: Number,
      required: [true, 'Rating value required!']
    },
    coment: {
      type: String,
      required: [true, 'Rating comment required!']
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    rating: {
      type: Number,
      default: 0
    },
  },
  { timestamps: true }
)

const Rating = mongoose.model('Rating', ratingSchema)

export default Rating
