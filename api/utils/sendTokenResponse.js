const sendTokenResponse = (user, statusCode, response) => {
  const token = user.generateAuthToken();

  const options = {
    expires: new Date(
      Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRE_MS, 10)
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  response.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  });
};

module.exports = sendTokenResponse;
