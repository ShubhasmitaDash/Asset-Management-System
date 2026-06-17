const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    // User_ID (PK) is automatically handled by MongoDB (_id)
    User_Name: {
        type: String,
        required: [true, 'Please add a username'],
        unique: true,
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
    Password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false // This hides the password by default when fetching user data
    },
    Role: {
        type: String,
        enum: ['Admin', 'Employee'],
        default: 'Employee'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// 🔐 Pre-save middleware to encrypt password before saving
UserSchema.pre('save', async function(next) {
    if (!this.isModified('Password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.Password = await bcrypt.hash(this.Password, salt);
});

// 🔑 Helper method to match typed password with hashed password during login
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.Password);
};

module.exports = mongoose.model('User', UserSchema);