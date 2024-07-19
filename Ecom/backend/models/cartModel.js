import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    price: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    }
});

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [cartItemSchema],
    totalQuantity: {
        type: Number,
        required: true,
        default: 0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Pre-save middleware to update totalQuantity and totalPrice
cartSchema.pre('save', function (next) {
    this.totalQuantity = this.items.reduce((acc, item) => acc + item.quantity, 0);
    this.totalPrice = this.items.reduce((acc, item) => acc + item.totalPrice, 0);
    next();
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
