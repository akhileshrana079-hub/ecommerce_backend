const express = require('express');
const router = express.Router();

const protect = require('../middleware/authMiddleware');

const adminOnly = require('../middleware/adminMiddleware');

const {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');

router.post('/create/product',protect,adminOnly,createProduct);
router.get('/product',getAllProducts);
router.get('/product/:id',getSingleProduct);
router.put('/product/:id',protect,adminOnly,updateProduct);
router.delete('/product/:id',protect,adminOnly,deleteProduct);

module.exports = router;