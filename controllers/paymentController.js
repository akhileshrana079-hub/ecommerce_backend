const Order = require('../models/Order');
const crypto = require("crypto");
const razorpay = require('../config/razorpay');

const createPaymentOrder = async (req, res) => {
    try {
        const { amount } = req.body;

        const options = {
            amount: amount * 100,
            currency: 'INR'
        };
        const order =
            await razorpay.orders.create(options);

        res.status(200).json({
            success: true,
            order
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const verifyPayment = async (req, res) => {
    try {

        const {
            orderId,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        const body =
            razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(body.toString())
            .digest("hex");

        const isAuthentic =
            expectedSignature === razorpay_signature;

        if (!isAuthentic) {
            return res.status(400).json({
                success: false,
                message: "Payment Verification Failed"
            });
        }

        const order = await Order.findById(orderId);

        if(!order){
        return res.status(404).json({
        success:false,
        message:"Order not found"
    });
}
        order.paymentStatus = "Paid";
        order.status = "Processing";

        order.razorpayOrderId = razorpay_order_id;
        order.razorpayPaymentId = razorpay_payment_id;

        await order.save();
        const user = await User.findById(order.user);

        await sendEmail(
        user.email,
        "Payment Successful",
        "Your payment has been received successfully."
        );

        res.status(200).json({
            success:true,
            message:"Payment Verified Successfully",
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createPaymentOrder,
    verifyPayment
};