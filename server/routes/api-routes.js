var express = require('express');
var router = express.Router();

router.get('/saved', function(req, res) {
	res.status(200).json({
		success: true,
		message: 'GET /saved'
	});
});

router.post('/saved', function(req, res) {
	res.status(200).json({
		success: true,
		message: 'POST /saved'
	});
});

router.delete('/saved', function(req, res) {
	res.status(200).json({
		success: true,
		message: 'DELETE /saved'
	});
});

module.exports = router;
