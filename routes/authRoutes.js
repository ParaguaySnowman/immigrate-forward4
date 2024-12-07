const { OAuth2Client } = require('google-auth-library');
const User = require('../models/user.model'); // Your user model
const express = require('express');
const router = express.Router();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function verifyToken(idToken) {
    const ticket = await client.verifyIdToken({
        idToken: idToken,
        audience: process.env.GOOGLE_CLIENT_ID, // Must match your Google Client ID
    });
    return ticket.getPayload(); // Contains user details
}

router.post('/auth/google/verify', async (req, res) => {
    try {
        const { token } = req.body;

        // Verify the token with Google
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID, // Match your Google Client ID
        });

        const payload = ticket.getPayload(); // Extract user info from the token

        // Check if the user exists in your database
        let user = await User.findOne({ googleId: payload.sub });
        if (!user) {
            // Create a new user if not found
            user = new User({
                googleId: payload.sub,
                firstName: payload.given_name,
                lastName: payload.family_name,
                email: payload.email,
                isRegistrationComplete: false,
            });
            await user.save();
        }

        // Store user info in the session
        req.session.user = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
        };

        // Send success response
        res.status(200).json({ success: true, user: req.session.user });

    } catch (error) {
        console.error('Token verification failed:', error);
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
});

module.exports = router;
