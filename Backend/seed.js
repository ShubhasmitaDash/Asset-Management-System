const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Asset = require('./models/Asset');

dotenv.config();

const seedDatabase = async () => {
    try {
        // Connect to the database
        await mongoose.connect(process.env.MONGO_URI);
        console.log('⏳ Injecting test assets...');

        // Clear out any old records so we start fresh
        await Asset.deleteMany();

        // Let's create two test assets based exactly on your official documentation fields
        const testAssets = [
            {
                Asset_Name: "Dell XPS 15 Laptop",
                Asset_Type: "Laptop",
                Serial_No: "DELL-XYZ-12345",
                Purchase_Date: new Date("2025-01-15"),
                Warranty: new Date("2027-01-15"), // Still in warranty
                Status: "In Use"
            },
            {
                Asset_Name: "HP LaserJet Printer",
                Asset_Type: "Printer",
                Serial_No: "HP-PRINT-98765",
                Purchase_Date: new Date("2023-05-10"),
                Warranty: new Date("2025-05-10"), // Expired warranty!
                Status: "Under Repair"
            }
        ];

        await Asset.insertMany(testAssets);
        console.log('🚀 Success! 2 test assets successfully added to MongoDB Cloud.');
        process.exit();
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

seedDatabase();