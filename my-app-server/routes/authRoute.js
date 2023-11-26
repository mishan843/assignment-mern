const express = require('express');
const { createUser, loginUserCtrl, getWishlist } = require('../controllers/userCtrl');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();


router.post('/register', createUser);
router.post('/login', loginUserCtrl);
router.get('/wishlist', authMiddleware, getWishlist);


module.exports = router;    
