# Ecommerce Backend API

A complete Ecommerce Backend built with Node.js, Express.js, MongoDB, JWT Authentication, Razorpay Payments, Nodemailer Email Notifications, and File Upload support.

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Admin Authorization

### Product Management

* Create Product
* Get All Products
* Get Single Product
* Update Product
* Delete Product
* Category Filtering

### Cart Management

* Add Product to Cart
* View Cart
* Update Cart Quantity
* Remove Product from Cart

### Order Management

* Create Order
* Get User Orders
* Update Order Status
* Order Tracking

### Payments

* Razorpay Order Creation
* Payment Verification
* Secure Payment Processing

### Email Notifications

* Welcome Email on Registration
* Order Confirmation Email


## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* Nodemailer
* Razorpay
* Multer
* dotenv

---

## Project Structure

controllers/
middleware/
models/
routes/
config/
uploads/
server.js

---

## API Endpoints

### Auth Routes

POST /api/auth/register

POST /api/auth/login

### Product Routes

POST /create/product

GET /product

GET /product/:id

PUT /product/:id

DELETE /product/:id

### Cart Routes

POST /cart

GET /cart

PUT /cart/:productId

DELETE /cart/:productId

### Order Routes

POST /order

GET /order

PUT /order/:id

### Payment Routes

POST /payment/create-order

POST /payment/verify

---

## Environment Variables

Create a .env file:

PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

EMAIL=[your_email@gmail.com](mailto:your_email@gmail.com)

EMAIL_PASSWORD=your_app_password

RAZORPAY_KEY_ID=your_razorpay_key

RAZORPAY_KEY_SECRET=your_razorpay_secret

---

## Installation

Clone the repository

git clone https://github.com/akhileshrana079-hub/ecommerce-backend.git

Install dependencies

npm install

Start server

npm run dev

---

## Future Improvements

* Product Reviews & Ratings
* Wishlist
* Coupons & Discounts
* Pagination
* Search & Sorting
* Docker Support
* Swagger Documentation
* AWS Deployment

---

## Author

Akhilesh Rana

Backend Developer | Node.js | Express.js | MongoDB
