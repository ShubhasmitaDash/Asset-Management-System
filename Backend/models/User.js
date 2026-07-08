const mongoose = require('mongoose');
const Counter = require('./Counter');

const UserSchema = new mongoose.Schema({
    Emp_ID: { type: String, unique: true },
    User_Name: { type: String, required: true, trim: true },
    Email: { type: String, required: true, unique: true },
    Role: { type: String, enum: ['Admin', 'Employee'], default: 'Employee' },
    Department: { type: String, trim: true, default: '' },
    Designation: { type: String, trim: true, default: '' },
    Phone: { type: String, trim: true, default: '' },
    createdAt: { type: Date, default: Date.now }
});

UserSchema.pre('save', async function() {
    if (this.Emp_ID) return;
    try {
        const counter = await Counter.findOneAndUpdate(
            { _id: 'employee' },
            { $inc: { seq: 1 } },
            { upsert: true, new: true }
        );
        this.Emp_ID = `EMP-${String(counter.seq).padStart(3, '0')}`;
    } catch(e) {
        console.log('COUNTER ERROR:', e.message);
    }
});

module.exports = mongoose.model('User', UserSchema);