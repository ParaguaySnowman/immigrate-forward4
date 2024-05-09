require('dotenv').config(); // Load environment variables from .env file
const mongoose = require('mongoose');

// MongoDB connection URL using the environment variable
const mongoURI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(mongoURI);

// Get the default connection
const db = mongoose.connection;

// Event handling for connection errors
db.on('error', (error) => {
  console.error('MongoDB Connection Error:', error);
});

// Event handling for successful connection
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Export the database connection
module.exports = db;