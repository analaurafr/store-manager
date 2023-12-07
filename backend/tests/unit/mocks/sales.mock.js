const salesMock = [
  {
    saleId: 1,
    date: '2023-11-27T02:37:42.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2023-11-27T02:37:42.000Z',
    productId: 2,
    quantity: 10, 
  },
];

const productsIdSalesMock = [
  {
    productId: 1,
    quantity: 5,
  },
  {
    productId: 2,
    quantity: 10,
  },
];

const soldsMock = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 5,
    },
    {
      productId: 2,
      quantity: 10,
    },
  ],
};

module.exports = {
  salesMock,
  productsIdSalesMock,
  soldsMock,
};