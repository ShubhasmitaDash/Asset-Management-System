const express = require('express');
const router = express.Router();
const {
  logMaintenance,
  completeMaintenance,
  getAllMaintenance,
  getMaintenanceHistory
} = require('../controllers/maintenanceController');

// POST   /api/maintenance/log              → log new maintenance
// PUT    /api/maintenance/complete/:id     → mark repair done
// GET    /api/maintenance/all              → all records
// GET    /api/maintenance/:asset_id        → history of one asset
// PATCH  /api/maintenance/status/:asset_id → change asset status

router.post('/log', logMaintenance);
router.put('/complete/:id', completeMaintenance);
router.get('/all', getAllMaintenance);
router.get('/:asset_id', getMaintenanceHistory);
// router.patch('/status/:asset_id', updateAssetStatus);

module.exports = router;