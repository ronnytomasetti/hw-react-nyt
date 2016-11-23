var express = require('express');
var router = express.Router();
var path = require('path');

var Article = require('../models/Article');

/**
 * Main application route to homepage.
 * Route will send index.html file rendering the React application.
 */
router.get('/', function(req, res) {
	res.sendFile(path.resolve('public/index.html'));
});

module.exports = router;
