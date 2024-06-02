import express from 'express'
import { getCategoryProductCounts, addCategory } from '../controllers/categoryController.js';
import { verifyRole } from '../controllers/authController.js';

const router = express.Router()

router.get('/counts', getCategoryProductCounts)
router.post('/add', verifyRole(['admin']), addCategory)

export default router