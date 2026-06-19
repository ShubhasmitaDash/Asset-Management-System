const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');

// 1. Load our secret vault (.env file) variables
dotenv.config();

// 2. Connect to our MongoDB database!
connectDB();

// 3. Initialize our Express application (our server manager)
const app = express();

// 4. Allow our server to read JSON data sent to it by the frontend forms
app.use(express.json());

// This means any request to '/api/analytics/dashboard' will be sent to your analyticsRoutes file
app.use('/api/analytics', require('./routes/analyticsRouter'));

// 🔌 MOUNT OUR NEW ASSET CRUD ROUTER HERE!
app.use('/api/assets', require('./routes/assetRoutes'));
// 🔌 MOUNT OUR NEW ASSET CRUD ROUTER HERE!
app.use('/api/assets', require('./routes/assetRoutes'));

// 🔌 MOUNT OUR NEW AUTHENTICATION ROUTER HERE!
app.use('/api/auth', require('./routes/authRoutes'));
// 6. Turn on the server to start listening for requests on Port 5000

// 🔌 MOUNT OUR NEW AUTHENTICATION ROUTER HERE!
app.use('/api/auth', require('./routes/authRoutes'));

// 🔌 MOUNT OUR NEW MAINTENANCE ROUTER HERE!
app.use('/api/maintenance', require('./routes/maintenanceRoutes'));

// 🔌 MOUNT OUR NEW MAINTENANCE ROUTER HERE!
app.use('/api/maintenance', require('./routes/maintenanceRoutes'));

// 🔌 MOUNT OUR NEW VENDOR ROUTER HERE!
app.use('/api/vendors', require('./routes/vendorRoutes'));

//  ALLOCATION ROUTER
app.use("/api/allocations",require("./routes/allocationRouter"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🖥️  Server is listening like a waiter on port ${PORT}...`);
});