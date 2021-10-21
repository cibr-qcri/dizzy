const asyncHandler = require('../middleware/async');
const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const { sendEmail } = require('../utils/mail');
const sendTokenResponse = require('../utils/sendTokenResponse');

// @desc      Triggers password reset flow
// @route     POST /api/v1/auth/forgot
// @access    Public
const forgot = asyncHandler(async (request, response, next) => {
  const user = await User.findOne({ email: request.body.email });
  if (!user) {
    return next(new ErrorResponse('There is no user with given email', 404));
  }

  const resetToken = user.generateResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password Reset',
      message: getResetEmailMessage(request, resetToken),
    });

    response.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.log(`${error}`.red);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse('Email could not be sent', 500));
  }
});

// @desc      Reset user password
// @route     PUT /api/v1/auth/reset/:token
// @access    Public
const reset = asyncHandler(async (request, response, next) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(request.params.token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ErrorResponse('Invalid token', 400));
  }

  user.password = request.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, response);
});

// @desc      Update user password
// @route     PUT /api/v1/auth/update
// @access    Private
const update = asyncHandler(async (request, response, next) => {
  const { currentPassword, newPassword } = request.body;
  if (!currentPassword || !newPassword) {
    return next(new ErrorResponse('Please provide passwords', 400));
  }

  const user = await User.findById(request.user.id).select('+password');
  const match = await user.matchPassword(request.body.currentPassword);
  if (!match) {
    return next(new ErrorResponse('Current password is incorrect', 401));
  }

  user.password = request.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, response);
});

const getResetEmailMessage = (request, resetToken) => {
  const protocol = request.protocol;
  const host = request.get('host');
  const resetUrl = `${protocol}://${host}/api/v1/auth/reset/${resetToken}`;
  const message = `
  You are receiving this email because you, or someone else, has requested
  to reset your password. Please make a PUT request to: \n\n ${resetUrl}`;
  return message;
};

exports.forgot = forgot;
exports.reset = reset;
exports.update = update;
