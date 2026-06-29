const Maintenance = require('../models/Maintenance');

// POST /api/maintenance/log
const logMaintenance = async (req, res) => {
  try {
    const { asset_id, asset_name, technician_name, issue_description, remarks, cost } = req.body;

    if (!asset_id || !technician_name || !issue_description) {
      return res.status(400).json({ success: false, message: 'asset_id, technician_name and issue_description are required' });
    }

    const log = new Maintenance({
      asset_id,
      asset_name:       asset_name || asset_id,
      technician_name,
      issue_description,
      remarks:          remarks || '',
      cost:             Number(cost) || 0,
      status:           'In Progress',
      service_date:     new Date(),
      next_due_date:    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    await log.save();
    res.status(201).json({ success: true, message: 'Maintenance logged', log });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/maintenance/all
const getAllMaintenance = async (req, res) => {
  try {
    const records = await Maintenance.find().sort({ created_at: -1 });
    res.status(200).json({ success: true, count: records.length, data: records });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/maintenance/complete/:id
const completeMaintenance = async (req, res) => {
  try {
    const log = await Maintenance.findByIdAndUpdate(
      req.params.id,
      { status: 'Completed', remarks: req.body.remarks || '' },
      { new: true }
    );
    if (!log) return res.status(404).json({ success: false, message: 'Record not found' });
    res.status(200).json({ success: true, message: 'Maintenance completed', log });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/maintenance/:asset_id
const getMaintenanceHistory = async (req, res) => {
  try {
    const records = await Maintenance.find({ asset_id: req.params.asset_id }).sort({ service_date: -1 });
    res.status(200).json({ success: true, count: records.length, data: records });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { logMaintenance, getAllMaintenance, completeMaintenance, getMaintenanceHistory };