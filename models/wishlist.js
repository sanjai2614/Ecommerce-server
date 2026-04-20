import mongoose from "mongoose";
import Product from '../models/product.js'
const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products"
  }
}, { timestamps: true });

export default mongoose.model("Wishlist", wishlistSchema);