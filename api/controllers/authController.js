const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../models/User.js')
const sendOTP = require('../utils/sendOTP.js')
const OTP = require('../models/OTP.js')
const { sendCustomEmail } = require('../utils/sendCustomEmail.js')

const register = async (req, res) => {
  const {
    vendorName,
    email,
    password,
    isVendor,
    school,
    contact,
    vendorAddress,
    vendorCategory,
    vendorFlyerUrl
  } = req.body

  if (!contact || !email || !password) {
    return res.status(400).json({ message: 'All fields are required!' })
  }
  try {
    const duplicateContact = await User.findOne({ contact }).exec()
    if (duplicateContact) {
      return res
        .status(409)
        .json({ message: `The contact ${contact} already exist` })
    }
    const duplicateEmail = await User.findOne({ email }).exec()
    if (duplicateEmail) {
      return res.status(409).json({ message: `Email ${email} already exist` })
    }
    if (isVendor) {
      const duplicateVendorName = await User.findOne({ vendorName }).exec()
      if (duplicateVendorName) {
        return res
          .status(409)
          .json({ message: `The name ${vendorName} already exist` })
      }
    }

    const hashedP = bcrypt.hashSync(password, 10)
    let optimizedImageUrl
    if (vendorFlyerUrl){
      optimizedImageUrl = vendorFlyerUrl.replace('/upload/', '/upload/f_auto,q_auto,p_jpg/');
    }

    const newUser = new User({
      contact,
      email,
      password: hashedP,
      isVendor
    })
    if (isVendor) {
      newUser.vendorName = vendorName
      newUser.school = school
      newUser.vendorAddress = vendorAddress
      newUser.vendorCategory = vendorCategory
      newUser.vendorFlyerUrl = optimizedImageUrl
      newUser.role = 'vendor'
    }
    await newUser.save()
    const { password: pass, ...rest } = newUser._doc
    res.status(201).json(rest)
  } catch (error) {
    console.log('Error', error)
    if (error instanceof mongoose.Error.ValidationError) {
      const messages = Object.values(error.errors).map(err => err.message)
      res.status(400).json({ message: messages[0] })
    } else {
      console.log('Error', error)
      res.status(500).json({
        error: 'An unexpected error occurred while registring. Please retry'
      })
    }
  }
}

const login = async (req, res) => {
  const { contact, password } = req.body
  if (!contact || !password) {
    return res.status(400).json({ message: 'Contact and password required!' })
  }
  const foundUser = await User.findOne({ contact }).exec()
  if (!foundUser) {
    return res
      .status(401)
      .json({ message: 'Wrong credentials entered', ok: false })
  }

  try {
    const isValidated = bcrypt.compareSync(password, foundUser.password)
    if (!isValidated) {
      return res
        .status(401)
        .json({ message: 'Wrong credentials entered!', ok: false })
    }

    const accessToken = jwt.sign(
      {
        contact,
        isVendor: foundUser.isVendor,
        _id: foundUser._id,
        role: foundUser.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '10d' }
    )

    const { password: pass, ...rest } = foundUser._doc

    return res.status(200).json({
      message: `User ${contact} successfully logged in!`,
      user: { ...rest, accessToken },
      ok: true
    })
  } catch (error) {
    console.log(error)
    return res
      .status(401)
      .json({ message: 'Error while logging in', ok: false })
  }
}

const verifyToken = (req, res, next) => {
  const header = req.headers.Authorization || req.headers.authorization

  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Invalid token format', ok: false })
  }
  const token = header.split(' ')[1]
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      console.log(err)
      return res
        .status(401)
        .json({ expired: true, message: 'Token expired', ok: false })
    }
    req.user = await User.findOne({ contact: decoded.contact })
    next()
  })
}

const verifyRole = roles => async (req, res, next) => {
  try {
    const header = req.headers.Authorization || req.headers.authorization

    if (!header?.startsWith('Bearer ')) {
      return res
        .status(401)
        .json({ message: 'Invalid token format', ok: false })
    }

    const token = header.split(' ')[1]

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        console.log(err)
        return res
          .status(401)
          .json({ expired: true, message: 'Token expired', ok: false })
      }
      const user = await User.findOne({ contact: decoded.contact })
      if (!user || !roles.includes(user.role)) {
        return res.status(403).json({ message: 'Access denied.' })
      }

      req.user = user
      next()
    })
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate.' })
  }
}

const generateSendOTP = async (req, res) => {
  const { contact } = req.body

  const user = await User.findOne({ contact })

  const userContact = user.contact

  try {
    const otpCode = Math.floor(100000 + Math.random() * 900000)
    const newOTP = new OTP({ user, code: otpCode })
    await newOTP.save()

    const from = 'listoweladolwin@gmail.com'
    const to = user.email
    const subject = 'Password Reset'

    sendOTP(to, from, subject, otpCode)

    res.status(200).json({ message: `OTP sent to ${to}` })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: `Failed to send OTP to ${to}` })
  }
}

const resetPasswordWithOTP = async (req, res) => {
  const { user } = req
  const { otpCode } = req.body
  const { newPassword } = req.body

  try {
    const otp = await OTP.findOne({ code: otpCode })

    if (!otp) {
      return res.status(401).json({ message: 'Invalid OTP' })
    }

    if (new Date(otp.createdAt).getTime() + 600000 < Date.now()) {
      return res.status(401).json({ message: 'OTP expired' })
    }
    const hashedP = bcrypt.hashSync(newPassword, 10)
    user.password = hashedP
    await user.save()

    res.status(200).json({ message: 'Password reset successful!' })
  } catch (error) {
    res.status(500).json({ message: 'Password reset failed!' })
  }
}


const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) { return res.status(200).json({ message: 'If the email is associated with an account, you will receive a password reset link.' }) }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const resetURL = `${process.env.CLIENT_URL}/reset-password/${token}`;

    const mailOptions = {
      from: '"QuickSpace Support" <support@quickspacegh.com>',
      to: email,
      subject: 'Reset Your Password - QuickSpace',
      html: `
            <p>Dear User,</p>
            <p>You have requested to reset your password for your QuickSpace account. Please click the button below to reset your password:</p>
            <p>
              <a href="${resetURL}" 
                style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007BFF; text-decoration: none; border-radius: 5px;">
                Reset Password
              </a>
            </p>
            <p>If the button above doesn't work, copy and paste the following link into your browser:</p>
            <p><a href="${resetURL}" style="color: #007BFF;">${resetURL}</a></p>
            <p>If you did not request this password reset, you can safely ignore this email. Your password will remain unchanged.</p>
            <p>Thank you,<br>The QuickSpace Team</p>
            <hr>
            <p style="font-size: 12px; color: #666;">If you have any questions, contact us at <a href="mailto:support@quickspacegh.com" style="color: #007BFF;">support@quickspacegh.com</a>.</p>
          `,
    };


    sendCustomEmail(mailOptions);

    res.status(200).json({ message: 'Password reset link sent to your email.' });

  } catch (error) {
    console.log("Error: ", error)
    res.status(500).json({ message: 'Server error' });
  }
}

const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.password = bcrypt.hashSync(password, 10);
    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.log("Error: Token not valid")
    res.status(400).json({ message: 'Invalid or expired token' });

  }
}

module.exports = {
  register,
  login,
  verifyToken,
  verifyRole,
  generateSendOTP,
  resetPasswordWithOTP,
  resetPassword,
  forgotPassword
}
