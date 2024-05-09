const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    default: null,
  },
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  countryOfOrigin: String,
  yearOfBirth: Number,
  subscriptionStatus: {
    type: Boolean,
    default: false,
  },
  phone: {
    phoneNumber: String,
    verified: {
      type: Boolean,
      default: false,
    },
  },
  smsPreferences: {
    optIn: {
      type: Boolean,
      default: false,
    },
    lastMessageDate: {
      type: Date,
      default: null,
    },
    preferredLanguage: {
      type: String,
      default: null,
    },
  },
  isRegistrationComplete: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);