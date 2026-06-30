const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getAllUsers } = require('../controllers/authController');

router.get('/', getAllUsers);
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
