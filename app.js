import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import productRoutes from './routes/productRoutes.js'
import authRoutes from './routes/authRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import wishlistRoutes from './routes/wishlistRoutes.js'

const FRONTEND_URL=process.env.FRONTEND_URL

const app= express()
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser())

app.use("/products",productRoutes)
app.use("/",authRoutes)
app.use('/cart',cartRoutes)
app.use('/contact',contactRoutes)
app.use('/wishlist',wishlistRoutes)


export default app