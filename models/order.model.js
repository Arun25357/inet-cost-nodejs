const mongoose = require('mongoose');
const { Schema } = mongoose;
const orderSchema = new Schema({
    orderid: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    items: [{
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    totalPrice: { type: Number, required: true }

}, {
    timestamps: true
});

module.exports = mongoose.model('orders', orderSchema);