const { Router } = require('express');
const controller = require('../controllers/salesController');

const salesRoutes = Router();

salesRoutes.get('/', controller.getAllSales);

salesRoutes.get('/:id', controller.getSalesById);

module.exports = salesRoutes;