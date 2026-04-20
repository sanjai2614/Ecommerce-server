import dotenv from 'dotenv'
import User from '../models/users.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

dotenv.config()
// const JWT_SECRETKEY = process.env.JWT_SECRETKEY

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
        
        res.json({ msg: "login successful", data })

    } catch (err) {
        res.status(500).json(err)
    }

}

// get users

export const getUsers=async(req,res)=>{
    try{
        const data=await User.find()
        res.json({msg:"get users successfully",data}) 
    }catch(err){
        res.json(err)
    }
}