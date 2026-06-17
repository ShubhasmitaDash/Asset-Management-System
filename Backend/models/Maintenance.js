const mongoose = require('mongoose');

const MaintenanceSchema = new mongoose.Schema({
    // MongoDB automatically creates a unique ID for each entry, which acts as your Maintenance_ID (PK)
    Asset_ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Asset', // This establishes the Foreign Key relationship linking back to the Asset model!
        required: [true, 'Please link this maintenance log to an existing Asset ID']
    },
    Service_Date: {
        type: Date,
        required: [true, 'Please enter the date the service took place']
    },
    Remarks: {
        type: String,
        required: [true, 'Please add details or remarks about the maintenance (e.g., RAM upgraded, screen fixed)'],
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Maintenance', MaintenanceSchema);