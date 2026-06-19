const express = require('express');
const router = express.Router();

const protect = require('../middleware/authmiddleware');

const adminOnly = require('../middleware/adminMiddleware');

const upload = require('../middleware/uploadMiddleware');

const {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    addReview,
    getReviews
} = require('../controllers/productController');

router.post('/create/product',protect,adminOnly,createProduct);
router.get('/product',getAllProducts);
router.get('/product/:id',getSingleProduct);
router.put('/product/:id',protect,adminOnly,updateProduct);
router.delete('/product/:id',protect,adminOnly,deleteProduct);
router.post('/product/:id/review',protect,addReview);
router.get('/product/:id/reviews',getReviews);
router.post(
    '/upload',
    protect,
    adminOnly,
    upload.single('image'),
    (req,res)=>{

        res.status(200).json({
            success:true,
            image:req.file.path
        });

    }
);

module.exports = router;