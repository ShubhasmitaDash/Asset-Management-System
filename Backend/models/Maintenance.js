const mongoose = require('mongoose');

const MaintenanceSchema = new mongoose.Schema({
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
    type: {
        type: String,
        required: true,
        trim: true
    },
    serviceDate: {
        type: String,
        required: true
    },
    nextDue: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Maintenance', MaintenanceSchema);