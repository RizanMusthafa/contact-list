const express = require('express');
const { Contact, validateContact } = require('../models/contact');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find()
      .sort('firstName lastName')
      .select('fistName lastName');
    res.send({ results: contacts });
  } catch (ex) {
    res.send({ error: ex.message });
  }
});

module.exports = router;
