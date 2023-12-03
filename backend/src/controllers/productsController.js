const productService = require('../services/productsService');
const mapStatusHTTP = require('../utils/httpMap');

const productsAll = async (_req, res) => {
  const { status, data } = await productService.getProductsAll();
  return res.status(mapStatusHTTP(status)).json(data);
};

const productsById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productService.getProductsById(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  productsAll,
  productsById,
};