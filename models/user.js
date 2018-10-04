const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
  fName: {
    type: String,
    maxlength: 150,
    minlength: 2,
    trim: true
  },
  sName: {
    type: String,
    maxlength: 150,
    minlength: 2,
    trim: true
  },
  email: {
    type: String,
    maxlength: 150,
    minlength: 2,
    trim: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  proPic: {
    type: String,
    default: 'default.png'
  }
});

const User = mongoose.model('user', userSchema);

function validateUser(user) {
  return Joi.validate(user, {
    fName: Joi.string()
      .required()
      .min(2)
      .max(150),
    sName: Joi.string()
      .required()
      .min(2)
      .max(150),
    email: Joi.string()
      .required()
      .min(2)
      .max(150)
      .trim()
      .email()
  });
}

module.exports = { User, validateUser };
