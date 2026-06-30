const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    User_Name: {
        type: String,
        required: [true, 'Please add a username'],
        trim: true
    },
    Email: {
        type: String,
        required: [true, 'Please add an email address'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email address'
        ]
    },
    Role: {
        type: String,
        enum: ['Admin', 'Employee'],
        default: 'Employee'
    },
    Department: {
        type: String,
        trim: true,
        default: ''
    },
    Designation: {
        type: String,
        trim: true,
        default: ''
    },
    Phone: {
        type: String,
        trim: true,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});



module.exports = mongoose.model('User', UserSchema);
