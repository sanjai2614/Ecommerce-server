import dotenv from 'dotenv'
import User from '../models/users.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

dotenv.config()

const JWT_SECRETKEY = process.env.JWT_SECRETKEY
const NODE_ENV = process.env.NODE_ENV

// POST Signup
export const signup = async (req, res) => {
  try {
    const { UserName, UserEmail, Password, role } = req.body

    // user exists
    const exixtingUser = await User.findOne({ UserEmail })

    if (exixtingUser) {
      return res.status(400).json({ msg: "user already exixts" })
    }

    // password hash
    const hash = await bcrypt.hash(Password, 10)

    //new user
    const newUser = await User.create({
      UserName, UserEmail, Password: hash, role
    })

    res.json({ msg: "signup successful", newUser })

  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

// POST Login
export const login = async (req, res) => {

  try {
    const { UserEmail, Password } = req.body

    const data = await User.findOne({ UserEmail })

    if (!data) {
      return res.status(400).json({ msg: "user not found" })
    }

    // Compare Password
    const isMatch = await bcrypt.compare(Password, data.Password)

    if (!isMatch) {
      return res.status(400).json({ msg: "wrong password" })
    }

    // token generate
    const token = jwt.sign(
      { id: data._id, role: data.role },
      JWT_SECRETKEY,
      { expiresIn: '1h' })

    res.cookie('token', token, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: NODE_ENV === "production" ? "none" : "lax",
      maxAge: 60 * 60 * 1000,
    })

    res.json({ msg: "login successful", token })

  } catch (err) {
    res.status(500).json(err)
  }

}

// logout
export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: NODE_ENV === "production" ? "none" : "lax",
  });

  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};

// get users

export const getUsers = async (req, res) => {
  try {
    const data = await User.find()
    res.json({ msg: "get users successfully", data })
  } catch (err) {
    res.json(err)
  }
}

// get profile

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-Password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};