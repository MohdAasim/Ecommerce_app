const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database.config');
const {syncDatabase} = require('./models/associations')

require('dotenv').config();

const app = express();


app.use(cors());
app.use(express.json());

syncDatabase();
// Routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/authRoutes')
const uploadRoutes = require('./routes/uploadRoutes');
const userAddressRoutes = require('./routes/userAddressRoutes');
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/auth',userRoutes)
app.use('/api/v1/upload',uploadRoutes)
app.use('/api/v1/addresses', userAddressRoutes);

// Start server
sequelize.sync().then(() => {
  console.log('✅ Database connected and synced');
  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
  });
});
