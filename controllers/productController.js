const { get } = require('mongoose');
const Product = require('../models/Product');

const createProduct = async (req, res) => {

    try {

        const product = await Product.create(
            req.body
        );

        res.status(201).json({
            success: true,
            product
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const getSingleProduct = async(req,res)=>{
    try{
        const product = await Product.findById(
            req.params.id
        );
        if(!product){
            return res.status(401).json({
                sucess:false,
                message:'Product not Found'
            })
        }
        res.status(500).json({
            sucess:true,
            product
        })
    }catch(error){
        res.status(404).json({
            sucess:false,
            message:error.message
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product Not Found'
            });
        }
        return res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(
            req.params.id
        );
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product Not Found'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Product Deleted Successfully'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
};