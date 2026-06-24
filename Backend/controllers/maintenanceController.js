const Maintenance = require("../models/Maintenance");
const Asset = require("../models/Asset");

// 1. Log new maintenance + set asset to "Under Repair"
const logMaintenance = async (req, res) => {
  try {
    const { asset_id, technician_name, issue_description, remarks, cost } = req.body;

    const log = new Maintenance({
      asset_id,
      technician_name,
      issue_description,
      remarks,
      cost,
      status_after_service: "Under Repair",
    });
    await log.save();

    await Asset.findByIdAndUpdate(asset_id, { status: "Under Repair" });

    res.status(201).json({ message: "Maintenance logged", log });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

// 2. Mark maintenance done + set asset back to "Available"
const completeMaintenance = async (req, res) => {
  try {
    const { id } = req.params;
    const { remarks } = req.body;

    const log = await Maintenance.findByIdAndUpdate(
      id,
      { remarks, status_after_service: "Available" },
      { new: true }
    );

    if (!log) return res.status(404).json({ message: "Record not found" });

    await Asset.findByIdAndUpdate(log.asset_id, { status: "Available" });

    res.status(200).json({ message: "Maintenance completed", log });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

// 3. Get all maintenance records (admin view)
const getAllMaintenance = async (req, res) => {
  try {
    const records = await Maintenance.find()
      .sort({ created_at: -1 })
      .populate("asset_id", "asset_name serial_number status");

    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

// 4. Get maintenance history of one specific asset
const getMaintenanceHistory = async (req, res) => {
  try {
    const { asset_id } = req.params;
    const history = await Maintenance.find({ asset_id })
      .sort({ service_date: -1 })
      .populate("asset_id", "asset_name serial_number");

    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

// 5. Manually update any asset's status
const updateAssetStatus = async (req, res) => {
  try {
    const { asset_id } = req.params;
    const { status } = req.body;

    const validStatuses = ["Available", "In Use", "Under Repair", "Disposed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const asset = await Asset.findByIdAndUpdate(
      asset_id,
      { status },
      { new: true }
    );

    if (!asset) return res.status(404).json({ message: "Asset not found" });

    res.status(200).json({ message: "Status updated", asset });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

module.exports = {
  logMaintenance,
  completeMaintenance,
  getAllMaintenance,
  getMaintenanceHistory,
  updateAssetStatus,
};