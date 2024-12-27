const express = require('express')
const {
  register,
  login,
  generateSendOTP,
  verifyToken,
  resetPassword,
  forgotPassword
} = require('../controllers/authController.js')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
// router.post('/send-otp-code', generateSendOTP)
// router.post('reset-password', resetPassword)
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router
