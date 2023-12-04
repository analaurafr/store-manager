const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const query = `SELECT sale_id, date, product_id, 
  quantity FROM sales_products sp
  INNER JOIN sales s ON sp.sale_id = s.id
  ORDER BY sp.sale_id ASC, product_id ASC;`;
  const [sales] = await connection.execute(query);
  return camelize(sales);
};

const findById = async (id) => {
  const query = `SELECT date, product_id, quantity FROM sales_products sp 
  INNER JOIN sales s ON sp.sale_id = s.id
  WHERE sale_id = ?
  ORDER BY sp.sale_id ASC, product_id ASC`;
  const [sale] = await connection.execute(query, [id]);
  return camelize(sale);
};

module.exports = {
  findById,
  findAll,
};