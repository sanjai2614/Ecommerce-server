import express from 'express'
import { addToCart, getCart, removeItem, updateQuantity } from '../controllers/cartController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', authMiddleware, getCart)
router.post('/add', authMiddleware, addToCart)
router.post('/update', authMiddleware, updateQuantity)
router.post('/remove', authMiddleware, removeItem)
export default router