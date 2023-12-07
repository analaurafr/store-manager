const { Router } = require('express');
const controller = require('../controllers/salesController');
const { 
  salesCheck, 
  salesQuantityCheck, 
  salesProductsCheck, 
  validateQuantitySale, 
  saleProductValid,
} = require('../middlewares/salesMiddlewares');

const salesRoutes = Router();

salesRoutes.post('/', salesCheck, salesQuantityCheck, salesProductsCheck, controller.registerSale);

salesRoutes.get('/', controller.getAllSales);

salesRoutes.get('/:id', controller.getSalesById);

salesRoutes.delete('/:id', salesCheck, controller.dltSale);

salesRoutes.put(
  '/:saleId/products/:productId/quantity',
  validateQuantitySale, 
  saleProductValid, 
  controller.upSale,
);

module.exports = salesRoutes;