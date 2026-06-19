const express = require('express');
const router = express.Router();

const protect = require('../middleware/authmiddleware');

const {addToCart,getCart,removeFromCart,updateCart, updateCartQuantity,get} = require('../controllers/cartController');

router.post('/cart',protect,addToCart);
router.get('/cart',protect,getCart);
router.delete('/cart/:productId',protect,removeFromCart);
router.put('/cart/:productId',protect,updateCartQuantity);
module.exports = router;