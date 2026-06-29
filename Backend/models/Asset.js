const mongoose = require('mongoose');

const AssetSchema = new mongoose.Schema({
    // MongoDB automatically creates a unique ID for each entry, which acts as your Asset_ID (PK)
    Asset_Name: {
        type: String,
        required: [true, 'Please add the asset name'],
        trim: true
    },
    Asset_Type: {
        type: String,
        required: [true, 'Please specify the asset type (e.g., Laptop, Monitor, Chair)'],
        trim: true
    },
    Serial_No: {
        type: String,
        required: [true, 'Please add the unique factory serial number'],
        unique: true,
        trim: true
    },
    Purchase_Date: {
        type: Date,
        required: [true, 'Please enter the date of purchase']
    },
    Warranty: {
        type: Date,
        required: [true, 'Please add the warranty expiration date']
    },
    Status: {
        type: String,
        enum: ['Available', 'In Use', 'Under Repair', 'Disposed'],
        default: 'Available' // Amrita's logic can cleanly shift this value later
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Asset', AssetSchema);