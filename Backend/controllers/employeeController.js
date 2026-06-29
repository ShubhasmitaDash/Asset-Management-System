const Employee = require('../models/Employee');

// @desc    Register a new employee
// @route   POST /api/employees
const createEmployee = async (req, res) => {
    try {
        const employee = await Employee.create(req.body);
        res.status(201).json({ success: true, data: employee });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Get all employees
// @route   GET /api/employees
const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().sort({ name: 1 });
        res.status(200).json({ success: true, count: employees.length, data: employees });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    createEmployee,
    getAllEmployees
};
