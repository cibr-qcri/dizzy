const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { filters } = require('../utils/common');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    organization: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      match: filters.email,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    isActivated: {
      type: Boolean,
      default: false,
    },
    resetPasswordExpire: {
      type: Date,
      select: false,
    },
    resetPasswordToken: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

// Hooks
userSchema.pre('save', async function saltAndHashPassword(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.pre('remove', async function (next) {
  await this.model('Alert').deleteMany({ user: this._id });
  console.log(`Alerts of user ${this._id} have been removed`.green);
  next();
});

// Methods
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_AUTH_EXPIRE_DAYS,
  });
};

userSchema.methods.generateActivationToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_ACTIVATION_EXPIRE_DAYS,
  });
};

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.resetPasswordExpire =
    Date.now() + parseInt(process.env.RESET_PASSWORD_EXPIRE_MS, 10);
  return resetToken;
};

module.exports = mongoose.model('User', userSchema);
