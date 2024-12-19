//routes/authRoutes.js
//(immigrate-forward4)

const { OAuth2Client } = require('google-auth-library');
const User = require('../models/user.model'); // Your user model
const express = require('express');
const passport = require('passport');
const router = express.Router();
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const userController = require('../controllers/user.controller.js');

// Helper function to render views with layout
function renderWithLayout(res, viewPath, title, additionalData = {}) {
    const viewContent = ejs.render(fs.readFileSync(viewPath, 'utf8'), additionalData);
    res.render('layout', { title, body: viewContent, headerType: 'default' });
}

router.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        prompt: 'select_account'
    })
);

router.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    async (req, res) => {
        try {
            // Check if registration was previously completed
            if (req.user.isRegistrationComplete) {
                req.session.isLoggedIn = true; 
                return res.redirect('/');
            }
            // Redirect the user to the registration page
            return res.redirect('/register');
        } catch (error) {
            console.error('Error in authentication callback:', error);
            return res.status(500).send('Internal Server Error');
        }
    }
);

router.get('/register', (req, res) => {
    const isLoggedIn = req.isAuthenticated ? req.isAuthenticated() : false;
    renderWithLayout(res, path.join(__dirname, '../views/register.ejs'), 'Registration', { isLoggedIn });
});

router.post('/complete-registration', userController.completeRegistration);

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;