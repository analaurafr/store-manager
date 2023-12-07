const model = require('../models/salesModel');

const getAllSales = async () => {
  const sales = await model.getAllSales();
  return { status: 'SUCCESSFUL', data: sales };
};

const getSalesById = async (id) => {
  const sale = await model.getSalesById(id);
  
  if (!sale || sale.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }
  return { status: 'SUCCESSFUL', data: sale };
};

module.exports = {
  getAllSales,
  getSalesById,
};