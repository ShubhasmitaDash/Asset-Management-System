const Assignment = require('../models/Assignment');
const Asset = require('../models/Asset');

// @desc    Assign an asset to an employee
// @route   POST /api/assignments
const createAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.create(req.body);

        // Update the asset status and assignee
        await Asset.findOneAndUpdate(
            { id: req.body.assetId },
            { status: 'Assigned', assignedTo: req.body.employee }
        );

        res.status(201).json({ success: true, data: assignment });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Get all assignments
// @route   GET /api/assignments
const getAllAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: assignments.length, data: assignments });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Update assignment (e.g. Return asset)
// @route   PUT /api/assignments/:id
const updateAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );

        if (!assignment) {
            return res.status(404).json({ success: false, message: 'Assignment not found' });
        }

        // If returned, update the asset status and set assignee to '-'
        if (req.body.status === 'Returned') {
            await Asset.findOneAndUpdate(
                { id: assignment.assetId },
                { status: 'Available', assignedTo: '-' }
            );
        }

        res.status(200).json({ success: true, data: assignment });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    createAssignment,
    getAllAssignments,
    updateAssignment
};
