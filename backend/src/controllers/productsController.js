const service = require('../services/productsService');
const mapStatusHTTP = require('../utils/httpMap');

const getAllProducts = async (_req, res) => {
  const { status, data } = await service.getAllProducts();
  return res.status(mapStatusHTTP(status)).json(data);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await service.getProductById(id);
  if (status === 'NOT_FOUND') {
    return res.status(mapStatusHTTP(status)).json({ message: data.message });
  }
  return res.status(mapStatusHTTP(status)).json(data);
};

const registerProduct = async (req, res) => {
  const { name } = req.body;
  const { status, data } = await service.registerProduct(name);
  return res.status(mapStatusHTTP(status)).json(data);
};

const upProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  await service.upProduct(name, id);
  const { status, data } = await service.getProductById(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const dltProduct = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await service.dltProduct(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const getProducts = async (req, res) => {
  const { q } = req.query;
  const { status, data } = await service.getProducts(q);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  getAllProducts,
  getProductById,
  registerProduct,
  upProduct,
  dltProduct,
  getProducts,
};