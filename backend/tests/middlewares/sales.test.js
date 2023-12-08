const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const salesMiddleware = require('../../src/middlewares/salesMiddlewares');

const { expect } = chai;
chai.use(sinonChai);

describe('Testa MIDDLEWARE SALES', function () {
  it('Testa mensagem de erro', async function () {
    const req = { body: [{ quantity: 1 }] };
    const res = {};
    const next = sinon.stub().returns();

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    salesMiddleware.salesCheck(req, res, next);

    expect(res.status).to.been.calledWith(400);
    expect(res.json).to.been.calledWith({ message: '"productId" is required' });
    expect(next).not.to.have.been.calledWith();
  });

  it('Testa mensagem de erro quantity', async function () {
    const req = { body: [{ productId: 1 }] };
    const res = {};
    const next = sinon.stub().returns();

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    salesMiddleware.salesCheck(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
    expect(next).not.to.have.been.calledWith();
  });

  it('Testa checagem de vendas', async function () {
    const req = { body: [{ productId: 1, quantity: 0 }] };
    const res = {};
    const next = sinon.stub().returns();

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    salesMiddleware.salesQuantityCheck(req, res, next);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
    expect(next).not.to.have.been.calledWith();
  });

  it('Testa função salesQuantityCheck', async function () {
    const req = { body: [{ productId: 1, quantity: 1 }] };
    const res = {};
    const next = sinon.stub().returns();

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    salesMiddleware.salesQuantityCheck(req, res, next);

    expect(next).to.have.been.calledWith();
  });

  it('Testa retorno de id e quantidade', async function () {
    const req = { body: [{ productId: 1, quantity: 1 }] };
    const res = {};
    const next = sinon.stub().returns();

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    salesMiddleware.salesCheck(req, res, next);

    expect(next).to.have.been.calledWith();
  });

  it('Testa retorno correto de função', async function () {
    const req = { body: [{ productId: 1, quantity: 1 }] };
    const res = {};
    const next = sinon.stub().returns();

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    salesMiddleware.salesQuantityCheck(req, res, next);

    expect(next).to.have.been.calledWith();
  });

  afterEach(function () {
    sinon.restore();
  });
});