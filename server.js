require('dotenv').config();
const express = require('express');
const app = express();

const connectDB = require('./config/db');
connectDB();

app.use(express.json());

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth',authRoutes);

const productRoutes = require('./routes/productRoutes');
app.use(productRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
 
