const express = require('express');
const router = express.Router();
const { registerVendor, getAllVendors } = require('../controllers/vendorController');

// Base URL: /api/vendors
router.route('/')
    .post(registerVendor)
    .get(getAllVendors);

module.exports = router;