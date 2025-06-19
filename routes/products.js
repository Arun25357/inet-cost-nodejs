var express = require('express');
var router = express.Router();
var productSchema = require('../models/product.model');

router.get('/', async function(req, res, next) {
  let products = await productSchema.find({});
  res.send(products);
});

router.get('/:id', async function(req, res, next) {
  let product = await productSchema.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
});

router.post('/add', async function(req, res, next) {
  let product = new productSchema({
    productId: req.body.productId, 
    productName: req.body.productName,
    productDescription: req.body.productDescription,
    productPrice: req.body.productPrice,
    productAmount: req.body.productAmount
  });
  await product.save();
  if (!product) {
    return res.status(500).send({ message: 'Error creating product'});
  }else {
  res.send({ message: 'Product created successfully', product: product });
}

});

router.put('/update/:id', async function(req, res, next) {
  let product = await productSchema.findByIdAndUpdate(req.params.id, {
    productName: req.body.productName,
    productDescription: req.body.productDescription,
    productPrice: req.body.productPrice,
    productAmount: req.body.productAmount
  }, { new: true });
    if (product) {
        res.send({ message: 'Product updated successfully', product: product });
    } else {
        
        res.status(404).send({ message: 'Product not found', error: 'Product not found' });
        
    }
});

router.delete('/delete/:id', async function(req, res, next) {
  let product = await productSchema.findByIdAndDelete(req.params.id);
  if (product) {
    res.send({ message: 'Product deleted successfully' });
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
});

module.exports = router;



