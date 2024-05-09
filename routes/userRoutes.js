const express = require('express');
const router = express.Router();
const User = require('../models/user.model'); // Adjust the path if necessary

router.get('/myAccount', async (req, res) => {
    const isLoggedIn = req.isAuthenticated();
  
    try {
      // Find user from database
      const user = await User.findById(req.user._id);
  
      // Pass user data to the view
      res.render('dashboard', { 
          isLoggedIn: isLoggedIn, 
          title: 'User Dashboard', 
          message: 'Welcome to the user dashboard!', 
          user: user 
      });
  
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).render('error', { title: 'Error', message: 'Could not load user data' });
    }
  });

  router.get('/editProfile', (req, res) => {
    res.render('editProfile', { 
      isLoggedIn: true, 
      title: 'Edit Profile', 
      user: req.user 
    }); 
  });
  
  router.post('/editProfile', async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
      req.flash('success', 'Profile updated successfully!');
      res.redirect('/user/myAccount'); 
    } catch (error) {
      console.error('Error updating profile:', error);
      req.flash('error', 'An error occurred while updating your profile.'); 
      res.redirect('/user/editProfile');
    }
  });

module.exports = router;