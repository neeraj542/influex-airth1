const express = require('express');
const { exchangeToken } = require('../controllers/apiController');
const { exchangeLongLivedToken } = require('../controllers/apiController');

const router = express.Router();

router.get('/exchange-token', exchangeToken);
router.get('/exchange-long-lived-token', exchangeLongLivedToken);


module.exports = router;