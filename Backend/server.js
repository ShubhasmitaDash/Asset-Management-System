const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Routes — each path mounted ONCE
app.use('/api/analytics',   require('./routes/analyticsRouter'));
app.use('/api/assets',      require('./routes/assetRoutes'));
app.use('/api/auth',        require('./routes/authRoutes'));
app.use('/api/maintenance', require('./routes/maintenanceRoutes'));
app.use('/api/vendors',     require('./routes/vendorRoutes'));
app.use('/api/allocations', require('./routes/allocationRouter'));
app.use('/api/assignments', require('./routes/assignmentRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
