const express = require('express');
const productRoute = require('./routes/productsRoutes');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar //
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.use('/products', productRoute);

module.exports = app;
