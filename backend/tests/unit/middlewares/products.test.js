const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const middlewares = require('../../../src/middlewares/validateProducts');

chai.use(sinonChai);

const { expect } = chai;

describe('Testa PRODUCTS MIDDLEWARES', function () {
  it('Testa se retorna mensagem de erro', function () {
    const data = { name: 'Azul' };
    const req = { body: data };
    const res = { status:
      sinon.stub().returns({ json: sinon.stub() }) };
    const next = sinon.stub().returns();

    middlewares(req, res, next);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.status().json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
  });

  afterEach(sinon.restore);
});