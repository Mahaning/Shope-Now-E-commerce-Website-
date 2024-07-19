import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    actualPrice: {
        type: Number,
        required: true
    },
    sellingPrice: {
        type: Number
    },
    totalQuantity: {
        type: Number,
        required: true
    },
    remainingQuantity: {
        type: Number,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productImg: {
        data: Buffer,
        contentType:String

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
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps:true});

const Product = mongoose.model('Product', productSchema);

export default Product;
