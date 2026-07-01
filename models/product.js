import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id: Number,
    image: String,
    name: String,
    category: String,
    price: Number,
    discountPrice: Number,
    description: String,
    rating: String
}, { timestamps: true });

export default mongoose.model("Products", productSchema);
