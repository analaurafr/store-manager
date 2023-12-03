const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const productService = require('../../../src/services/productsService');
const { productsMock, mockService } = require('../mocks/products.mock');
const productController = require('../../../src/controllers');

const { expect } = chai;
chai.use(sinonChai);

const req = { body: {}, params: {} };
const res = {
  status: sinon.stub().returnsThis(),
  json: sinon.stub(),
};

describe('Testa o controller : PRODUCTS CONTROLLER:', function () {
  it('Testa se recupera todos os produtos com sucesso', async function () {
    sinon
      .stub(productService, 'getProductsAll')
      .resolves(mockService);
        
    await productController.productsAll(req, res);
        
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsMock);
  });
});