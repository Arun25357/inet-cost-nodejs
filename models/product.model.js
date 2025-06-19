
const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    productId: { type: String, required: true, unique: true },
    productName: { type: String, required: true },
    productDescription: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productAmount: { type: Number, required: true }
},{
    timestamps: true
});

module.exports = mongoose.model('products', productSchema);