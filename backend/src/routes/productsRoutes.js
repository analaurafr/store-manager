const { Router } = require('express');
const controller = require('../controllers/productsController');

const productsRoutes = Router();

productsRoutes.get('/', controller.getAllProducts);

productsRoutes.get('/:id', controller.getProductById);

module.exports = productsRoutes;