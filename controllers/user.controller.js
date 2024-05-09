// Import Model
const User = require('../models/user.model');

// Define completeRegistration function
const completeRegistration = async (req, res) => {
    try {
      // Extract form data from request body
      const { countryOfOrigin, yearOfBirth, phoneNumber, optIn, preferredLanguage } = req.body;
  
      // Find the current user by their ID
      const user = await User.findById(req.user._id);
  
      // Update user profile with form data
      user.countryOfOrigin = countryOfOrigin;
      user.yearOfBirth = yearOfBirth;
      user.phone.phoneNumber = phoneNumber;
      user.smsPreferences.optIn = optIn === 'on';
      user.smsPreferences.preferredLanguage = preferredLanguage;
  
      //Mark registration as complete in user record
      user.isRegistrationComplete = true;

      // Save the updated user profile
      await user.save();
  
      // Redirect the user to a success page or any other route as needed
      res.redirect('/');
    } catch (error) {
      console.error('Error completing registration:', error);
      // Handle the error appropriately
      res.status(500).send('Internal Server Error');
    }
};

const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, countryOfOrigin, yearOfBirth, phoneNumber, optIn, preferredLanguage } = req.body;

    // Basic validation example
    if (!firstName || !lastName) {
      throw new Error('First name and last name are required.');
    }

    // Find the user 
    const user = await User.findById(req.user._id); 

    // Update user information
    user.firstName = firstName;
    user.lastName = lastName;
    user.countryOfOrigin = countryOfOrigin;
    user.yearOfBirth = yearOfBirth;
    user.phone.phoneNumber = phoneNumber;
    user.smsPreferences.optIn = optIn === 'on';
    user.smsPreferences.preferredLanguage = preferredLanguage;

    // Save the updated user 
    const updatedUser = await user.save(); 

    req.flash('success', 'Profile updated successfully!');
    res.redirect('/user/myAccount');
  } catch (error) {
    console.error('Error updating profile:', error);
    req.flash('error', 'An error occurred while updating your profile.');
    res.redirect('/user/editProfile');
  }
};

const dashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).send('User not found'); 
    }

    res.render('dashboard', { 
      isLoggedIn: true, 
      title: 'User Dashboard', 
      message: 'Welcome to the user dashboard!', 
      user // Pass the user data to the view
    });

  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Export the completeRegistration function
module.exports = {
    completeRegistration,
    dashboard,
    updateProfile,
};