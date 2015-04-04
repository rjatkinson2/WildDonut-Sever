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