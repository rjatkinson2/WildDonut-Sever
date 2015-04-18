var express = require('express'),
    port = process.env.PORT || 4568,
    mongoose = require('mongoose'),
    mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/wild-donut';

// on all platforms, MongoDB listens for connections from clients on port 27017 by default.
mongoose.connect(mongoURI, function(err){
  return err ? console.log(err) : console.log('Connected to Mongo');
});

var app = express();

app.set('port', port);
require('./config/middleware.js')(app, express);

module.exports = app;