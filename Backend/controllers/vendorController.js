const Vendor = require('../models/Vendor');

// @desc    Register a brand new equipment supplier/vendor
// @route   POST /api/vendors
// @access  Public
const registerVendor = async (req, res) => {
    try {
        const { Vendor_Name, Contact } = req.body;

        // Validation check for empty fields
        if (!Vendor_Name || !Contact) {
            return res.status(400).json({ success: false, message: 'Please provide both Vendor Name and Contact details' });
        }

        const newVendor = await Vendor.create({
            Vendor_Name,
            Contact
        });

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
        const vendors = await Vendor.find().sort({ Vendor_Name: 1 }); // Sort alphabetically

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