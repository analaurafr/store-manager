const { expect } = require('chai');
const sinon = require('sinon');
const service = require('../../../src/services/productsService');
const model = require('../../../src/models/productsModel');
const { productsMock } = require('../mocks/products.mock');

describe('Testa PRODUCTS SERVICE', function () {
  it('Testa retorna todos os produtos', async function () {
    sinon.stub(model, 'getAllProducts').resolves(productsMock);
    
    const allProducts = await service.getAllProducts();
  
    expect(allProducts.data).to.be.deep.equal(productsMock);
    expect(allProducts.status).to.be.equal('SUCCESSFUL');
  });

  it('Testa se retorna array vazio', async function () {
    sinon.stub(model, 'getAllProducts').resolves([]);

    const { status, data } = await service.getAllProducts();

    expect(status).to.be.equal('SUCCESSFUL');
    expect(data).to.deep.equal([]);
  });

  it('Testa se retorna produto por id', async function () {
    sinon.stub(model, 'getProductById').resolves(productsMock[0]);

    const product = await service.getProductById(1);

    expect(product.data).to.be.deep.equal(productsMock[0]);
    expect(product.status).to.be.equal('SUCCESSFUL');
  });

  it('Testa se deleta produto', async function () {
    const id = 1;
    const affectedRows = 1;
    sinon.stub(model, 'dltProduct').resolves(affectedRows);

    const product = await service.dltProduct(id);

    expect(product.data).to.be.deep.equal(affectedRows);
    expect(product.status).to.be.equal('DELETED');
  });

  it('Testa registro de produto', async function () {
    const insertId = 4;
    sinon.stub(model, 'registerProduct').resolves(insertId);

    const product = 'Copo descartável';
    const { status, data } = await service.registerProduct(product);

    expect(status).to.be.equal('CREATED');
    expect(data).to.be.an('object');
    expect(data).to.be.deep.equal({ 
      id: 4, 
      name: 'Copo descartável',
    });
  });

  it('Testa função de update', async function () {
    sinon.stub(model, 'upProduct').resolves({ id: 4, name: 'Tênis' });

    const id = 4;
    const product = 'Tênis';
    const { status, data } = await service.upProduct(id, product);

    expect(status).to.be.equal('SUCCESSFUL');
    expect(data).to.be.deep.equal({
      id: 4, 
      name: 'Tênis',
    });
    expect(data).to.be.an('object');
  });

  it('Testa retorno de todos os produtos', async function () {
    sinon.stub(model, 'getAllProducts').resolves(productsMock);
    
    const allProducts = await service.getAllProducts();
  
    expect(allProducts.data).to.be.deep.equal(productsMock);
    expect(allProducts.status).to.be.equal('SUCCESSFUL');
  });

  it('Testa retorno de array vazio para getAllProducts', async function () {
    sinon.stub(model, 'getAllProducts').resolves([]);

    const { status, data } = await service.getAllProducts();

    expect(status).to.be.equal('SUCCESSFUL');
    expect(data).to.deep.equal([]);
  });

  it('Testa retorno de produto por ID', async function () {
    sinon.stub(model, 'getProductById').resolves(productsMock[0]);

    const product = await service.getProductById(1);

    expect(product.data).to.be.deep.equal(productsMock[0]);
    expect(product.status).to.be.equal('SUCCESSFUL');
  });

  it('Testa deleção de produto', async function () {
    const id = 1;
    const affectedRows = 1;
    sinon.stub(model, 'dltProduct').resolves(affectedRows);

    const product = await service.dltProduct(id);

    expect(product.data).to.be.deep.equal(affectedRows);
    expect(product.status).to.be.equal('DELETED');
  });

  it('Testa registro', async function () {
    const insertId = 4;
    sinon.stub(model, 'registerProduct').resolves(insertId);

    const product = 'Copo descartável';
    const { status, data } = await service.registerProduct(product);

    expect(status).to.be.equal('CREATED');
    expect(data).to.be.an('object');
    expect(data).to.be.deep.equal({ 
      id: 4, 
      name: 'Copo descartável',
    });
  });

  it('Testa atualização de produto', async function () {
    const id = 4;
    const product = 'Tênis';
    sinon.stub(model, 'upProduct').resolves({ id: 4, name: 'Tênis' });

    const { status, data } = await service.upProduct(id, product);

    expect(status).to.be.equal('SUCCESSFUL');
    expect(data).to.be.an('object');
    expect(data).to.be.deep.equal({
      id: 4, 
      name: 'Tênis',
    });
  });

  it('Testa registro de produto com sucesso', async function () {
    const productName = 'Novo Produto';
    const insertId = 123;
    sinon.stub(model, 'registerProduct').resolves(insertId);

    const result = await service.registerProduct(productName);

    expect(result.status).to.be.equal('CREATED');
    expect(result.data).to.be.deep.equal({ id: insertId, name: productName });
  });

  it('Testa se retorna "NOT_FOUND"', async function () {
    sinon.stub(model, 'getProductById').resolves();

    const { status, data } = await service.getProductById(99);

    expect(status).to.be.equal('NOT_FOUND');
    expect(data.message).to.be.deep.equal('Product not found');
  });

  it('Testa se retorna "NOT_FOUND" para dltProduct quando o produto não é encontrado', async function () {
    const id = 99;
    sinon.stub(model, 'dltProduct').resolves(0);
  
    const { status, data } = await service.dltProduct(id);
  
    expect(status).to.be.equal('NOT_FOUND');
    expect(data.message).to.be.deep.equal('Product not found');
  });
  
  it('Testa se retorna "NOT_FOUND" para upProduct quando o produto não é encontrado', async function () {
    const id = 99;
    sinon.stub(model, 'upProduct').resolves(0);
  
    const { status, data } = await service.upProduct(id, 'New Name');
  
    expect(status).to.be.equal('NOT_FOUND');
    expect(data.message).to.be.deep.equal('Product not found');
  });

  afterEach(function () {
    sinon.restore();
  });
});