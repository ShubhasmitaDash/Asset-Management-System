const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema({
  asset_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Asset",
    required: true,
  },
  service_date: {
    type: Date,
    default: Date.now,
  },
  technician_name: {
    type: String,
    required: true,
  },
  issue_description: {
    type: String,
    required: true,
  },
  remarks: {
    type: String,
  },
  cost: {
    type: Number,
    default: 0,
  },
  status_after_service: {
    type: String,
    enum: ["Available", "In Use", "Under Repair", "Disposed"],
    default: "Under Repair",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Maintenance", maintenanceSchema);