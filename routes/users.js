const express = require('express');
const { User, validateUser } = require('../models/user');
const bcrypt = require('bcryptjs');
const loginGuard = require('../middlewares/loginGuard');
const adminGuard = require('../middlewares/adminGuard');

const router = express.Router();

router.get('/', loginGuard, async (req, res) => {
  try {
    const users = await User.find()
      .sort('fName')
      .select('fName sName isAdmin');
    res.send({ results: users });
  } catch (ex) {
    res.send({ error: ex.message });
  }
});

router.post('/', [loginGuard, adminGuard], async (req, res) => {
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

    const dupUser = await User.findOne({ email: inpUser.email });
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

router.get('/:id', loginGuard, async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).select('-password');
    if (!user) {
      res.status(404);
      throw new Error('can not find the user');
    }
    res.send({ results: user });
  } catch (ex) {
    res.send({ error: ex.message });
  }
});

router.put('/:id', [loginGuard, adminGuard], async (req, res) => {
  const id = req.params.id;
  delete req.body['_id'];
  delete req.body['password'];
  try {
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    if (!user) {
      res.status(404);
      throw new Error('can not found the user');
    }
    res.send({ results: user });
  } catch (ex) {
    res.send({ error: ex.message });
  }
});

router.delete('/:id', [loginGuard, adminGuard], async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.send(404);
      throw new Error('Can not Find user');
    }
    res.send({ results: user });
  } catch (ex) {
    res.send({ error: ex.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error('can not found the email');
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Invalid password');
    const token = user.generateAuthToken();
    res.send({ results: token });
  } catch (ex) {
    res.status(400).send({ error: 'Invalid email or password' });
  }
});

module.exports = router;
