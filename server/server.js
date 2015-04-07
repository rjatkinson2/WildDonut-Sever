var express = require('express');

var mongoose = require('mongoose');

mongoURI = process.env.MONGO_URI || 'mongodb://localhost/wild-donut';

// on all platforms, MongoDB listens for connections from clients on port 27017 by default.
mongoose.connect(mongoURI, function(err){
  if(err){
    console.log(err);
  }
  else{
    console.log('Connected to Mongo');
  }
});

var app = express();

var port = process.env.PORT || 4568;

app.set('port', port);

require('./config/middleware.js')(app, express);

module.exports = app;