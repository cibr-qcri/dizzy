const asyncHandler = require('../middleware/async');
const Statistic = require('../models/Statistic');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Get statistic
// @route     GET /api/v1/statistics
const getStatistics = asyncHandler(async (request, response, next) => {
  const { type } = request.query;
  const allowedTypes = ['index'];

  if (!type) {
    return next(new ErrorResponse('Please provide a statistic type', 400));
  }

  if (!allowedTypes.includes(type)) {
    return next(new ErrorResponse(`Invalid statistic type`, 401));
  }

  const statistics = await Statistic.findOne({ type });

  if (!statistics) {
    return next(new ErrorResponse('There are no statistics available', 404));
  }

  return response.status(200).json({
    success: true,
    data: statistics,
  });
});

exports.getStatistics = getStatistics;
