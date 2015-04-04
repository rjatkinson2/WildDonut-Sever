var mongoose = require('mongoose');
var User = require('./userModel');
var userController = require('./userController');
var studentController = require('./studentController');
var teacherController = require('./teacherController');
var bookingController = require('./bookingController');

// on all platforms, MongoDB listens for connections from clients on port 27017 by default.
mongoose.connect('mongodb://localhost/wild-donut', function(err){
  if(err){ console.log(err); }
  else{ console.log('Connected to MDB'); }
});

userController.login({ body: { username:'jabroni', password:'wheresmycarssss', teacher:true }});
teacherController.getTeacher({ params: { username: 'tony' }});

// // create user from form. we will hardcode for now.
// var testUser = new User({
//   username: 'rjatkinson22',
//   password: 'jabroni22',
//   name: 'Ryan Atkinson',
//   location: 'SF',
//   picture: 'rj.jpg',
//   bio: 'I crush it all day every day.'
// });

// testUser.save(function(err){
//   if(err){ console.log(err); }
//   User.findOne({username: 'rjatkinson2'}, function(err, user){
//     if(err){ console.log(err); }

//     // grab password from form. we will hardcode for now.
//     user.comparePassword('jabroni', function(err, isMatch){
//       if(err){ console.log(err); }
//       console.log('jabroni', isMatch);
//     });

//     user.comparePassword('jafony', function(err, isMatch){
//       if(err){ console.log(err); }
//       console.log('jafony', isMatch);
//     });
//   });
// });
