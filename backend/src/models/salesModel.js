const camelize = require('camelize');
const connection = require('./connection');

const getAllSales = async () => {
  const [sales] = await connection.execute(
    `SELECT sale_id, date, product_id, quantity 
      FROM sales s
      RIGHT JOIN sales_products sp
      ON s.id = sp.sale_id
      ORDER BY sale_id, product_id;`, 
  );

  return camelize(sales);
};

const getSalesById = async (id) => {
  const [sale] = await connection.execute(
    `SELECT date, product_id, quantity
      FROM sales s
      RIGHT JOIN sales_products sp
      ON s.id = sp.sale_id
      WHERE sale_id = ?
      ORDER BY sale_id, product_id;`,
    [id],
  );
  return camelize(sale);
};

const registerSale = async (data) => {
  const [{ insertId }] = await connection
    .execute('INSERT INTO sales (date) VALUES (NOW())');
  const insert = data.map(({ productId, quantity }) => connection
    .execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)', 
      [insertId, productId, quantity],
    ));
  await Promise.all(insert);
  return insertId;
};

const findSaleById = async (id) => {
  const [[sale]] = await connection
    .execute('SELECT * FROM sales WHERE id = ?', [id]);
  
  return camelize(sale);
};

const dltSale = async (id) => {
  await connection.execute('DELETE FROM sales WHERE id = ?', [id]);
  return id;
};

const upSale = async (saleId, productId, quantity) => {
  // Atualiza a quantidade no banco de dados
  await connection.execute(
    'UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?',
    [quantity, saleId, productId],
  );

  // Obtém os dados atualizados da venda após a atualização, incluindo a coluna date da tabela sales
  const [updatedSale] = await connection.execute(
    `SELECT s.date, sp.product_id, sp.quantity
     FROM sales s
     JOIN sales_products sp ON s.id = sp.sale_id
     WHERE s.id = ? AND sp.product_id = ?`,
    [saleId, productId],
  );

  // Formata os dados para retornar
  const formattedSale = {
    saleId: Number(saleId),
    productId: Number(productId),
    quantity: Number(quantity),
    date: updatedSale[0].date,
  };

  return formattedSale;
};

module.exports = {
  getAllSales,
  getSalesById,
  registerSale,
  findSaleById,
  dltSale,
  upSale,
};