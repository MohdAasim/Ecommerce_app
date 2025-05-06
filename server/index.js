const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database.config');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// Start server
sequelize.sync().then(() => {
  console.log('✅ Database connected and synced');
  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
  });
});
