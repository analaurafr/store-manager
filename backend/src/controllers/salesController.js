const salesService = require('../services/salesService');
const mapStatusHTTP = require('../utils/httpMap');

const salesAll = async (_req, res) => {
  const { status, data } = await salesService.getSalesAll();
  return res.status(mapStatusHTTP(status)).json(data);
};

const salesById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.getSalesById(id);
  if (status !== 'SUCCESSFUL') return res.status(mapStatusHTTP(status)).json(data);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  salesAll,
  salesById,
};