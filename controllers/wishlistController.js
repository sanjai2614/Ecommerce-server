import Wishlist from "../models/wishlist.js";

// Add to Wishlist
export const addToWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    const exist = await Wishlist.findOne({ userId, productId });

    if (exist) {
      return res.json({
        msg: "Already liked ❤️",
      });
    }

    const item = await Wishlist.create({
      userId,
      productId,
    });

    res.json({
      msg: "Added to wishlist ❤️",
      item,
    });

  } catch (error) {
    console.log("Add Wishlist Error:", error.message);

    res.status(500).json({
      error: error.message,
    });
  }
};

// Get Wishlist
export const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;

    const items = await Wishlist.find({
      userId,
    }).populate("productId");

    res.json(items);

  } catch (error) {
    console.log("Wishlist Error:", error.message);

    res.status(500).json({
      error: error.message,
    });
  }
};

// Remove Wishlist
export const removeWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    await Wishlist.findOneAndDelete({
      userId,
      productId,
    });

    res.json({
      msg: "Removed from wishlist",
    });

  } catch (error) {
    console.log("Remove Wishlist Error:", error.message);

    res.status(500).json({
      error: error.message,
    });
  }
};