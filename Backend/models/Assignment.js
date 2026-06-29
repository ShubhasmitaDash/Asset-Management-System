const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    assetId: {
        type: String,
        required: true
    },
    assetName: {
        type: String,
        required: true
    },
    empId: {
        type: String,
        required: true
    },
    employee: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    assignedDate: {
        type: String,
        required: true
    },
    returnDate: {
        type: String,
        default: '-'
    },
    status: {
        type: String,
        enum: ['Active', 'Returned', 'Overdue'],
        default: 'Active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Assignment', AssignmentSchema);
