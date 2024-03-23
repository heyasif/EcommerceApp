const express = require('express');
const connnectDB = require('./Config/db');
const ProductRouter = require('./Routes/Product.Router');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/products', ProductRouter);

app.listen(process.env.PORT, () => {
  connnectDB();
  console.log(`Server Running Port on ${process.env.PORT}`);
});
