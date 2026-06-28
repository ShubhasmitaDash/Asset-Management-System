const express = require('express');
const router = express.Router();
const { createAssignment, getAllAssignments, updateAssignment } = require('../controllers/assignmentController');

router.route('/')
    .get(getAllAssignments)
    .post(createAssignment);

router.route('/:id')
    .put(updateAssignment);

module.exports = router;
