const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const controller = require('../../../src/controllers/productsController');
const service = require('../../../src/services/productsService');
const { productsMock } = require('../mocks/products.mock');

chai.use(sinonChai);
const { expect } = chai;

describe('Teste PRODUCTS CONTROLLER', function () {
  it('Retorna todos os produtos', async function () {
    sinon.stub(service, 'getAllProducts').resolves({ status: 'SUCCESSFUL', data: productsMock });

    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await controller.getAllProducts(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.deep.calledWith(productsMock);
  });

  it('Teste se retorna produto por Id', async function () {
    sinon.stub(service, 'getProductById').resolves({ status: 'SUCCESSFUL', data: productsMock[0] });

    const req = {
      params: {
        id: 1,
      },
    };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  
    await controller.getProductById(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.deep.calledWith(productsMock[0]);
  });

  it('Testa retorno "NOT_FOUND"', async function () {
    sinon.stub(service, 'getProductById').resolves({ status: 'NOT_FOUND', data: { message: 'Product not found' } });

    const req = {
      params: {
        id: 7,
      },
    };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  
    await controller.getProductById(req, res);

    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.be.deep.calledWith({ message: 'Product not found' });
  });

  it('Testa se deleta produto', async function () {
    const res = {};
    const req = {
      params: 1,
    };

    const affectedRows = 1;

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    sinon.stub(service, 'dltProduct').resolves({ status: 'DELETED', data: affectedRows });

    await controller.dltProduct(req, res);

    expect(res.status).to.be.calledWith(204);
    expect(res.json).to.be.deep.calledWith(affectedRows);
  });

  it('Testa "NOT_FOUND" em deletar produto', async function () {
    const res = {};
    const req = {
      params: 7,
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    sinon.stub(service, 'dltProduct').resolves({ status: 'NOT_FOUND', data: { message: 'Product not found' } });

    await controller.dltProduct(req, res);

    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.be.deep.calledWith({ message: 'Product not found' });
  });

  it('Testa se registra produto', async function () {
    sinon.stub(service, 'registerProduct').resolves({ 
      status: 'CREATED', 
      data: {
        id: 4,
        name: 'Toalha de mesa',
      } });

    const req = {
      body: {
        name: 'Toalha de mesa',
      },
    };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await controller.registerProduct(req, res);

    expect(res.status).to.be.calledWith(201);
    expect(res.json).to.be.deep.calledWith({
      id: 4,
      name: 'Toalha de mesa',
    });
  });
  
  afterEach(function () {
    sinon.restore();
  });
});