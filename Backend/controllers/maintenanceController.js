const Maintenance = require('../models/Maintenance');
const Asset = require('../models/Asset');

// @desc    Log a new maintenance/repair event
// @route   POST /api/maintenance
// @access  Public (or Protected Admin/Staff later)
const logMaintenance = async (req, res) => {
    try {
        const { Asset_ID, Service_Date, Remarks } = req.body;

        // 1. Verify if the asset actually exists before filing a ticket
        const assetExists = await Asset.findById(Asset_ID);
        if (!assetExists) {
            return res.status(404).json({ success: false, message: 'Cannot log maintenance; Target Asset ID not found' });
        }

        // 2. Create the entry
        const log = await Maintenance.create({
            Asset_ID,
            Service_Date,
            Remarks
        });

        // 3. OPTIONAL AUTOMATION LINK FOR AMRITA: 
        // Automatically switch asset status to 'Under Repair' when maintenance is logged!
        assetExists.Status = 'Under Repair';
        await assetExists.save();

        res.status(201).json({
            success: true,
            message: 'Maintenance event logged successfully, asset status set to Under Repair.',
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
        // Find all logs that have a matching Asset_ID foreign key pointer
        const history = await Maintenance.find({ Asset_ID: req.params.assetId }).sort({ Service_Date: -1 });

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

module.exports = {
    logMaintenance,
    getAssetHistory
};