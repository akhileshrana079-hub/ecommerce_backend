const express = require('express');
const router = express.Router();

const adminOnly = require('../middleware/adminMiddleware');
const protect = require('../middleware/authMiddleware');

const { createOrder,getMyOrders ,getSingleOrder,getAllOrders,updateOrderStatus} = require('../controllers/orderController');

router.post('/order',protect,createOrder);
router.post('/my-orders',protect,getMyOrders);
router.get('/order/:id',protect,getSingleOrder);
router.get('/admin/order',protect,adminOnly,getAllOrders);
router.put('/admin/order/:id',protect,adminOnly,updateOrderStatus)



module.exports = router;