import Cart from '../models/cartModel.js';
import Product from '../models/productsModel.js'; // Import Product model if not imported

// Controller to get user's cart
export const getUserCart = async (req, res) => {
    const userId = req.user.id; // Assuming userId is available in req.user after authentication
    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const addItemToCart = async (req, res) => {
    const userId = req.user.id; // Assuming userId is available in req.user after authentication
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity <= 0) {
        return res.status(400).json({ message: 'Invalid product ID or quantity' });
    }

    try {
        let cart = await Cart.findOne({ userId });

        // If cart doesn't exist, create a new one
        if (!cart) {
            cart = new Cart({
                userId,
                items: []
            });
        }

        // Check if item already exists in cart
        const index = cart.items.findIndex(item => item.productId.toString() === productId);
        if (index !== -1) {
            // Item exists, update quantity and total price
            cart.items[index].quantity += quantity;
            cart.items[index].totalPrice = cart.items[index].price * cart.items[index].quantity;
        } else {
            // Item doesn't exist, add new item to cart
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            const newItem = {
                productId,
                quantity,
                price: product.sellingPrice,
                totalPrice: product.sellingPrice * quantity
            };
            cart.items.push(newItem);
        }

        // Calculate total quantity and total price for the cart
        cart.totalQuantity = cart.items.reduce((total, item) => total + item.quantity, 0);
        cart.totalPrice = cart.items.reduce((total, item) => total + item.totalPrice, 0);

        // Save or update the cart
        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Controller to remove item from cart
export const removeItemFromCart = async (req, res) => {
    const userId = req.user.id; // Assuming userId is available in req.user after authentication
    const { productId } = req.body;
    try {
        let cart = await Cart.findOne({ userId });

        // If cart doesn't exist, return error
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Find index of item in cart items array
        const index = cart.items.findIndex(item => item.productId.toString() === productId);
        if (index !== -1) {
            // Remove item from items array
            cart.items.splice(index, 1);

            // Calculate total quantity and total price for the cart
            cart.totalQuantity = cart.items.reduce((total, item) => total + item.quantity, 0);
            cart.totalPrice = cart.items.reduce((total, item) => total + item.totalPrice, 0);

            // Save updated cart
            await cart.save();
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to clear all items from cart
export const clearCart = async (req, res) => {
    const userId = req.user.id; // Assuming userId is available in req.user after authentication
    try {
        const cart = await Cart.findOneAndDelete({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
