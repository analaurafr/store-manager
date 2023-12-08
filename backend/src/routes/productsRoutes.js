const { Router } = require('express');
const controller = require('../controllers/productsController');
const { productsCheck } = require('../middlewares/productsMiddlewares');

const productsRoutes = Router();

productsRoutes.post('/', productsCheck, controller.registerProduct);
productsRoutes.get('/', controller.getAllProducts);
productsRoutes.get('/:id', controller.getProductById);
productsRoutes.put('/:id', productsCheck, controller.upProduct);
productsRoutes.delete('/:id', controller.dltProduct);
productsRoutes.get('/search', controller.getProducts);

module.exports = productsRoutes;