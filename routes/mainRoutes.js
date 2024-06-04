const express = require('express');
const router = express.Router();
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const contentController = require('../controllers/contentController');

// Helper function to render views with layout
function renderWithLayout(res, viewPath, title, headerType) {
    const viewContent = ejs.render(fs.readFileSync(viewPath, 'utf8'));
    res.render('layout', { title, body: viewContent, headerType });
}

router.get('/content', (req, res) => {
    renderWithLayout(res, path.join(__dirname, '../views/content.ejs'), 'Content', 'content');
});

// Route for the tutorials view with dynamic category
router.get('/tutorials/:category', (req, res, next) => {
    const { category } = req.params;
    req.headerType = 'content';
    contentController.fetchAndRenderContentByCategory(req, res, next, category);
});

router.get('/', (req, res) => {
    renderWithLayout(res, path.join(__dirname, '../views/index.ejs'), 'Home', 'default');
});

module.exports = router;
