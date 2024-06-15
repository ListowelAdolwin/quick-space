const express = require('express');
const { addReview, deleteReview, editReview } = require('../controllers/reviewController.js');
const { verifyToken } = require('../controllers/authController.js');

const router = express.Router();

router.post('/add/:id', verifyToken, addReview);
router.post('/delete/:id', verifyToken, deleteReview);
router.post('/edit/:id', verifyToken, editReview);
// router.get('/', getReviews);

module.exports = router;
