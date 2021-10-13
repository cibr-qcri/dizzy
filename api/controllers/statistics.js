const asyncHandler = require('../middleware/async');
const Statistic = require('../models/Statistic');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Get statistic
// @route     GET /api/v1/statistics
const getStatistics = asyncHandler(async (request, response, next) => {
  const statistics = await Statistic.find().sort({ _id: -1 }).limit(1);

  if (!statistics || statistics.length !== 1) {
    return next(new ErrorResponse('There are no statistics available', 404));
  }

  return response.status(200).json({
    success: true,
    data: statistics[0],
  });
});

exports.getStatistics = getStatistics;
