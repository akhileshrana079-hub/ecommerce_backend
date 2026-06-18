const Cart = require('../models/Cart');
const Product= require('../models/Product');

const addToCart = async (req, res) => {

    try {

        const { productId, quantity } = req.body;

        let cart = await Cart.findOne({
            user: req.user.id
        });

        if (!cart) {

            cart = await Cart.create({
                user: req.user.id,
                items: []
            });
        }

        const itemIndex = cart.items.findIndex(
            item =>
                item.product.toString() === productId
        );

        if (itemIndex > -1) {

            cart.items[itemIndex].quantity += quantity;

        } else {

            cart.items.push({
                product: productId,
                quantity
            });

        }

        await cart.save();

        return res.status(200).json({
            success: true,
            cart
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const getCart = async (req, res) => {
    try {

        const cart = await Cart.findOne({
            user: req.user.id
        }).populate('items.product');

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        res.status(200).json({
            success: true,
            cart
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const removeFromCart = async (req, res) => {
    try {

        const { productId } = req.params;

        const cart = await Cart.findOne({
            user: req.user.id
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        cart.items = cart.items.filter(
            item => item.product.toString() !== productId
        );

        await cart.save();

        res.status(200).json({
            success: true,
            message: 'Product removed from cart',
            cart
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateCartQuantity = async (req, res) => {
    try {

        const { productId } = req.params;
        const { quantity } = req.body;

        const cart = await Cart.findOne({
            user: req.user.id
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        const item = cart.items.find(
            item => item.product.toString() === productId
        );

        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Product not found in cart'
            });
        }

        item.quantity = quantity;

        await cart.save();

        res.status(200).json({
            success: true,
            message: 'Quantity updated',
            cart
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    addToCart,
    getCart,
    removeFromCart,
    updateCartQuantity
}