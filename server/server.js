var express = require('express');
	

//mongoose.connect('mongodb');
var app = express();

var port = process.env.PORT || 4568;

app.set('port', port);

require('./config/middleware.js')(app, express);

module.exports = app;