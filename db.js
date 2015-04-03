var mongoose = require('mongoose');
var User = require('./user-model');

// on all platforms, MongoDB listens for connections from clients on port 27017 by default.
mongoose.connect('mongodb://localhost/wild-donut', function(err){
  if(err){ console.log(err); }
  else{ console.log('Connected to MDB'); }
});

// create user from form. we will hardcode for now.
var testUser = new User({
  username: 'rj',
  password: 'jabroni',
  location: 'SF',
  picture: 'rj.jpg',
  bio: 'I crush it all day every day.'
});

testUser.save(function(err){
  if(err){ console.log(err); }
  User.findOne({username: 'rj'}, function(err, user){
    if(err){ console.log(err); }

    // grab password from form. we will hardcode for now.
    user.comparePassword('jabroni', function(err, isMatch){
      if(err){ console.log(err); }
      console.log('jabroni', isMatch);
    });

    user.comparePassword('jafony', function(err, isMatch){
      if(err){ console.log(err); }
      console.log('jafony', isMatch);
    });
  });
});
