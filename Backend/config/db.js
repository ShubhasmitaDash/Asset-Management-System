const mongoose = require('mongoose');

// This is an asynchronous function (async) because connecting to a database 
// takes a few seconds, and we want our app to wait for it to finish.
const connectDB = async () => {
    try {
        // We tell Mongoose to grab the secret MONGO_URI link from our .env vault
        const conn = await mongoose.connect(process.env.MONGO_URI);
        
        // If it works, print a happy message in our terminal!
        console.log(`🚀 Success! MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        // If the database is locked or broken, tell us exactly what went wrong
        console.error(`❌ Database Connection Error: ${error.message}`);
        process.exit(1); // Turn off the backend completely because it can't work without its data!
    }
};

// We export this function so our main server.js switch can turn the DB on
module.exports = connectDB;