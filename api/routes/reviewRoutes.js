import express from 'express'
import { addReview, deleteReview, editReview } from '../controllers/reviewController.js'
import { verifyToken } from '../controllers/authController.js'

const router = express.Router()

router.post('/add/:id', verifyToken, addReview)
router.post('/delete/:id', verifyToken, deleteReview)
router.post('/edit/:id', verifyToken, editReview)
// router.get('/', getReviews)

export default router
