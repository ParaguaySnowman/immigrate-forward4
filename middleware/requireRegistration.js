function requireRegistration(req, res, next) {
    if (req.user.isRegistrationComplete) {
        next(); // Allow access
    } else {
        res.redirect('/register');
    }
}

module.exports = requireRegistration; 