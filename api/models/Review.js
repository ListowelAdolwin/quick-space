import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema(
  {
    // title: {
    //   type: String,
    //   required: true
    // },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    comment: {
      type: String,
      required: [true, 'Review comment required!']
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
  },
  { timestamps: true }
)

const Review = mongoose.model('Review', reviewSchema)

export default Review
