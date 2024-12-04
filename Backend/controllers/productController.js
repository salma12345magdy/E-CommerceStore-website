const Product = require('../models/productModel'); 


const createProduct = async (req, res) => {
  const { name, price, category, image } = req.body; 

  const product = new Product({
    name,
    price,
    category,
    image,
  });

  try {
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: 'Error saving product', error: err });
  }
};


const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving products', error: err });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving product', error: err });
  }
};


const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }); // استخدام id
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating product', error: err });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id); 
    if (deletedProduct) {
      res.status(200).json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product', error: err });
  }
};



const getProductsByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const products = await Product.find({ category: category });
    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ message: `No products found in category: ${category}` });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving products by category', error: err });
  }
};




module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory
};

