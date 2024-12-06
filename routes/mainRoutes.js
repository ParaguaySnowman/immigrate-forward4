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
    renderWithLayout(res, path.join(__dirname, '../views/index.ejs'), 'Home', 'default', { recaptchaKey: process.env.RECAPTCHA_KEY });
});

router.post('/send-message', async (req, res) => {

    console.log(req.body)

    try {
        const { email, message, recaptchaToken } = req.body;

        // 1. Server-side validation
        if (!email || !message || !recaptchaToken) {
            return res.status(400).send('Please fill in all fields and complete the reCAPTCHA.');
        }

        // 2. reCAPTCHA verification
        const recaptchaResponse = await axios.post(
            'https://www.google.com/recaptcha/api/siteverify',
            null,
            {
                params: {
                    secret: process.env.RECAPTCHA_SECRET_KEY,
                    response: recaptchaToken,
                },
            }
        );

        console.log(recaptchaResponse.data)

        if (!recaptchaResponse.data.success) {
            return res.status(400).send('reCAPTCHA verification failed.');
        }

        // 3. Email sending (using nodemailer)
        const transporter = nodemailer.createTransport({
            service: 'gmail', // e.g., 'Gmail'
            auth: {
                user: process.env.EMAIL_PERSONAL,
                pass: process.env.GOOGLE_APP_PW, 

            },
        });

        const mailOptions = {
            from: process.env.PERSONAL_EMAIL,

            to: process.env.EMAIL_ADMIN, // Replace with admin email
            subject: 'New Contact Form Submission',
            text: `Email: ${email}\n\nMessage: ${message}`,
            // You can also use HTML for richer formatting:
            // html: `<b>Email:</b> ${email}<br><p>${message}</p>`
        };

        await transporter.sendMail(mailOptions);

        // Successful response
        res.status(200).send('Message sent successfully!'); 

    } catch (error) {
        console.error('Error in /send-message:', error);
        res.status(500).send('Error sending message.');
    }
});

module.exports = router;
