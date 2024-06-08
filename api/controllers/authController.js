import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const register = async (req, res) => {
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
      return res.status(409).json({ message: `The contact ${contact} already exist` })
    }
    const duplicateEmail = await User.findOne({ email }).exec()
    if (duplicateEmail) {
      return res.status(409).json({ message: `Email ${email} already exist` })
    }
    if (isVendor){
      const duplicateVendorName = await User.findOne({ vendorName }).exec()
    if (duplicateVendorName) {
      return res.status(409).json({ message: `The name ${vendorName} already exist` })
    }
    }

    const hashedP = bcrypt.hashSync(password, 10)
    const newUser = new User({
      contact,
      email,
      password: hashedP,
      isVendor,
    })
    if (isVendor) {
      newUser.vendorName = vendorName
      newUser.school = school
      newUser.vendorAddress = vendorAddress
      newUser.vendorCategory = vendorCategory
      newUser.vendorFlyerUrl = vendorFlyerUrl
      newUser.role = 'vendor'
    }
    await newUser.save()
    const { password: pass, ...rest } = newUser._doc
    res.status(201).json(rest)
  } catch (error) {
    let errMsg
    if (error.code == 11000) {
      errMsg = Object.keys(error.keyValue)[0] + ` already exists.`
    } else {
      errMsg = error.message
    }
    console.log(error)
    res.status(400).json({ message: errMsg })
  }
}

export const login = async (req, res) => {
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

export const verifyToken = (req, res, next) => {
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

export const verifyRole = roles => async (req, res, next) => {
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
