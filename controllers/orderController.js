const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

const createOrder = async(req,res)=>{
    try{

        const cart = await Cart.findOne({
            user:req.user.id
        }).populate('items.product');

        if(!cart || cart.items.length===0){
            return res.status(400).json({
                success:false,
                message:'Cart is empty'
            });
        }

        let totalPrice = 0;

        cart.items.forEach(item=>{
            totalPrice += item.product.price * item.quantity;
        });

    for (const item of cart.items) {

    const product = await Product.findById(
        item.product._id
    );

    if (!product) {
        return res.status(404).json({
            success:false,
            message:'Product not found'
        });
    }

    if (product.stock < item.quantity) {
        return res.status(400).json({
            success:false,
            message:`Not enough stock for ${product.title}`
        });
    }

    product.stock -= item.quantity;

    await product.save();
}
        const order = await Order.create({
            user:req.user.id,
            items:cart.items,
            totalPrice
        });

        cart.items = [];
        await cart.save();

        res.status(201).json({
            success:true,
            order
        });
        await sendEmail(
        req.user.email,
        "Order Placed",
        `Your order has been placed successfully. Total Amount: ₹${totalPrice}`
        );

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

const getMyOrders = async(req,res)=>{
    try{
        const orders = await Order.find({
            user:req.user.id
        }).populate('items.product');

        res.status(200).json({
            success:true,
            orders
        });

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

const getSingleOrder = async (req, res) => {
    try {
        const order = await Order.findById(
            req.params.id
        )
        .populate('user', 'name email')
        .populate('items.product');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

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

const getAllOrders = async (req, res) => {
    try {

        const orders = await Order.find()
            .populate('user', 'name email')
            .populate('items.product');

        res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(
            req.params.id
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        order.status = req.body.status;

        await order.save();

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

module.exports= {
    createOrder,
    getMyOrders,
    getSingleOrder,
    getAllOrders,
    updateOrderStatus
}