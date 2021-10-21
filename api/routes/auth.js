const express = require('express');
const { signin, signout, signup, activate } = require('../controllers/auth');

const router = express.Router();

router.post('/signin', signin);
router.get('/signout', signout);
router.post('/signup', signup);
router.get('/activate/:token', activate);

module.exports = router;
