const express = require('express');
const { getStatistics } = require('../controllers/statistics');

const router = express.Router();
router.route('/').get(getStatistics);

module.exports = router;
