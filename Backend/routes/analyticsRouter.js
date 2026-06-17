const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/analyticsController');

// Map the GET request address directly to our analytics counter function
router.get('/dashboard', getDashboardStats);

module.exports = router;