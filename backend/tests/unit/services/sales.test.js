const { expect } = require('chai');
const sinon = require('sinon');
const model = require('../../../src/models/salesModel');
const service = require('../../../src/services/salesService');
const { salesMock, productsIdSalesMock, soldsMock } = require('../mocks/sales.mock');

describe('Teste SALES SERVICE', function () {
  it('Testa se retorna todas as vendas', async function () {
    sinon.stub(model, 'getAllSales').resolves([salesMock]);

    const sales = await service.getAllSales();

    expect(sales.data).to.be.deep.equal([salesMock]);
    expect(sales.status).to.be.equal('SUCCESSFUL');
  });

  it('Testa se retorna array vazio', async function () {
    sinon.stub(model, 'getAllSales').resolves([]);

    const { status, data } = await service.getAllSales();

    expect(status).to.be.equal('SUCCESSFUL');
    expect(data).to.deep.equal([]);
  });

  it('Testa retorno "NOT_FOUND"', async function () {
    sinon.stub(model, 'getSalesById').resolves();

    const { status, data } = await service.getSalesById(99);

    expect(status).to.be.equal('NOT_FOUND');
    expect(data.message).to.be.deep.equal('Sale not found');
  });

  it('Testa retorno por id', async function () {
    sinon.stub(model, 'getSalesById').resolves([salesMock]);

    const { status, data } = await service.getSalesById(1);

    expect(status).to.be.equal('SUCCESSFUL');
    expect(data).to.be.deep.equal([salesMock]);
  });

  it('Testa mensagem de erro', async function () {
    sinon.stub(model, 'getSalesById').resolves([]);

    const { status, data } = await service.getSalesById(7);

    expect(status).to.be.equal('NOT_FOUND');
    expect(data.message).to.be.deep.equal('Sale not found');
  });

  it('Testa registro de venda', async function () {
    const insertId = 3;
    sinon.stub(model, 'registerSale').resolves(insertId);

    const { status, data } = await service.registerSale(productsIdSalesMock);

    expect(status).to.be.equal('CREATED');
    expect(data).to.be.deep.equal(soldsMock);
  });

  it('Testa se deleta venda', async function () {
    const deletedId = 3;
    sinon.stub(model, 'dltSale').resolves(deletedId);

    const { status } = await service.dltSale(deletedId);

    expect(status).to.be.equal('DELETED');
  });

  it('Testa retorno de erro', async function () {
    const deletedId = 7;

    sinon.stub(model, 'dltSale').resolves([[{ id: 7 }]]);

    const { status } = await service.dltSale(deletedId);
  
    expect(status).to.be.equal('DELETED');
  });
  
  afterEach(function () {
    sinon.restore();
  });
});