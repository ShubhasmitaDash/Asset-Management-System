const express = require('express');
const router = express.Router();
const { 
    createAsset, 
    getAllAssets, 
    getAssetById, 
    updateAsset, 
    deleteAsset 
} = require('../controllers/assetController');

// Base route: /api/assets
router.route('/')
    .post(createAsset)
    .get(getAllAssets);

// Parameterized route: /api/assets/:id
router.route('/:id')
    .get(getAssetById)
    .put(updateAsset)
    .delete(deleteAsset);

module.exports = router;