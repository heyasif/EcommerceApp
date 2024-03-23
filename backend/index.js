const express = require('express');
const connnectDB = require('./Config/db');
const ProductRouter = require('./Routes/Product.Router');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(express.json());
app.use('/products', ProductRouter);
app.use(cors());

app.listen(process.env.PORT, () => {
  connnectDB();
  console.log(`Server Running Port  ${process.env.PORT}`);
});
