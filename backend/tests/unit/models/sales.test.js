const { expect } = require('chai');
const sinon = require('sinon');
const model = require('../../../src/models/salesModel');
const connection = require('../../../src/models/connection');
const { salesMock, productsIdSalesMock } = require('../mocks/sales.mock');

describe('Testa SALES MODEL', function () {
  it('Testa se retorna todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([salesMock]);

    const sales = await model.getAllSales();

    expect(sales).to.be.an('array');
    expect(sales).to.be.deep.equal(salesMock);
  });

  it('Testa venda por id', async function () {
    sinon.stub(connection, 'execute').resolves([salesMock]);

    const sales = await model.getSalesById(1);

    expect(sales).to.be.an('array');
    expect(sales).to.be.deep.equal(salesMock);
  });

  it('Testa mensagem de erro', async function () {
    sinon.stub(connection, 'execute').resolves([{ 'Sales not found': 'Sale not found ' }]);

    const sales = await model.getSalesById(7);

    expect(sales).to.contain.property('Sales not found');
  });

  it('Testa registro de venda', async function () {
    const insertId = 3;
    sinon.stub(connection, 'execute').resolves([{ insertId }]);

    const sales = await model.registerSale(productsIdSalesMock);

    expect(sales).to.be.an('number');
    expect(sales).to.be.deep.equal(insertId);
  });

  it('Testa delete venda', async function () {
    const deleteId = 3;
    sinon.stub(connection, 'execute').resolves([[{ id: 3 }]]);

    const deletedSale = await model.dltSale(deleteId);

    expect(deletedSale).to.be.a('number');
    expect(deletedSale).to.be.deep.equal(deleteId);
  });

  afterEach(function () {
    sinon.restore();
  });
});