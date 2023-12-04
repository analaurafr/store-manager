const express = require('express');
const { salesController } = require('../controllers');

const salesRoute = express.Router();

salesRoute.get('/', salesController.salesAll);
salesRoute.get('/:id', salesController.salesById);

module.exports = salesRoute;