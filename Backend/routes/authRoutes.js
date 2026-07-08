const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getAllUsers } = require('../controllers/authController');

router.get('/', getAllUsers);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.delete('/:id', async (req, res) => {
  try {
    const User = require('../models/User')
    await User.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch(e) {
    res.status(500).json({ success: false, message: e.message })
  }
})
module.exports = router;
