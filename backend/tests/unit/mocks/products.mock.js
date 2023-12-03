const productsMock = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
];

const mockService = {
  status: 'SUCCESSFUL',
  data: productsMock,
};
module.exports = {
  productsMock,
  mockService,
};
