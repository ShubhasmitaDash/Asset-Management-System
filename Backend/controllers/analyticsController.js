const Asset = require('../models/Asset');

// @desc    Get high-level dashboard metrics
// @route   GET /api/analytics/dashboard
// @access  Public
const getDashboardStats = async (req, res) => {
    try {
        // 1. Count total number of assets in the entire database
        const totalAssets = await Asset.countDocuments();

        // 2. Count assets by their specific status fields
        const availableAssets = await Asset.countDocuments({ status: 'Available' });
        const inUseAssets = await Asset.countDocuments({ status: 'Assigned' });
        const underRepairAssets = await Asset.countDocuments({ status: 'Maintenance' });

        // 3. Count assets where the warranty date has passed today's date
        const currentDateStr = new Date().toISOString().split('T')[0];
        const expiredWarrantyAssets = await Asset.countDocuments({
            warranty: { $lt: currentDateStr }
        });

        res.status(200).json({
            success: true,
            data: {
                totalAssets,
                availableAssets,
                inUseAssets,
                underRepairAssets,
                expiredWarrantyAssets
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error: Unable to fetch dashboard statistics',
            error: error.message
        });
    }
};

module.exports = {
    getDashboardStats
};