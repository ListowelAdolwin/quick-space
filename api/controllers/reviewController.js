const Review = require('../models/Review.js');
const Product = require('../models/Product.js');

const addReview = async (req, res) => {
  const { rating, comment } = req.body;
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const review = new Review({
      user: req.user._id,
      product: id,
      rating,
      comment
    });

    await review.save();

    const newReview = await Review.findById(review._id).populate('user');

    product.totalReviews = product.totalReviews + 1;
    if (product.totalReviews === 1) {
      product.averageRating = Number(rating);
    } else {
      product.averageRating =
        (product.averageRating * (product.totalReviews - 1) + Number(rating)) /
        product.totalReviews;
    }
    await product.save();

    res.status(201).json({
      review: newReview,
      averageRating: product.averageRating,
      message: 'Review added successfully'
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { productId } = req.body;

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const newReviewCount = product.totalReviews - 1;

    if (newReviewCount > 0) {
      const newAverageRating =
        (product.averageRating * product.totalReviews - review.rating) /
        newReviewCount;
      product.averageRating = newAverageRating;
    } else {
      product.averageRating = 0;
    }

    product.totalReviews = newReviewCount;
    await product.save();

    await Review.findByIdAndDelete(id);

    res
      .status(200)
      .json({
        averageRating: product.averageRating,
        message: 'Review deleted successfully'
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete review' });
  }
};

const editReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment, productId } = req.body;

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const newAverageRating =
      (product.averageRating * product.totalReviews -
        review.rating +
        Number(rating)) /
      product.totalReviews;

    review.rating = Number(rating);
    review.comment = comment;
    await review.save();

    product.averageRating = newAverageRating;
    await product.save();

    res.status(200).json({
      review,
      averageRating: newAverageRating,
      message: 'Review updated successfully',
      review
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to edit review' });
  }
};

module.exports = {
  addReview,
  deleteReview,
  editReview
};
