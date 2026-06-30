import express from 'express'

import { addToWishlist, getWishlist, removeWishlist } from '../controllers/wishlistController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', authMiddleware, getWishlist)
router.post('/add', authMiddleware, addToWishlist)
router.post('/remove', authMiddleware, removeWishlist)

export default router