import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
    coupon: {
        type: String,
        required: true
    },
    couponCode: {
        type: String,
        required: true,
        unique: true // Ensure unique coupon codes
    },
    discountPercentage: {
        type: Number, // Changed to Number
        required: true
    },
    maxDiscountPrice: {
        type: Number, // Changed to Number
        required: true
    },
    expires: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Number,
        enum: [0, 1, 2], // 0-active, 1-deactive, 2-expired
        required: true,
        default: 0
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Coupon = mongoose.model('Coupon', couponSchema);

export default Coupon;
