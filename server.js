import dotenv from 'dotenv'
import app from './app.js'
import connectDb from './config/db.js'

dotenv.config();

connectDb();

const port =2000

app.listen(port,()=>console.log("Server Running",port))