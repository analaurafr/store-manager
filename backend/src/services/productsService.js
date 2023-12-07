const model = require('../models/productsModel');

const getAllProducts = async () => {
  const products = await model.getAllProducts();
  return { status: 'SUCCESSFUL', data: products };
};

const getProductById = async (id) => {
  const product = await model.getProductById(id);
  if (!product) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
  return { status: 'SUCCESSFUL', data: product };
};

module.exports = {
  getAllProducts,
  getProductById,
};