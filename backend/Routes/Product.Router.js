const express = require('express');
const ProductModel = require('../Model/Product.Model');

const ProductRouter = express.Router();

ProductRouter.get('/', async (req, res) => {
  try {
    const filter = {};
    const sort = {};
    const { page } = req.query;
    const { limit } = req.query;
    const skipValue = page * limit - limit;
    console.log(page);

    if (req.query.search) {
      filter.name = { $regex: req.query.search, $options: 'i' };

      // Sorting
    }

    // console.log(filter);
    // console.log(sort);
    if (req.query.sort && req.query.order) {
      sort[req.query.sort] = req.query.order === 'desc' ? -1 : 1;
    } else {
      sort.price = 1;
    }

    const totalProducts = await ProductModel.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);

    if (page) {
      const Products = await ProductModel.find(filter).sort(sort).limit(limit).skip(skipValue);
      res.status(200).json({
        totalPages, currentPage: page, totalProducts, Products,
      });
    } else {
      const Products = await ProductModel.find(filter).sort(sort);
      res.status(200).json({ totalPages, totalProducts, Products });
    }
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
});

ProductRouter.post('/', async (req, res) => {
  const {
    name, description, image, price,
  } = req.body;

  if (!name || !description || !price) {
    return res.status(200).json({ Message: 'All fields are required' });
  }

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
