//app.js

const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const flash = require('connect-flash'); 
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables from .env file
require('./config/db'); // Initializes MongoDB connection
require('./config/passport-setup'); // Initialize Passport configuration

const app = express();
const PORT = process.env.PORT || 3000;

// HTTPS middleware to enforce secure connections in production
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
  })
}

// Session middleware configuration
app.use(session({
  secret: process.env.SESSION_SECRET, // Secret key for signing the session ID cookie
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  }),
  cookie: {
    secure: false, // Set to true if your website uses HTTPS
    maxAge: 1000 * 60 * 60 * 24 // Cookie expiry (e.g., 1 day)
  }
}));

// Connect-flash middleware
app.use(flash()); 

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Body parser middleware
app.use(express.urlencoded({ extended: true }));

// Static files middleware
app.use(express.static('public'));

// View engine setup
app.set('view engine', 'ejs');

// Custom middleware for checking if user is logged in.
app.use((req, res, next) => {
  res.locals.isLoggedIn = req.isAuthenticated();
  next();
});

// Body-parser middleware for parsing nested objects.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route-proctection middleware
const requireRegistration = require('./middleware/requireRegistration'); // Assuming authMiddleware.js is in the same directory

// Routes
const authRoutes = require('./routes/authRoutes');
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');
app.use('/user', requireRegistration, userRoutes);
app.use('/', authRoutes);
app.use('/', mainRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });

// Server initialization
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));