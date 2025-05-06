const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

exports.createProduct = async (req, res) => {
    try {
      const { name, description, price, image_url, category } = req.body;
  
      // Basic validation
      if (!name || !price) {
        return res.status(400).json({ message: 'Name and price are required.' });
      }
  
      const newProduct = await Product.create({
        name,
        description,
        price,
        image_url,
        category,
      });
  
      res.status(201).json({
        message: 'Product created successfully',
        product: newProduct,
      });
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  exports.getProductById = async (req, res) => {
    try {
      const productId = req.params.id;
  console.log(productId,"here")
      // Find product by id
      const product = await Product.findByPk(productId);
  
      // Check if the product exists
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Return the product data
      return res.status(200).json({ product });
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  };
  