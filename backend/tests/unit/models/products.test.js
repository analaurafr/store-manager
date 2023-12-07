const { expect } = require('chai');
const sinon = require('sinon');
const model = require('../../../src/models/productsModel');
const { productsMock } = require('../mocks/products.mock');

const connection = require('../../../src/models/connection');

describe('Testa PRODUCTS MODEL', function () {
  it('Testa se retorna todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([productsMock]);

    const allProducts = await model.getAllProducts();

    expect(allProducts).to.be.an('array');
    expect(allProducts).to.be.deep.equal(productsMock);
  });

  it('Testa se retorna produto por id', async function () {
    sinon.stub(connection, 'execute').resolves([[productsMock]][0]);

    const product = await model.getProductById(1);

    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal({
      id: 1,
      name: 'Martelo de Thor',
    });
  });

  it('Testa mensagem de erro', async function () {
    sinon.stub(connection, 'execute').resolves([[{ message: 'Product not found' }]]);

    const product = await model.getProductById(7);

    expect(product).to.be.an('object');
    expect(product).to.contain({ message: 'Product not found' });
  });

  it('Testa se registra produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

    const newInsertId = await model.registerProduct('Travesseiro');

    expect(newInsertId).to.be.a('number');
    expect(newInsertId).to.be.deep.equal(4);
  });

  it('Testa update de produto', async function () {
    const newProduct = { id: 4, name: 'Travesseiro' };
    sinon.stub(connection, 'execute').resolves({ affectedRows: 1 });

    const id = 4;
    const name = 'Travesseiro';

    const product = await model.upProduct(id, name);

    expect(product).to.be.a('object');
    expect(product).to.be.deep.equal(newProduct);
  });

  it('Testa se deleta produto', async function () {
    const id = 1;
    const affectedRows = 1;
    sinon.stub(connection, 'execute').resolves([{ affectedRows }]);

    const product = await model.dltProduct(id);

    expect(product).to.be.deep.equal(affectedRows);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});