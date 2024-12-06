//routes/mainRoutes.js

const express = require('express');
const router = express.Router();
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const contentController = require('../controllers/contentController');
const requireRegistration = require('../middleware/requireRegistration'); // Import the middleware
const nodemailer = require('nodemailer');
const axios = require('axios'); 

// Helper function to render views with layout
function renderWithLayout(res, viewPath, title, headerType, additionalData = {}) {
    const viewContent = ejs.render(fs.readFileSync(viewPath, 'utf8'), { ...additionalData });
    res.render('layout', { title, body: viewContent, headerType });
}

// Apply requireRegistration middleware to the '/content' route
router.get('/content', requireRegistration, (req, res) => {
    renderWithLayout(res, path.join(__dirname, '../views/content.ejs'), 'Content', 'content');
});

// Apply requireRegistration middleware to the '/tutorials/:category' route
router.get('/tutorials/:category', requireRegistration, (req, res, next) => {
    const { category } = req.params;
    req.headerType = 'content';
    contentController.fetchAndRenderContentByCategory(req, res, next, category);
});

// Home route does not require registration
router.get('/', (req, res) => {
    renderWithLayout(res, path.join(__dirname, '../views/index.ejs'), 'Home', 'default');
});

module.exports = router;
