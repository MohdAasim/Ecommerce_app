const productService = require('../services/productService'); // Import the service

// Controller to handle the request for all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await productService.getProducts(req.query); // Call the service function with query params

    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

exports.createProduct = async (req, res) => {
    try {
      const newProduct = await productService.createProduct(req.body);
      res.status(201).json({
        message: 'Product created successfully',
        product: newProduct,
      });
    } catch (error) {
      const status = error.statusCode || 500;
      res.status(status).json({ message: error.message });
    }
  };

exports.getProductById = async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await productService.getProductById(productId);
  
      res.status(200).json({ product });
    } catch (error) {
      const status = error.statusCode || 500;
      res.status(status).json({ message: error.message });
    }
  };
  