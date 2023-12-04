const salesModels = require('../models/salesModel');

const getSalesAll = async () => {
  const sales = await salesModels.findAll();
  return {
    status: 'SUCCESSFUL',
    data: sales,
  };
};

const getSalesById = async (id) => {
  const sales = await salesModels.findById(id);
  if (sales.length === 0) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  return { status: 'SUCCESSFUL', data: sales };
};

module.exports = {
  getSalesAll,
  getSalesById,
};