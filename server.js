require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

const connectDB = require('./config/db');
connectDB();

app.use(express.json());

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth',authRoutes);

const productRoutes = require('./routes/productRoutes');
app.use(productRoutes);

const cartRoutes =require('./routes/cartRoutes');
app.use(cartRoutes);

const orderRoutes =require('./routes/orderRoutes');
app.use(orderRoutes);

const paymentRoutes =require('./routes/paymentRoutes');
app.use(paymentRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
 
