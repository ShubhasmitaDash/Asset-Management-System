const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper function to generate a secure JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

// @desc    Register a brand new user
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
    try {
        const { User_Name, Email, Password, Role } = req.body;

        const userExists = await User.findOne({ Email });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already registered with this email' });
        }

        const user = await User.create({ User_Name, Email, Password, Role });

        res.status(201).json({
            success: true,
            message: 'User registered successfully!',
            token: generateToken(user._id), // Hands back a token immediately on signup
            data: { _id: user._id, User_Name: user.User_Name, Email: user.Email, Role: user.Role }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Registration failed', error: error.message });
    }
};

// ==========================================
// ✨ NEW: LOGIN CONTROLLER FOR PORTAL AUTH ✨
// ==========================================

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { Email, Password } = req.body;

        // 1. Validation check for email and password input
        if (!Email || !Password) {
            return res.status(400).json({ success: false, message: 'Please provide an email and password' });
        }

        // 2. Look up the user by email AND explicitly request the hidden password field
        const user = await User.findOne({ Email }).select('+Password');
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // 3. Use the helper method we wrote in User.js to compare plain text with the hash
        const isMatch = await user.matchPassword(Password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // 4. Everything matches! Pass back the secure access key token
        res.status(200).json({
            success: true,
            message: 'Login successful!',
            token: generateToken(user._id),
            user: {
                _id: user._id,
                User_Name: user.User_Name,
                Email: user.Email,
                Role: user.Role
            }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Login execution failed', error: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser
};