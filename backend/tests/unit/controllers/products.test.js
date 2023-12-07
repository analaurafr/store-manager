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

  afterEach(function () {
    sinon.restore();
  });
});