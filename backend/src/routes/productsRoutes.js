const express = require('express');
const { productController } = require('../controllers');

const productRoute = express.Router();

productRoute.get('/', productController.productsAll);
productRoute.get('/:id', productController.productsById);

module.exports = productRoute;