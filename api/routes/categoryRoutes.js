import express from 'express'
import { getCategoryProductCounts } from '../controllers/categoryController.js';

const router = express.Router()

router.get('/counts', getCategoryProductCounts)

export default router