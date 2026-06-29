const Asset = require('../models/Asset');

// @desc    Get high-level dashboard metrics
// @route   GET /api/analytics/dashboard
// @access  Public (or Private once auth is ready)
const getDashboardStats = async (req, res) => {
    try {
        // 1. Count total number of assets in the entire database
        const totalAssets = await Asset.countDocuments();

        // 2. Count assets by their specific status fields
        const availableAssets = await Asset.countDocuments({ Status: 'Available' });
        const inUseAssets = await Asset.countDocuments({ Status: 'In Use' });
        const underRepairAssets = await Asset.countDocuments({ Status: 'Under Repair' });

        // 3. Count assets where the warranty date has passed today's date
        const currentDate = new Date();
        const expiredWarrantyAssets = await Asset.countDocuments({
            Warranty: { $lt: currentDate } // $lt means "less than" (date has passed)
        });

        // 4. Send all these beautifully compiled numbers back to Kruti's frontend!
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