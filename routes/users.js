const auth = require('../middleware/auth');
const express = require('express');
const bcrypt = require('bcrypt');
const { User, validateUser } = require('../models/user');
const _ = require('lodash');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (!user) return res.status(404).send('User was not found.');
  res.send(user);
});

router.put('/add-order', auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  user.orders.push(req.body);
  await user.save();
  res.send(user.orders);
});

router.get('/order-history', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (!user) return res.status(404).send('User was not found.');
  res.send(user.orders);
});

router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('Email is already in use.');
  user = new User(req.body);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(_.pick(user, ['id', 'email', 'orders']));
});

module.exports = router;
