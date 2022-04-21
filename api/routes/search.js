const searchResults = require('../middleware/searchResults');
const express = require('express');
const { protect } = require('../middleware/auth');
const { getSearchResults } = require('../controllers/search');

const router = express.Router();

router.use(protect);
router.get('/', searchResults, getSearchResults);

module.exports = router;
