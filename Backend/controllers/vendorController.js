const Vendor = require('../models/Vendor');

// @desc    Register a brand new equipment supplier/vendor
// @route   POST /api/vendors
// @access  Public
const registerVendor = async (req, res) => {
    try {
        const newVendor = await Vendor.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Vendor registered in system directory successfully!',
            data: newVendor
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to save vendor entry',
            error: error.message
        });
    }
};

// @desc    Get the full directory of suppliers
// @route   GET /api/vendors
// @access  Public
const getAllVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find().sort({ name: 1 });

        res.status(200).json({
            success: true,
            count: vendors.length,
            data: vendors
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error: Unable to fetch supplier records',
            error: error.message
        });
    }
};

module.exports = {
    registerVendor,
    getAllVendors
};