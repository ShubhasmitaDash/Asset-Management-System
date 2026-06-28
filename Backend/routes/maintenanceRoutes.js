const express = require('express');
const router = express.Router();
const { logMaintenance, getAssetHistory, getAllMaintenance } = require('../controllers/maintenanceController');

// Base path: /api/maintenance
router.route('/')
    .post(logMaintenance)
    .get(getAllMaintenance);

// Path by Asset ID: /api/maintenance/asset/:assetId
router.route('/asset/:assetId').get(getAssetHistory);

module.exports = router;