import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    id: Number,
    image: String,
    name: String,
    price: Number,
    discountPrice: Number,
    description: String,
    rating: String
});

export default mongoose.model("Products",productSchema);
