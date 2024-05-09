const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controllers/user.controller.js');

router.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account'
  }));

  router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  async (req, res) => {
    try {

      // Check if registration was previously completed
      if (req.user.isRegistrationComplete) {
        // Redirect the user to the homepage
        return res.redirect('/');
      }

      // Redirect the user to the registration page
      return res.redirect('/register');
    } catch (error) {
      console.error('Error in authentication callback:', error);
      // Handle the error appropriately
      return res.status(500).send('Internal Server Error');
    }
  }
);

router.get('/register', (req, res) => {
  const isLoggedIn = req.isAuthenticated ? req.isAuthenticated() : false;

  res.render('register', { isLoggedIn: isLoggedIn, title: 'Registration', message: 'registration!' });
});

router.post('/complete-registration', userController.completeRegistration);

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;