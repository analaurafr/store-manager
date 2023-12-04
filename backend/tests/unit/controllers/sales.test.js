const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const salesService = require('../../../src/services/salesService');
const salesController = require('../../../src/controllers/salesController');
const { salesServiceMock, salesIdServiceMock, salesIdServiceNotFoundMock } = require('../mocks/sales.mock');

const { expect } = chai;
chai.use(sinonChai);

const req = { body: {}, params: {} };
const res = {
  status: sinon.stub().returnsThis(),
  json: sinon.stub(),
};

describe('Testa o controller: SALES CONTROLLER:', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('deve chamar getSalesAll e retornar o status e os dados', async function () {
    // Configuração do serviço mock
    sinon.stub(salesService, 'getSalesAll').resolves(salesServiceMock);

    // Executa a função do controlador
    await salesController.salesAll(req, res);

    // Verificações
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesServiceMock.data);
  });

  it('deve chamar getSalesById e retornar o status e os dados', async function () {
    const saleId = 1;
    req.params.id = saleId;

    // Configuração do serviço mock
    sinon.stub(salesService, 'getSalesById').withArgs(saleId).resolves(salesIdServiceMock);

    // Executa a função do controlador
    await salesController.salesById(req, res);

    // Verificações
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesIdServiceMock.data);
  });

  it('deve retornar o status correto quando getSalesById falhar', async function () {
    const saleId = 1;
    req.params.id = saleId;

    // Configuração do serviço mock
    sinon.stub(salesService, 'getSalesById').withArgs(saleId).resolves(salesIdServiceNotFoundMock);

    // Executa a função do controlador
    await salesController.salesById(req, res);

    // Verificações
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(salesIdServiceNotFoundMock.data);
  });

  // Adicione mais testes para atender aos requisitos de cobertura
});
