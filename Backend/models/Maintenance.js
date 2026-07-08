const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema({
  asset_id: {
    type: String,
    required: true,
  },
  asset_name: {
    type: String,
    default: '',
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
    default: '',
  },
  cost: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: 'In Progress',
  },
  next_due_date: {
    type: Date,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Maintenance", maintenanceSchema);