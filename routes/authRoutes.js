import express from'express'
import { signup ,login, getUsers } from '../controllers/userController.js'

const router =express.Router()

router.post('/signup',signup)
router.post('/login',login)
router.get('/admin/users',getUsers)
export default router
