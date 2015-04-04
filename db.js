var mongoose = require('mongoose');

// on all platforms, MongoDB listens for connections from clients on port 27017 by default.
mongoose.connect('mongodb://localhost/wild-donut', function(err){
  if(err){
    console.log(err);
  }
  else{
    console.log('Connected to Mongo');
  }
});