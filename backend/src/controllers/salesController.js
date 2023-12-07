const service = require('../services/salesService');
const mapStatusHTTP = require('../utils/httpMap');

const getAllSales = async (_req, res) => {
  const { status, data } = await service.getAllSales();
  return res.status(mapStatusHTTP(status)).json(data);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await service.getSalesById(id);
  if (status === 'NOT_FOUND') {
    return res.status(mapStatusHTTP(status)).json({ message: data.message });
  }
  return res.status(mapStatusHTTP(status)).json(data);
};

const registerSale = async (req, res) => {
  const dataList = req.body;
  const { status, data } = await service.registerSale(dataList);
  return res.status(mapStatusHTTP(status)).json(data);
};

const dltSale = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await service.dltSale(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const upSale = async (req, res) => {
  const { saleId, productId } = req.params;
  const { quantity } = req.body;

  const { status, data } = await service.upSale(saleId, productId, quantity);

  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  getAllSales,
  getSalesById,
  registerSale,
  dltSale,
  upSale,
};
