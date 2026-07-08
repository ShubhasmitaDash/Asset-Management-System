const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

// @route GET /api/auth
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch users', error: error.message });
    }
};

// @route POST /api/auth/register
const registerUser = async (req, res) => {
    try {
        const { User_Name, Email, Role, Department, Designation, Phone } = req.body;

        console.log('REGISTER REQUEST:', req.body);

        const emailExists = await User.findOne({ Email });
        if (emailExists) {
            return res.status(400).json({ success: false, message: 'A user with this email already exists' });
        }

        const nameExists = await User.findOne({ User_Name });
        if (nameExists) {
            return res.status(400).json({ success: false, message: 'A user with this name already exists' });
        }

        const user = new User({
            User_Name,
            Email,
            Role: Role || 'Employee',
            Department: Department || '',
            Designation: Designation || '',
            Phone: Phone || '',
        });

        await user.save();

        console.log('SAVED USER:', user);

        res.status(201).json({
            success: true,
            message: 'User registered successfully!',
            data: {
                _id: user._id,
                Emp_ID: user.Emp_ID,
                User_Name: user.User_Name,
                Email: user.Email,
                Role: user.Role,
                Department: user.Department,
                Designation: user.Designation,
                Phone: user.Phone
            }
        });

    } catch (error) {
        console.log('REGISTER ERROR CODE:', error.code);
        console.log('REGISTER ERROR MSG:', error.message);
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            const label = field === 'Email' ? 'email' : 'username';
            return res.status(400).json({ success: false, message: `This ${label} is already taken` });
        }
        res.status(500).json({ success: false, message: 'Registration failed', error: error.message });
    }
};

// @route POST /api/auth/login
const loginUser = async (req, res) => {
    try {
        const { Email, Password } = req.body;

        if (!Email || !Password) {
            return res.status(400).json({ success: false, message: 'Please provide an email and password' });
        }

        const user = await User.findOne({ Email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        res.status(200).json({
            success: true,
            message: 'Login successful!',
            token: generateToken(user._id),
            user: { _id: user._id, Emp_ID: user.Emp_ID, User_Name: user.User_Name, Email: user.Email, Role: user.Role }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Login execution failed', error: error.message });
    }
};

module.exports = { registerUser, loginUser, getAllUsers };