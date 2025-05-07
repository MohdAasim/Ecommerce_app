const { Op } = require('sequelize');
const Product = require('../models/Product');  // Assuming your Product model is in the 'models' folder

// Function to get all products with filters and pagination
const getProducts = async (queryParams) => {
  const page = parseInt(queryParams.page) || 1; // default page 1
  const limit = parseInt(queryParams.limit) || 10; // default 10 items per page
  const offset = (page - 1) * limit;

  const { search, category, minPrice, maxPrice, rating } = queryParams;

  // Building the where clause dynamically based on filters
  let where = {};

  if (search) {
    where[Op.or] = [
      { name: { [Op.like]: `%${search}%` } },
      { description: { [Op.like]: `%${search}%` } }
    ];
  }

  if (category) {
    where.category = category;
  }

  if (minPrice && maxPrice) {
    where.price = { [Op.between]: [minPrice, maxPrice] };
  } else if (minPrice) {
    where.price = { [Op.gte]: minPrice }; // Greater than or equal to minPrice
  } else if (maxPrice) {
    where.price = { [Op.lte]: maxPrice }; // Less than or equal to maxPrice
  }

  if (rating) {
    where.rating = { [Op.gte]: rating }; // Assuming products have a rating field
  }

  const { count, rows } = await Product.findAndCountAll({
    where,
    limit,
    offset,
    order: [['createdAt', 'DESC']],
  });

  return {
    totalItems: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    products: rows,
  };
};

// Create product service function
const createProduct = async (productData) => {
  const { name, description, price, image_url, category } = productData;

  // Basic validation
  if (!name || !price) {
    const error = new Error('Name and price are required.');
    error.statusCode = 400;
    throw error;
  }

  const newProduct = await Product.create({
    name,
    description,
    price,
    image_url,
    category,
  });

  return newProduct;
};

//get single product by id
const getProductById = async (id) => {
    const product = await Product.findByPk(id);
    if (!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      throw error;
    }
    return product;
  };
  
  module.exports = {
    createProduct,
    getProducts,
    getProductById,
  };