import express from 'express'
import { addReview } from '../controllers/reviewController.js'
import { verifyToken } from '../controllers/authController.js'

const router = express.Router()

router.post('/add/:id', verifyToken, addReview)
// router.get('/', getReviews)

export default router
