const express = require('express');
const { User, validateUser } = require('../models/user');
const bcrypt = require('bcrypt');

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

router.post('/', async (req, res) => {
  const inpUser = {
    fName: req.body.fName,
    sName: req.body.sName,
    email: req.body.email,
    isAdmin: req.body.isAdmin,
    proPic: req.body.proPic,
    password: req.body.password
  };
  const { error } = validateUser(inpUser);
  try {
    if (error) {
      res.status(400);
      throw new Error(error.details[0].message);
    }

    const dupUser = await User.find({ email: inpUser.email });
    if (dupUser) {
      res.status(400);
      throw new Error(`"${inpUser.email}" is already exists`);
    }

    const salt = await bcrypt.genSalt(13);
    inpUser.password = await bcrypt.hash(inpUser.password, salt);

    const user = new User(inpUser);
    await user.save();
    res.send({ results: user });
  } catch (ex) {
    res.send({ error: ex.message });
  }
});

module.exports = router;
