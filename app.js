import express from 'express'
import cors from 'cors'
import productRoutes from './routes/productRoutes.js'
import authRoutes from './routes/authRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import wishlistRoutes from './routes/wishlistRoutes.js'
const app= express()
app.use(cors())
app.use(express.json())

app.use("/products",productRoutes)
app.use("/",authRoutes)
app.use('/cart',cartRoutes)
app.use('/contact',contactRoutes)
app.use('/wishlist',wishlistRoutes)


export default app