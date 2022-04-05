const express = require('express');
const cloudinary = require('cloudinary');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
require('dotenv').config({ path: 'ENV_FILENAME' });
const app = require('./app');
const PORT = process.env.PORT || 4000;

dotenv.config()
// UncaughtException Error
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    process.exit(1);
});

connectDB();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});

// Unhandled Promise Rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    server.close(() => {
        process.exit(1);
    });
});