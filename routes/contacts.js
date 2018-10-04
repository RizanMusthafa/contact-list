const express = require('express');
const { Contact, validateContact } = require('../models/contact');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find()
      .sort('firstName lastName')
      .select('firstName lastName');
    res.send({ results: contacts });
  } catch (ex) {
    res.send({ error: ex.message });
  }
});

router.post('/', async (req, res) => {
  const inpContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone,
    description: req.body.description,
    profasion: req.body.profasion
  };
  const { error } = validateContact(inpContact);
  try {
    if (error) {
      res.status(400);
      throw new Error(error.details[0].message);
    }
    const contact = new Contact(inpContact);
    await contact.save();
    res.status(201).send({ results: contact });
  } catch (ex) {
    res.send({ error: ex.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      res.status(404);
      throw new Error('can no find that contact');
    }
    res.send({ results: contact });
  } catch (ex) {
    res.send({ error: ex.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  delete req.body['_id'];
  try {
    const contact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    if (!contact) {
      res.status(404);
      throw new Error('can no find that contact');
    }
    res.send({ results: contact });
  } catch (ex) {
    res.send({ error: ex.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      res.status(404);
      throw new Error('can not find the contact');
    }
    res.send({ results: contact });
  } catch (ex) {
    res.send({ error: ex.message });
  }
});

module.exports = router;
