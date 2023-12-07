const { Router } = require('express');
const controller = require('../controllers/productsController');
const { validateProducts } = require('../middlewares/validateProducts');

const productsRoutes = Router();

productsRoutes.post('/', validateProducts, controller.registerProduct);
productsRoutes.get('/', controller.getAllProducts);
productsRoutes.get('/:id', controller.getProductById);
productsRoutes.put('/:id', validateProducts, controller.upProduct);
productsRoutes.delete('/:id', controller.dltProduct);
productsRoutes.get('/search', controller.getProducts);

module.exports = productsRoutes;