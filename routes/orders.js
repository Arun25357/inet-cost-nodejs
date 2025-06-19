var express = require('express');
var router = express.Router();
var orderSchema = require('../models/order.model');
var productSchema = require('../models/product.model');

router.get('/', async function(req, res, next) {
    try {
        let orders = await orderSchema.find({}).populate('products.productId');
        res.send(orders);
    } catch (err) {
        res.status(500).send({ message: 'Error fetching orders', error: err });
    }
});

router.post('/add', async function(req, res, next) {
    try {
        let products = req.body.products.map(item => ({
            productId: item.productId,
            quantity: item.quantity
        }));
        
        let order = new orderSchema({
            userId: req.body.userId,
            products: products,
            totalAmount: req.body.totalAmount
        });
        
        await order.save();
        res.send({ message: 'Order created successfully', order: order });
    } catch (err) {
        res.status(500).send({ message: 'Error creating order', error: err });
    }
});

router.get('/:id', async function(req, res, next) {
    try {
        let order = await orderSchema.findById(req.params.id).populate('products.productId');
        if (order) {
            res.send(order);
        } else {
            res.status(404).send({ message: 'Order not found' });
        }
    } catch (err) {
        res.status(500).send({ message: 'Error fetching order', error: err });
    }
});

router.put('/update/:id', async function(req, res, next) {
    try {
        let order = await orderSchema.findByIdAndUpdate(req.params.id, {
            userId: req.body.userId,
            products: req.body.products,
            totalAmount: req.body.totalAmount
        }, { new: true }).populate('products.productId');
        if (order) {
            res.send({ message: 'Order updated successfully', order: order });
        } else {
            res.status(404).send({ message: 'Order not found' });
        }
    } catch (err) {
        res.status(500).send({ message: 'Error updating order', error: err });
    }
});

router.delete('/delete/:id', async function(req, res, next) {
    try {
        let order = await orderSchema.findByIdAndDelete(req.params.id);
        if (order) {
            res.send({ message: 'Order deleted successfully' });
        } else {
            res.status(404).send({ message: 'Order not found' });
        }
    } catch (err) {
        res.status(500).send({ message: 'Error deleting order', error: err });
    }
});

