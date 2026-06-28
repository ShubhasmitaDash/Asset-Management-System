const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    Category_Name: {
        type: String,
        required: [true, 'Please add a category name'],
        unique: true,
        trim: true
    }
});

module.exports = mongoose.model('Category', CategorySchema);