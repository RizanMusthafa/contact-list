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

function validateContact(contact) {
  return Joi.validate(contact, {
    firstName: Joi.string()
      .required()
      .min(2)
      .max(100),
    lastName: Joi.string()
      .required()
      .min(2)
      .max(100),
    email: Joi.string()
      .optional()
      .email()
      .min(5)
      .max(100),
    address: Joi.string()
      .optional()
      .min(3)
      .max(200),
    phone: Joi.array().optional(),
    description: Joi.string().max(255),
    profasion: Joi.string()
      .max(2)
      .min(200)
  });
}

const Contact = new mongoose.model('contact', contactSchema);

module.exports = { Contact, validateContact };
