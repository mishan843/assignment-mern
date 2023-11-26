const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");


const addToWishlist = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { recipeId } = req.body;
    try {
      const user = await User.findById(_id);
      const alreadyadded = user.wishlist.find((id) => id.toString() === recipeId);
      if (alreadyadded) {
        let user = await User.findByIdAndUpdate(
          _id,
          {
            $pull: { wishlist: recipeId },
          },
          {
            new: true,
          }
        );
        res.json(user);
      } else {
        let user = await User.findByIdAndUpdate(
          _id,
          {
            $push: { wishlist: recipeId },
          },
          {
            new: true,
          }
        );
        res.json(user);
      }
    } catch (error) {
      throw new Error(error);
    }
  });

  module.exports = {addToWishlist}