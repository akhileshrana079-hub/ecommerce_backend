const express = require('express');
const router = express.Router();

const protect = require('../middleware/authMiddleware');

const adminOnly = require('../middleware/adminMiddleware');

const {createProduct,getAllProducts} = require('../controllers/productController');

router.post('/product',protect,adminOnly,createProduct);
router.get('/',getAllProducts);

module.exports = router;