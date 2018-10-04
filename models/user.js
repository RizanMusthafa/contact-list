const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
  fName: {
    type: String,
    required: true,
    maxlength: 150,
    minlength: 2,
    trim: true
  },
  sName: {
    type: String,
    required: true,
    maxlength: 150,
    minlength: 2,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 150,
    minlength: 2,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
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
      .email(),
    password: Joi.string()
      .required()
      .min(5)
      .max(255),
    isAdmin: Joi.boolean()
      .optional()
      .default(false),
    proPic: Joi.string()
      .optional()
      .default('default.png')
  });
}

module.exports = { User, validateUser };
