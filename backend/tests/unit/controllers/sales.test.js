const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const service = require('../../../src/services/salesService');
const controller = require('../../../src/controllers/salesController');
const { salesMock, soldsMock, productsIdSalesMock } = require('../mocks/sales.mock');

chai.use(sinonChai);
const { expect } = chai;

describe('Testes SALES CONTROLLER', function () {
  it('Retorna vendas', async function () {
    sinon.stub(service, 'getAllSales').resolves({ status: 'SUCCESSFUL', data: salesMock });

    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await controller.getAllSales(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.deep.calledWith(salesMock);
  });

  it('Testa se retorna venda por Id', async function () {
    sinon.stub(service, 'getSalesById').resolves({ status: 'SUCCESSFUL', data: salesMock[0] });

    const req = {
      params: {
        id: 2,
      },
    };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await controller.getSalesById(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.deep.calledWith(salesMock[0]);
  });

  it('Testa retorno de erro', async function () {
    sinon.stub(service, 'getSalesById').resolves({ status: 'NOT_FOUND', data: { message: 'Sale not found' } });
    
    const req = {
      params: {
        id: 7,
      },
    };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await controller.getSalesById(req, res);

    expect(res.status).to.be.calledWith(404);
  });

  it('Testa registro de venda', async function () {
    const res = {};
    const req = {
      body: { 
        productsIdSalesMock,
      },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    sinon.stub(service, 'registerSale').resolves({ status: 'CREATED', data: soldsMock });

    await controller.registerSale(req, res);

    expect(res.status).to.be.calledWith(201);
    expect(res.json).to.be.deep.calledWith(soldsMock);
  });

  it('Teste delete venda', async function () {
    sinon.stub(service, 'dltSale').resolves({ status: 'DELETED' });

    const req = {
      params: {
        id: 3,
      },
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await controller.dltSale(req, res);

    expect(res.status).to.be.calledWith(204);
  });

  it('Testa erro em deletar venda', async function () {
    sinon.stub(service, 'dltSale').resolves({ status: 'NOT_FOUND' });

    const req = {
      params: {
        id: 7,
      },
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await controller.dltSale(req, res);

    expect(res.status).to.be.calledWith(404);
  });

  it('Deve atualizar a venda', async function () {
    const req = {
      params: {
        saleId: 1,
        productId: 1,
      },
      body: {
        quantity: 10,
      },
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    sinon.stub(service, 'upSale').resolves({ status: 'SUCCESSFUL', data: soldsMock });

    await controller.upSale(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.deep.calledWith(soldsMock);
  });

  afterEach(function () {
    sinon.restore();
  });
});