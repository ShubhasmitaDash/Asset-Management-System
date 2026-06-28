const Maintenance = require('../models/Maintenance');
const Asset = require('../models/Asset');

// @desc    Log a new maintenance/repair event
// @route   POST /api/maintenance
// @access  Public
const logMaintenance = async (req, res) => {
    try {
        const log = await Maintenance.create(req.body);

        // Update the asset status to Maintenance
        await Asset.findOneAndUpdate(
            { id: req.body.assetId },
            { status: 'Maintenance' }
        );

        res.status(201).json({
            success: true,
            message: 'Maintenance event logged successfully, asset status set to Maintenance.',
            data: log
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create maintenance log',
            error: error.message
        });
    }
};

// @desc    Get complete repair/maintenance history for a specific asset
// @route   GET /api/maintenance/asset/:assetId
// @access  Public
const getAssetHistory = async (req, res) => {
    try {
        const history = await Maintenance.find({ assetId: req.params.assetId }).sort({ serviceDate: -1 });

        res.status(200).json({
            success: true,
            count: history.length,
            data: history
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch asset history logs',
            error: error.message
        });
    }
};

// @desc    Get all maintenance logs in the system
// @route   GET /api/maintenance
// @access  Public
const getAllMaintenance = async (req, res) => {
    try {
        const history = await Maintenance.find().sort({ serviceDate: -1 });

        res.status(200).json({
            success: true,
            count: history.length,
            data: history
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch maintenance logs',
            error: error.message
        });
    }
};

module.exports = {
    logMaintenance,
    getAssetHistory,
    getAllMaintenance
};