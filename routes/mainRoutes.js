const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');

// Route for the tutorials view with dynamic category
router.get('/tutorials/:category', (req, res, next) => {
    const { category } = req.params;
    contentController.fetchAndRenderContentByCategory(req, res, next, category);
});

router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;