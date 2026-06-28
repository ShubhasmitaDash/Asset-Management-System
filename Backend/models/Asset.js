const mongoose = require('mongoose');
//this checks if Asset_Name and Asset_Type are provided or not
const AssetSchema = new mongoose.Schema({
    Asset_Name: {
        type: String,
        required: [true, 'Please add the asset name'],
        trim: true //strips away accidental blank spaces.
    },
    Asset_Type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Points directly to a new Category model
    required: [true, 'Please specify the asset category']
},
    Serial_No: {
        type: String, //here it reads the hardware's factory serial number 
        required: [true, 'Please add the unique factory serial number'],
        unique: true, //checks if there are any other hardware with the same serial number and if there then it rejects it.
        trim: true
    },
    Purchase_Date: {
        type: Date,
        required: [true, 'Please enter the date of purchase'],
        validate: {
            validator: function(value) {
                // 'value' is the date the user typed. It must be less than or equal to right now.
                return value <= new Date();
            },
            message: 'Purchase date cannot be in the future!'
        }
    },
    Warranty: {
        type: Date,
        required: [true, 'Please add the warranty expiration date'],
        validate: {
            validator: function(value) {
                // 'value' is the warranty date. It must be greater than the purchase date.
                return value > this.Purchase_Date;
            },
            message: 'Warranty expiration date must be after the purchase date!'
        }
    },
    Status: {
        type: String,
        enum: ['Available', 'In Use', 'Under Repair', 'Disposed'], //fits only these four categories
        default: 'Available' //this is by default option
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Asset', AssetSchema);