const express = require('express');
const { getCategoryProductCounts, addCategory } = require('../controllers/categoryController.js');
const { verifyRole } = require('../controllers/authController.js');

const router = express.Router();

router.get('/counts', getCategoryProductCounts);
router.post('/add', verifyRole(['admin']), addCategory);

module.exports = router;
