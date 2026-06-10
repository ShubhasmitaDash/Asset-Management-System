const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    // MongoDB automatically makes a unique String ID, but we can explicitly 
    // include employeeId or keep this structure aligned for your team's queries.
    name: {
        type: String,
        required: [true, 'Please add a user name'],
        trim: true
    },
    department: {
        type: String,
        required: [true, 'Please specify the department'],
        trim: true
    },
    designation: {
        type: String,
        required: [true, 'Please specify the designation (e.g., Manager, Developer)'],
        trim: true
    },
    phone: {
        type: String,
        required: [true, 'Please add a contact phone number'],
        trim: true
    },
    // We keep email, password, and role here because your requirements document 
    // mentions a "Login with admin/user roles" feature!
    email: {
        type: String,
        required: [true, 'Please add an email address'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email address'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    role: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);