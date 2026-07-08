const mongoose = require('mongoose');
const Counter = require('./Counter');

const AssetSchema = new mongoose.Schema({
    Asset_ID: { type: String, unique: true },
    Asset_Name: { type: String, required: true, trim: true },
    Asset_Type: { type: String, required: true, trim: true },
    Serial_No: { type: String, required: true, unique: true, trim: true },
    Purchase_Date: { type: Date, required: true },
    Purchase_Price: { type: Number, default: 0 },
    Codal_Life: { type: Number, default: 0 },
    Warranty: { type: Date, required: true },
    Vendor: String,
    Status: {
        type: String,
        enum: ['Available', 'In Use', 'Under Repair', 'Disposed'],
        default: 'Available'
    },
    Image: {
        type: String,
        default: ''
    },
    createdAt: { type: Date, default: Date.now }
});

AssetSchema.pre('save', async function() {
    if (this.Asset_ID) return;
    try {
        const counter = await Counter.findOneAndUpdate(
            { _id: 'asset' },
            { $inc: { seq: 1 } },
            { upsert: true, new: true }
        );
        this.Asset_ID = `AST-${String(counter.seq).padStart(3, '0')}`;
    } catch(e) {
        console.log('COUNTER ERROR:', e.message);
    }
});

module.exports = mongoose.model('Asset', AssetSchema);