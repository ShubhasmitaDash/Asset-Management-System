const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');

// 1. Load our secret vault (.env file) variables
dotenv.config();

// 2. Connect to our MongoDB database!
connectDB();

// 3. Initialize our Express application (our server manager)
const app = express();

// 4. Allow our server to read JSON data sent to it by the frontend forms
app.use(express.json());

// 5. Set up a simple welcome route so we can test it in a web browser
app.get('/', (req, res) => {
    res.send('The Backend Kitchen is Open and Running!');
});

// 6. Turn on the server to start listening for requests on Port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🖥️  Server is listening like a waiter on port ${PORT}...`);
});