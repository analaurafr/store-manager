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

const registerProduct = async (productName) => {
  const insertId = await model.registerProduct(productName);
  const product = {
    id: insertId,
    name: productName,
  };
  return { status: 'CREATED', data: product };
};

const upProduct = async (name, id) => {
  const affectedRows = await model.upProduct(name, id);
  if (affectedRows === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
  return { status: 'SUCCESSFUL', data: affectedRows };
};

const dltProduct = async (id) => {
  const affectedRows = await model.dltProduct(id);
  if (affectedRows === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
  return { status: 'DELETED', data: affectedRows };
};

const getProducts = async (q) => {
  if (!q || q.length === 0) {
    const prod = await model.getAllProducts();
    return { status: 'SUCCESSFUL', data: prod };
  }

  const products = await model.getProducts(q);
  
  if (products.length === 0) {
    return { status: 'SUCCESSFUL', data: [] };
  }
  return { status: 'SUCCESSFUL', data: products };
};

module.exports = {
  getAllProducts,
  getProductById,
  registerProduct,
  upProduct,
  dltProduct,
  getProducts,
};