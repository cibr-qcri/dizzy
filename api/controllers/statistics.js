const asyncHandler = require('../middleware/async');
const Statistic = require('../models/Statistic');

// @desc      Get statistic
// @route     GET /api/v1/statistics
const getStatistics = asyncHandler(async (request, response, next) => {
  const statistics = await Statistic.find().sort({ _id: -1 }).limit(1);

  return response.status(200).json({
    success: true,
    data: statistics[0],
  });
});

exports.getStatistics = getStatistics;
