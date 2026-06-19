const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    items:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product',
                required:true
            },

            quantity:{
                type:Number,
                required:true
            }
        }
    ],

    totalPrice:{
        type:Number,
        required:true
    },

    paymentStatus:{
        type:String,
        enum:['Pending','Paid'],
        default:'Pending'
    },
    razorpayOrderId:String,
    razorpayPaymentId:String,
    
    razorpayOrderId:{
        type:String
    },

    razorpayPaymentId:{
        type:String
    },

    status:{
        type:String,
        enum:['Pending','Processing','Shipped','Delivered'],
        default:'Pending'
    }
},
{
    timestamps:true
}
);

module.exports = mongoose.model('Order',orderSchema);