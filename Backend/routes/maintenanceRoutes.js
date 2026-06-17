const express = require('express');
const router = express.Router();
const { logMaintenance, getAssetHistory } = require('../controllers/maintenanceController');

// Base path: /api/maintenance
router.route('/').post(logMaintenance);

// Path by Asset ID: /api/maintenance/asset/:assetId
router.route('/asset/:assetId').get(getAssetHistory);

module.exports = router;