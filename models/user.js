const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 255,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
    created_at: {
      type: Date,
      default: Date.now(),
    },
    orders: {
      type: Array,
      required: true,
    },
  },
  { versionKey: false }
);

userSchema.methods.genAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, config.get('jwtKey'));
  return token;
};

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const joiSchema = Joi.object({
    email: Joi.string().required().min(6).max(255).email(),
    password: Joi.string().required().min(5).max(1024),
    orders: Joi.array().required(),
  });

  return joiSchema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;
