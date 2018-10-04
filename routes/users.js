const express = require('express');
const { User, validateUser } = require('../models/user');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find()
      .sort('fName')
      .select('fName sName isAdmin');
    res.send({ results: users });
  } catch (ex) {
    res.send({ error: ex.message });
  }
});

module.exports = router;
