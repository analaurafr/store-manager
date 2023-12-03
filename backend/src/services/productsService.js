const productModels = require('../models/productsModel');

const getProductsAll = async () => {
  const products = await productModels.findAll();
  return {
    status: 'SUCCESSFUL',
    data: products,
  };
};

const getProductsById = async (id) => {
  const product = await productModels.findById(id);
  if (!product) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  return { status: 'SUCCESSFUL', data: product };
};

module.exports = {
  getProductsAll,
  getProductsById,
};