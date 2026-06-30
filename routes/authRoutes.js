import express from'express'
import { signup ,login, getUsers, getProfile, logout } from '../controllers/userController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router =express.Router()

router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',authMiddleware,logout)
router.get('/admin/users',getUsers)
router.get('/profile',authMiddleware,getProfile)
export default router
