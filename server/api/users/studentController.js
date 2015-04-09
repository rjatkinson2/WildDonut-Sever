var Class = require('../../database/models/classModel.js');
var User = require('../../database/models/userModel.js');

module.exports.getStudent = function(req, res, next){
  var username = req.params.username;

  User.findOne({ username: username }, function(err, user){
    if(err){
      res.status(400).send('Bad request');
    }else if(!user){
      res.status(404).send('Student not found');
    }else{
      res.json(user);
    }
  });
};

module.exports.getBookings = function(req, res, next){
  var username = req.params.username;

  User.findOne({ username: username })
  .populate('bookings')
  .exec(function(err, user){
    if(err){
      res.status(400).send('Bad request');
    }else if(!user){
      res.status(404).send('Student not found');
    }else{
      res.json(user.bookings);
    }
  });
};

module.exports.bookClass = function(req, res, next){
  var class_id = req.body._id;
  var username = req.body.student_username;
  req.body.is_booked = true;

  
  Class.findByIdAndUpdate(class_id, req.body, function(err, classObject){
    Class.findById(class_id, function(err, classObject){
      if(err){
        res.status(400).send('Bad Request');
      }else if(!classObject){
        res.status(403).send('Class not found');
      }else{
        User.findOne({ username: username }, function(err, user){
          if(err){
            res.status(400).send('Bad Request');
          }else if(!user){
            res.status(403).send('User not found');
          }else{
            user.bookings.push(classObject._id);
            res.status(201).send(classObject);   
            user.save(function(err,user){
              console.log("added a booking to user");
            });
          }
        });    
      }
    });
  });  
};
