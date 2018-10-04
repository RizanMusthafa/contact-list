const mongoose = require('mongoose');
const Joi = require('joi');

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
    trim: true
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 100,
    trim: true,
    unique: true
  },
  address: {
    type: String,
    minlength: 3,
    maxlength: 200,
    trim: true
  },
  phone: {
    type: [String]
  },
  description: {
    type: String,
    maxlength: 255
  },
  profasion: {
    type: String
  }
});

const Contact = new mongoose.model('contact', contactSchema);

module.exports = { Contact };
