// =================================================================
// Dependencies
// =================================================================
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var favicon = require('serve-favicon');

// =================================================================
// Initialize new Express app
// =================================================================
var app = express();

// =================================================================
// Configure MongoDB connection
// =================================================================
var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/react_nyt';

mongoose.connect(MONGODB_URI);
var db = mongoose.connection;

// Log Mongo errors to console.
db.on('error', function(err) {
	console.log('Mongoose Error: ', err);
});

// Once logged in to db through mongoose, log success message.
db.once('open', function() {
	console.log('Mongoose connection successful.');
});

// =================================================================
// Setup logger
// =================================================================
app.use(logger('dev'));

// =================================================================
// Configure body-parser middleware
// =================================================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.text());
app.use(bodyParser.json( {type:'application/vnd.api+json'} ));

// =================================================================
// Serve public folder
// =================================================================
app.use(express.static(path.resolve('public')));

// =================================================================
// Page favicon (because favicons are awesome)
// =================================================================
app.use(favicon(path.resolve('public/img', 'favicon.ico')));

// =================================================================
// Configure application routes
// =================================================================
var mainRoutes = require('./routes/main-routes');
var apiRoutes = require('./routes/api-routes');
app.use('/', mainRoutes);
app.use('/api', apiRoutes);

// =================================================================
// Catch 404 errors, forward to error handlers below.
// =================================================================
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// Error handler - development error handler will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// Error handler - production handler not leaking stacktrace to user
app.use(function(err, req, res) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

module.exports = app;
