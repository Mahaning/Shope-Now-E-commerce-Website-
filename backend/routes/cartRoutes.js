import express from 'express';
import {
    getUserCart,
    addItemToCart,
    removeItemFromCart,
    clearCart
} from '../controllers/cartController.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Middleware or function to authenticate user and populate req.user
// Example middleware (assuming you have authentication middleware setup)
const authenticateUser = (req, res, next) => {
    // Implement your authentication logic here, e.g., using JWT or session
    // Assuming req.user is populated with user details after authentication
    req.user = { id: 'user_id_here' }; // Replace with actual authentication logic
    next();
};

// Routes for user's cart
router.get('/cart', requireSignIn, getUserCart); // Get user's cart
router.post('/add-to-cart', requireSignIn, addItemToCart); // Add item to cart
router.put('/cart/remove', requireSignIn, removeItemFromCart); // Remove item from cart
router.delete('/cart/clear', requireSignIn, clearCart); // Clear user's cart

export default router;
