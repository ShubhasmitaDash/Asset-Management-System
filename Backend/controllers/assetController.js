const Asset = require('../models/Asset');

// CREATE
const createAsset = async (req, res) => {
  try {
    console.log('ASSET REQUEST BODY:', Object.keys(req.body))
    console.log('IMAGE LENGTH:', req.body.Image ? req.body.Image.length : 'no image')
    const newAsset = new Asset(req.body)
    const savedAsset = await newAsset.save()
    res.status(201).json({ success: true, message: 'Asset registered successfully!', data: savedAsset })
  } catch (error) {
    console.log('ASSET ERROR:', error.message)
    res.status(400).json({ success: false, message: 'Failed to register asset', error: error.message })
  }
}

// GET ALL
const getAllAssets = async (req, res) => {
    try {
        const assets = await Asset.find();
        res.status(200).json({ success: true, count: assets.length, data: assets });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch assets', error: error.message });
    }
};

// GET ONE
const getAssetById = async (req, res) => {
    try {
        const asset = await Asset.findById(req.params.id);
        if (!asset) {
            return res.status(404).json({ success: false, message: 'Asset not found' });
        }
        res.status(200).json({ success: true, data: asset });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch asset', error: error.message });
    }
};

// UPDATE
const updateAsset = async (req, res) => {
    try {
        const asset = await Asset.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!asset) {
            return res.status(404).json({ success: false, message: 'Asset not found' });
        }
        res.status(200).json({ success: true, message: 'Asset updated successfully!', data: asset });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Failed to update asset', error: error.message });
    }
};

// DELETE
const deleteAsset = async (req, res) => {
    try {
        const asset = await Asset.findByIdAndDelete(req.params.id);
        if (!asset) {
            return res.status(404).json({ success: false, message: 'Asset not found' });
        }
        res.status(200).json({ success: true, message: 'Asset deleted successfully!' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete asset', error: error.message });
    }
};


module.exports = {
    createAsset,
    getAllAssets,
    getAssetById,
    updateAsset,
    deleteAsset
};