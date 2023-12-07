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

const registerSale = async (data) => {
  const insertId = await model.registerSale(data);
  const newData = {
    id: insertId,
    itemsSold: data.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    })),
  };
  return { status: 'CREATED', data: newData };
};

const dltSale = async (id) => {
  await model.dltSale(id);
  return { status: 'DELETED' };
};

const upSale = async (saleId, productId, quantity) => {
  const updatedSale = await model.upSale(saleId, productId, quantity);
  return { status: 'SUCCESSFUL', data: updatedSale };
};

module.exports = {
  getAllSales,
  getSalesById,
  registerSale,
  dltSale,
  upSale,
};