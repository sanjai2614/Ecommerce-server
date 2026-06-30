import Cart from "../models/cart.js";
import mongoose from "mongoose";

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
const { productId } = req.body;

    // console.log("BODY:", req.body);

    // ✅ validation
   if (!productId) {
  return res.status(400).json({ message: "Product ID required" });
}

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        products: [{ productId, quantity: 1 }]
      });
    } else {
      const index = cart.products.findIndex(
        item => item.productId.toString() === productId
      );

      if (index > -1) {
        cart.products[index].quantity += 1;
      } else {
        cart.products.push({ productId, quantity: 1 });
      }
    }

    await cart.save();

    res.status(200).json(cart);

  } catch (error) {
    console.log("ERROR:", error.message); // 🔥 IMPORTANT
    res.status(500).json({ message: error.message });
  }
};



export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    // console.log("PARAM:", userId); // 🔥 debug

    // if (!mongoose.Types.ObjectId.isValid(userId)) {
    //   return res.status(400).json({ message: "Invalid userId" });
    // }

    const cart = await Cart.findOne({ userId })
      .populate("products.productId");

    if (!cart) {
      return res.json({ products: [] });
    }

    res.json(cart);

  } catch (error) {
    console.log("GET CART ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const updateQuantity = async (req, res) => {
  const userId = req.user.id;

const { productId, action } = req.body;

if (!productId || !action) {
  return res.status(400).json({
    message: "Missing required fields",
  });
}
  const cart = await Cart.findOne({ userId });

  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const item = cart.products.find(
    p => p.productId.toString() === productId
  );

  if (!item) return res.status(404).json({ message: "Item not found" });

  if (action === "inc") item.quantity += 1;
  if (action === "dec") item.quantity -= 1;

  // ❌ remove if qty 0
  cart.products = cart.products.filter(p => p.quantity > 0);

  await cart.save();
  res.json(cart);
};



export const removeItem = async (req, res) => {
  const userId = req.user.id;
const { productId } = req.body;

  const cart = await Cart.findOne({ userId });

if (!cart) {
  return res.status(404).json({
    message: "Cart not found",
  });
}

cart.products = cart.products.filter(
  p => p.productId.toString() !== productId
);

await cart.save();

res.json(cart);
};