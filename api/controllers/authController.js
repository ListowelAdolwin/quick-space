import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const register = async (req, res) => {
  console.log(req.body)
  const {
    name,
    email,
    password,
    isVendor,
    school,
    vendorContact,
    vendorAddress,
    vendorCategory
  } = req.body
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required!' })
  }
  try {
    const duplicateName = await User.findOne({ name }).exec()
    if (duplicateName) {
      return res.status(409).json({ message: `The name ${name} already exist` })
    }
    const duplicateEmail = await User.findOne({ email }).exec()
    if (duplicateEmail) {
      return res.status(409).json({ message: `Email ${email} already exist` })
    }
    const hashedP = bcrypt.hashSync(password, 10)
    const newUser = new User({
      name,
      email,
      password: hashedP,
      isVendor,
      school
    })
    if (isVendor) {
      newUser.vendorContact = vendorContact
      newUser.vendorAddress = vendorAddress
      newUser.vendorCategory = vendorCategory
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
  const { name, password } = req.body
  if (!name || !password) {
    return res.status(400).json({ message: 'Name and password required!' })
  }
  const foundUser = await User.findOne({ name }).exec()
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
        name,
        isVendor: foundUser.isVendor,
        userId: foundUser._id
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    const { password: pass, ...rest } = foundUser._doc

    return res.status(200).json({
      message: `User ${name} successfully logged in!`,
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
    req.user = await User.findOne({ name: decoded.name })
    next()
  })
}
