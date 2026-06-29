const Allocation = require('../models/Allocation');
const Asset = require('../models/Asset');

// POST /api/allocations/issue
exports.issueAsset = async (req, res) => {
  try {
    const { assetId, employeeId, remarks } = req.body;

    if (!assetId || !employeeId) {
      return res.status(400).json({ success: false, message: 'assetId and employeeId are required' });
    }

    const asset = await Asset.findById(assetId);
    if (!asset) {
      return res.status(404).json({ success: false, message: 'Asset not found' });
    }

    if (asset.Status === 'In Use') {
      return res.status(400).json({ success: false, message: 'Asset is already assigned' });
    }

    const allocation = await Allocation.create({
      asset:      assetId,
      employee:   employeeId,
      issueDate:  new Date(),
      remarks:    remarks || '',
      status:     'Issued',
    });

    asset.Status = 'In Use';
    await asset.save();

    return res.status(201).json({ success: true, message: 'Asset issued successfully', data: allocation });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/allocations/return/:allocationId
exports.returnAsset = async (req, res) => {
  try {
    const allocation = await Allocation.findById(req.params.allocationId);
    if (!allocation) {
      return res.status(404).json({ success: false, message: 'Allocation not found' });
    }
    if (allocation.status === 'Returned') {
      return res.status(400).json({ success: false, message: 'Asset already returned' });
    }

    allocation.status = 'Returned';
    allocation.returnDate = new Date();
    await allocation.save();

    const asset = await Asset.findById(allocation.asset);
    if (asset) { asset.Status = 'Available'; await asset.save(); }

    return res.status(200).json({ success: true, message: 'Asset returned successfully', data: allocation });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/allocations
exports.getAllocations = async (req, res) => {
  try {
    const allocations = await Allocation.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: allocations });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/allocations/:id
exports.getAllocationById = async (req, res) => {
  try {
    const allocation = await Allocation.findById(req.params.id);
    if (!allocation) {
      return res.status(404).json({ success: false, message: 'Allocation not found' });
    }
    return res.status(200).json({ success: true, data: allocation });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};