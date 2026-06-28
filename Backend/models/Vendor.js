const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    contact: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    country: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
    assetsCount: {
        type: Number,
        default: 0
    },
    totalSpend: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 5
    },
    since: {
        type: Number,
        default: new Date().getFullYear()
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Vendor', VendorSchema);