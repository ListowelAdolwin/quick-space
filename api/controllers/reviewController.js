import Review from '../models/Review.js';
import Product from '../models/Product.js';

export const addReview = async (req, res) => {
  const { rating, comment } = req.body;
  const { id } = req.params;
    console.log("Add review controller, ", req.user)

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const review = new Review({
      user: req.user._id,
      product: id,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json({review, message: 'Review added successfully' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};

// export const getReviews = async (req, res) => {
//   const { productId } = req.params;

//   try {
//     const reviews = await Review.find({ product: productId }).populate('user', 'name').sort({createdAt: -1});
//     res.status(200).json(reviews);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
