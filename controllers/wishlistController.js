import Wishlist from "../models/wishlist.js";


// add to wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const exist = await Wishlist.findOne({ userId, productId });

    if (exist) {
      return res.json({ msg: "Already liked ❤️" });
    }

    const item = await Wishlist.create({ userId, productId });

    res.json({
      msg: "Added to wishlist ❤️",
      item
    });

  } catch (error) {
    console.log("Add Wishlist Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// get wishlist

export const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    const items = await Wishlist
      .find({ userId })
      .populate("productId");

    res.json(items);

  } catch (error) {
    console.log("Wishlist Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// remove wishlist

export const removeWishlist = async(req,res)=>{
    const {userId,productId}=req.body
    await Wishlist.findOneAndDelete({userId,productId})
    res.json("removed like")
}