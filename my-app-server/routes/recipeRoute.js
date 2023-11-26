const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { addToWishlist } = require("../controllers/recipeCtrl");
const router = express.Router();


router.post("/wishlist", authMiddleware, addToWishlist);


module.exports = router;
