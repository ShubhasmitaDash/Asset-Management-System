// models/Employee.js  ← you already have this file, replace contents with:
const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  department: { type: String, default: '' },
  designation: { type: String, default: '' },
  email: { type: String, required: true, unique: true },
  phone: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Employee', EmployeeSchema);