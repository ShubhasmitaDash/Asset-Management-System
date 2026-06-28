const mongoose = require('mongoose');

const AssetSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    manufacturer: {
        type: String,
        trim: true
    },
    serial: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    model: {
        type: String,
        trim: true
    },
    purchaseDate: {
        type: String,
        required: true
    },
    purchasePrice: {
        type: Number
    },
    vendor: {
        type: String,
        trim: true
    },
    warranty: {
        type: String,
        required: true
    },
    location: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['Available', 'Assigned', 'Maintenance', 'Disposed'],
        default: 'Available'
    },
    assignedTo: {
        type: String,
        default: '-'
    },
    image: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Asset', AssetSchema);