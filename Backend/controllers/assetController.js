const Asset = require('../models/Asset');
const { generateCodes } = require('../services/qrService');

// @desc Create/Register a brand new asset
// @route POST /api/assets
// @access Public
const createAsset = async (req, res) => {
    try {

        // Create and save asset (original logic)
        const newAsset = new Asset(req.body);
        const savedAsset = await newAsset.save();

        // Generate QR + Barcode after saving
        const qrData = await generateCodes({
            asset_id: savedAsset._id.toString(),
            asset_name: savedAsset.Asset_Name,
            category: savedAsset.Asset_Type,
            serial_number: savedAsset.Serial_No,
            status: savedAsset.Status
        });

        // Store generated paths if available
        if (qrData) {
            savedAsset.QR_Code_Path = qrData.qr_code_url;
            savedAsset.Barcode_Path = qrData.barcode_url;

            await savedAsset.save();
        }

        res.status(201).json({
            success: true,
            message: 'Asset registered successfully!',
            data: savedAsset
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to register asset',
            error: error.message
        });
    }
};

// @desc Get a list of all registered assets in the inventory
// @route GET /api/assets
const getAllAssets = async (req, res) => {
    try {
        const assets = await Asset.find();
        res.status(200).json({
            success: true,
            count: assets.length,
            data: assets
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error: Unable to fetch assets',
            error: error.message
        });
    }
};

// @desc Get a single asset by its database ID
// @route GET /api/assets/:id
const getAssetById = async (req, res) => {
    try {
        const asset = await Asset.findById(req.params.id);

        if (!asset) {
            return res.status(404).json({
                success: false,
                message: 'Asset not found'
            });
        }

        res.status(200).json({
            success: true,
            data: asset
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc Update an asset profile
// @route PUT /api/assets/:id
const updateAsset = async (req, res) => {
    try {
        const updatedAsset = await Asset.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedAsset) {
            return res.status(404).json({
                success: false,
                message: 'Asset not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Asset updated successfully!',
            data: updatedAsset
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Update failed',
            error: error.message
        });
    }
};

// @desc Delete an asset completely from database
// @route DELETE /api/assets/:id
const deleteAsset = async (req, res) => {
    try {
        const deletedAsset = await Asset.findByIdAndDelete(req.params.id);

        if (!deletedAsset) {
            return res.status(404).json({
                success: false,
                message: 'Asset not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Asset deleted permanently from system inventory'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

module.exports = {
    createAsset,
    getAllAssets,
    getAssetById,
    updateAsset,
    deleteAsset
};