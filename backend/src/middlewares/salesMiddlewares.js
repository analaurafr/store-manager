const productsModel = require('../models/productsModel');
const salesModel = require('../models/salesModel');

const salesCheck = (req, res, next) => {
  const sales = req.body;
  let messageCheck;

  const check = sales.map((sale) => {
    if (!sale.productId) {
      messageCheck = '"productId" is required';
      return false;
    }
    if (sale.quantity === undefined) {
      messageCheck = '"quantity" is required';
      return false;
    }
    return true;
  });

  if (check.includes(false)) {
    return res.status(400).json({ message: messageCheck });
  }

  next();
};

const salesQuantityCheck = (req, res, next) => {
  const sales = req.body;
  let messageCheck;

  const check = sales.map((sale) => {
    if (sale.quantity <= 0) {
      messageCheck = '"quantity" must be greater than or equal to 1';
      return false;
    }

    return true;
  });

  if (check.includes(false)) {
    return res.status(422).json({ message: messageCheck });
  }

  next();
};

const findProductId = async (sales) => {
  const product = await Promise.all(sales.map((sale) => {
    const productId = productsModel.getProductById(sale.productId);
    return productId;
  }));

  return product;
};

const salesProductsCheck = async (req, res, next) => {
  const sales = req.body;
  const products = await findProductId(sales);
  
  if (products.includes(undefined)) {
    return res.status(404).json({ message: 'Product not found' });
  }

  next();
};

const saleCheck = async (req, res, next) => {
  const { id } = req.params;
  const sale = await salesModel.findSaleById(id);

  if (sale === undefined) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  next();
};

const validateQuantitySale = async (req, res, next) => {
  const { quantity } = req.body;

  if (quantity === undefined) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (quantity <= 0) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

const saleProductValid = async (req, res, next) => {
  const { saleId, productId } = req.params;

  const product = await productsModel.getProductById(productId);
  if (!product) return res.status(404).json({ message: 'Product not found in sale' });

  const sale = await salesModel.getSalesById(saleId);
  if (!sale.length) return res.status(404).json({ message: 'Sale not found' });

  next();
};

module.exports = {
  salesCheck,
  salesQuantityCheck,
  salesProductsCheck,
  saleCheck,
  validateQuantitySale,
  saleProductValid,
};