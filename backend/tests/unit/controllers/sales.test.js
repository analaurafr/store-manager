const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const service = require('../../../src/services/salesService');
const controller = require('../../../src/controllers/salesController');
const { salesMock } = require('../mocks/sales.mock');

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

  afterEach(function () {
    sinon.restore();
  });
});