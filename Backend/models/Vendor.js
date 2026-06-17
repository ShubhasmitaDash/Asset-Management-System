const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema({
    // MongoDB automatically generates a unique ID for each entry, which acts as your Vendor_ID (PK)
    Vendor_Name: {
        type: String,
        required: [true, 'Please add the vendor or supplier name'],
        trim: true
    },
    Contact: {
        type: String,
        required: [true, 'Please add the vendor contact details (Phone or Email)'],
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Vendor', VendorSchema);