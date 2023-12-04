const salesMock = [
  {
    saleId: 1,
    date: '2023-11-22 17:51:02',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2023-11-22 17:51:02',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2023-11-22 17:51:02',
    productId: 3,
    quantity: 15,
  },
];

const salesMockId = [
  {
    date: '2021-03-22 19:51:02',
    productId: 1,
    quantity: 2,
  },
  {
    date: '2021-03-25 16:41:02',
    productId: 2,
    quantity: 2,
  },
];

const salesServiceMock = {
  status: 'SUCCESSFUL',
  data: salesMock,
};
  
const salesIdServiceMock = {
  status: 'SUCCESSFUL',
  data: salesMockId,
};

const salesIdServiceNotFoundMock = {
  status: 'NOT_FOUND',
  data: { message: 'Sale not found' },
};

module.exports = {
  salesMock,
  salesMockId,
  salesServiceMock,
  salesIdServiceMock,
  salesIdServiceNotFoundMock,
};