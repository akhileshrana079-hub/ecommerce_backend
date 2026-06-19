const express = require('express');
const router = express.Router();

const protect = require('../middleware/authmiddleware');
const {createPaymentOrder,verifyPayment} = require("../controllers/paymentController");

router.post('/payment/create-order',protect,createPaymentOrder);
router.post( '/payment/verify',protect,verifyPayment);

module.exports = router;
