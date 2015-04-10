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

  User.findOne({username: username}, function(err, user){
    if(err){
      res.status(400).send('Bad request');
    }else if(!user){
      res.status(404).send('USER not found');
    }else{
      Class.find({ student: user._id })
      .populate('teacher student')
      .exec(function(err, classInstance){
        if(err){
          res.status(400).send('Bad request');
        }else if(!user){
          res.status(404).send('Class not found');
        }else{
          res.json(classInstance);
        }
      });
    }
  });
};

module.exports.bookClass = function(req, res, next){
  var class_id = req.body.class_id;
  var student = req.body.student_id;
  req.body.is_booked = true;
  req.body.student = student;

  
  Class.findByIdAndUpdate(class_id, req.body, function(err, classObject){
    Class.findById(class_id, function(err, classObject){
      if(err){
        res.status(400).send('Bad Request');
      }else if(!classObject){
        res.status(403).send('Class not found');
      }else{
        res.status(201).send("Successfully booked a class");    
      }
    });
  });  
};
