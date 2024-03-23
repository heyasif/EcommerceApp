const express = require('express');
const ProductModel = require('../Model/Product.Model');

const ProductRouter = express.Router();

ProductRouter.get('/', async (req, res) => {
  try {
    const filter = {};

    if (req.query.search) {
      filter.name = { $regex: req.query.search, $options: 'i' };
    }

    console.log(filter);

    const Products = await ProductModel.find(filter);
    res.status(200).json({ Products });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
});

ProductRouter.post('/', async (req, res) => {
  const {
    name, description, image, price,
  } = req.body;
  try {
    const newproduct = new ProductModel({
      name,
      description,
      image,
      price,

    });
    newproduct.save();
    res.status(200).json({ Message: 'Product Created Sucessfully', newproduct });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
});

ProductRouter.patch('/:productID', async (req, res) => {
  const { productID } = req.params;
  const payload = req.body;
  //   console.log(productID, payload);
  try {
    await ProductModel.findByIdAndUpdate(productID, payload);
    res.status(200).json({ Message: 'Product Update Sucessfully' });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
});

ProductRouter.delete('/:productID', async (req, res) => {
  const { productID } = req.params;
  try {
    await ProductModel.findByIdAndDelete(productID);
    res.status(200).json({ Message: 'Product Deleted Sucessfully' });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
});

// Get Single Product

ProductRouter.get('/:productID', async (req, res) => {
  const { productID } = req.params;
  try {
    const Product = await ProductModel.findById(productID);
    res.status(200).json({ Product });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
});
module.exports = ProductRouter;
