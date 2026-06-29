const express = require('express');
const router = express.Router();
const { createEmployee, getAllEmployees } = require('../controllers/employeeController');

router.route('/')
    .get(getAllEmployees)
    .post(createEmployee);

module.exports = router;
