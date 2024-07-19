# Shope Now  E-Commerce Website

## Overview

This is a full-featured e-commerce website built with the MERN stack (MongoDB, Express, React, Node.js). It provides various functionalities for users, admins, and delivery partners.

## Features

### User Features
- **Signup and Sign-In**: Users can create an account and log in to their account.
- **Cart Management**: Users can add products to their cart.
- **Profile Updates**: Users can update their profile information.
- **Order Placement**: Users can place orders online or choose cash on delivery.
- **Order Tracking**: Users can track their order history and status.
- **Product Details**: Users can view detailed information about products and see similar products.
- **Feedback**: Users can provide feedback on products.

### Admin Features
- **User Management**: Admins can manage user accounts and their orders.
- **Banner Management**: Admins can add and manage home page sliding banners.
- **Category Management**: Admins can add and manage product categories.
- **Product Management**: Admins can add, update, and delete products.
- **Coupon Management**: Admins can add and manage discount coupons.
- **Order Management**: Admins can manage user orders, including viewing, processing, shipping, and canceling orders.
- **User Feedback**: Admins can view feedback provided by users.
- **Sales Reporting**: Admins can view sales reports, including:
  - Total sales
  - Product sales
  - Sales per category
  - Monthly sales (bar chart, pie chart, line graph)
- **User Report**: Admins can view:
  - Total orders per customer (bar chart)
  - Orders distribution (pie chart)
- **Delivery Partner Management**: Admins can view the list of delivery partners.

### Delivery Partner Features
- **Order Processing**: Delivery partners handle product deliveries once orders are processed by the admin. 
- **Order Status**: Delivery partners can update the order status to shipped, delivered, or canceled.

### Payment Gateway
- **Integrated Payment Gateway**: Users can make payments online using integrated payment systems.



### Images
-### User Features

- **Signup and Sign-In**: Users can create an account and log in to their account.
  ![Signup and Sign-In](https://example.com/path/to/signup-signin-image.png)
  
- **Cart Management**: Users can add products to their cart.
  ![Cart Management](https://example.com/path/to/cart-management-image.png)
  
- **Profile Updates**: Users can update their profile information.
  ![Profile Updates](https://example.com/path/to/profile-updates-image.png)
  
- **Order Placement**: Users can place orders online or choose cash on delivery.
  ![Order Placement](https://example.com/path/to/order-placement-image.png)
  
- **Order Tracking**: Users can track their order history and status.
  ![Order Tracking](https://example.com/path/to/order-tracking-image.png)
  
- **Product Details**: Users can view detailed information about products and see similar products.
  ![Product Details](https://example.com/path/to/product-details-image.png)
  
- **Feedback**: Users can provide feedback on products.
  ![Feedback](https://example.com/path/to/feedback-image.png)

### Admin Features

- **User Management**: Admins can manage user accounts and their orders.
  ![User Management](https://example.com/path/to/user-management-image.png)
  
- **Banner Management**: Admins can add and manage home page sliding banners.
  ![Banner Management](https://example.com/path/to/banner-management-image.png)
  
- **Category Management**: Admins can add and manage product categories.
  ![Category Management](https://example.com/path/to/category-management-image.png)
  
- **Product Management**: Admins can add, update, and delete products.
  ![Product Management](https://example.com/path/to/product-management-image.png)
  
- **Coupon Management**: Admins can add and manage discount coupons.
  ![Coupon Management](https://example.com/path/to/coupon-management-image.png)
  
- **Order Management**: Admins can manage user orders, including viewing, processing, shipping, and canceling orders.
  ![Order Management](https://example.com/path/to/order-management-image.png)
  
- **User Feedback**: Admins can view feedback provided by users.
  ![User Feedback](https://example.com/path/to/user-feedback-image.png)
  
- **Sales Reporting**: Admins can view sales reports, including:
  - Total sales
    ![Total Sales](https://example.com/path/to/total-sales-image.png)
  - Product sales
    ![Product Sales](https://example.com/path/to/product-sales-image.png)
  - Sales per category
    ![Sales per Category](https://example.com/path/to/sales-per-category-image.png)
  - Monthly sales (bar chart, pie chart, line graph)
    ![Monthly Sales](https://example.com/path/to/monthly-sales-image.png)
  
- **User Report**: Admins can view:
  - Total orders per customer (bar chart)
    ![Total Orders per Customer](https://example.com/path/to/total-orders-per-customer-image.png)
  - Orders distribution (pie chart)
    ![Orders Distribution](https://example.com/path/to/orders-distribution-image.png)
  
- **Delivery Partner Management**: Admins can view the list of delivery partners.
  ![Delivery Partner Management](https://example.com/path/to/delivery-partner-management-image.png)

### Delivery Partner Features

- **Order Processing**: Delivery partners handle product deliveries once orders are processed by the admin.
  ![Order Processing](https://example.com/path/to/order-processing-image.png)
  
- **Order Status**: Delivery partners can update the order status to shipped, delivered, or canceled.
  ![Order Status](https://example.com/path/to/order-status-image.png)

### Payment Gateway

- **Integrated Payment Gateway**: Users can make payments online using integrated payment systems.
  ![Payment Gateway](https://example.com/path/to/payment-gateway-image.png)

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/your-repository.git
   ```
2. **Navigate to the Project Directory**
```
cd your-repository
```
3. **Install Dependencies**

Backend:
```
cd backend
npm install
```
Frontend:
```
cd ../frontend
npm install
```
4. **Set Up Environment Variables:**
Create a .env file in the root directory and add the necessary environment variables, such as database connection strings, API keys, etc.

In BackEnd .env:
```
PORT=8080
DEV_MODE=devlopment
MONGO_URL=YOUR_MONGO_URL
JWT_SECRET= YOUR_JWT_SECRET
BRAINTREE_MERCHANT_ID=YOUR_BRAINTREE_MERCHANT_ID
BRAINTREE_PUBLIC_KEY=YOUR_BRAINTREE_PUBLIC_KEY
BRAINTREE_PRIVATE_KEY=YOUR_BRAINTREE_PRIVATE_KEY
EMAIL_HOST:YOUR_EMAIL_HOST  (ex: smtp.gmail.com)
EMAIL_PORT:YOUR_EMAIL_PORT (ex: 587)
EMAIL_USER=YOUR_EMAIL_USER  (Your Email Id)
EMAIL_PASS=YOUR_EMAIL_PASS
```

In Frontend .env:
```
REACT_APP_API=YOUR_URL (ex: http://localhost:8080)
```

5. **Start the Application**
Backend:
```
cd backend
npm start
```
Frontend::
```
cd ../frontend
npm start
```
6. **Usage**
Access the website at http://localhost:3000.
For administrative tasks, log in with admin credentials.
Delivery partners can log in with their specific credentials.

Contact
For any questions or support, please contact: Gmail :hmaning45@gmail.com , LinkedIn : https://www.linkedin.com/in/mahaning-hubballi-76b796222/