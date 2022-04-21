const asyncHandler = require('../middleware/async');

// @desc      Gets search results from ES
// @route     GET /api/v1/search/web
// @access    Private
exports.getSearchResults = asyncHandler(async (request, response, next) => {
  response.status(200).json(response.searchResults);
});
