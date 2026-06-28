const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');

// 1. Load our secret vault (.env file) variables
dotenv.config();

// 2. Connect to our MongoDB database!
connectDB();

// 3. Initialize our Express application
const app = express();

// 4. Enable CORS
app.use(cors());

// 5. Allow our server to read JSON data sent to it by the frontend forms
app.use(express.json());

// 6. Mount our API routers
app.use('/api/analytics', require('./routes/analyticsRouter'));
app.use('/api/assets', require('./routes/assetRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/maintenance', require('./routes/maintenanceRoutes'));
app.use('/api/vendors', require('./routes/vendorRoutes'));
app.use('/api/employees', require('./routes/employeeRoutes'));
app.use('/api/assignments', require('./routes/assignmentRoutes'));

// 7. Turn on the server to start listening for requests on Port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🖥️  Server is listening on port ${PORT}...`);
});