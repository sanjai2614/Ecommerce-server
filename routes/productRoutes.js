import express from 'express'
import {createProducts, deleteProduct, getProducts,getProductsById, updateProduct } from "../controllers/productController.js";

const router=express.Router()

router.post('/post',createProducts)
router.get('/',getProducts)
router.get('/:id',getProductsById)
router.put('/:id',updateProduct)
router.delete('/:id',deleteProduct)

export default router