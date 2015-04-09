var Class = require('../../database/models/classModel.js');
var User = require('../../database/models/userModel.js');
var Options = require('../../database/models/optionModel.js');

module.exports.allTeacherClasses = function(req, res, next){
  var teacher = req.params.username;

  User.findOne({ username: teacher })
  .populate('classes')
  .exec(function(err, user){
    if(err){
      res.status(400).send('Bad request.');
    }else if(!user){
      res.status(403).send('User not found');
    }else{
      res.json(user.classes);
    }
  });
};

module.exports.allBookedClasses = function(req, res, next){
  var teacher = req.params.username;
  var is_booked = true;

  Class.find({ teacher_username: teacher, is_booked: is_booked })
  .exec(function(err, classes){
    if(err){
      res.status(400).send('Bad request.');
    }else if(!classes){
      res.status(403).send('User not found');
    }else{
      res.json(classes);
    }
  });
};

module.exports.allOpenClasses = function(req, res, next){
  var teacher = req.params.username;
  var is_booked = true;

  Class.find({ teacher_username: teacher, is_booked: is_booked })
  .exec(function(err, classes){
    if(err){
      res.status(400).send('Bad request.');
    }else if(!classes){
      res.status(403).send('Classes query failed');
    }else{
      res.json(classes);
    }
  });
};

module.exports.createClass = function(req, res, next){
  // class_name, description, rate ($), date, time, location
  var teacher = req.params.username;
  
  User.findOne({ username: teacher })
  .exec(function(err, user){
    var newClass = new Class({
      name: req.body.name,
      description: req.body.description,
      rate: req.body.rate,
      date: req.body.date,
      start_time: Date.now(),
      end_time: Date.now(),
      teacher: user._id,
      location: req.body.location,
      is_booked: false
    });

    newClass.save(function(err, newClass){
      if(err){
        res.status(400).send('Bad request.');
      }else if(!user){
        res.status(403).send('Teacher not found');
      }else{
        user.classes.push(newClass._id);
        user.save(function(err, user){
          if(err){
            console.log('server error on user save');
          }else if(!user){
            console.log('server error finding user to save class');
          }else{
            res.json(newClass);
            console.log('successfully added class to user');
          }
        });
      }
    });
  });
};


// update class does not sync changes between class documents in the classes collection
// and the individual instances of classes pushed onto the student's bookings and
// existing in the teacher's classes array.
// this functionality will be added in a future commit.
module.exports.updateClass = function(req, res, next){
  var classId = req.params.id;

  // Need to eventually parse req.boy to handle new times.
  Class.findByIdAndUpdate(classId, req.body)
  .exec(function(err, classInstance){
    if(err){
      res.status(400).send('Bad request.');
    }else if(!classInstance){
      res.status(403).send('Class not found');
    }else{
      Class.findById(classId, function(err, classInstance){
        if(err){
          res.status(400).send('Bad request.');
        }else if(!classInstance){
          res.status(403).send('Class not found');
        }else{
          res.json(classInstance);
        }
      });
    }
  });
};

// delete class does not sync deletions between class documents in the classes collection
// and the individual instances of classes pushed onto the student's bookings and
// existing in the teacher's classes array.
// this functionality will be added in a future commit.
module.exports.deleteClass = function(req, res, next){
  var classId = req.params.id;

  Class.findByIdAndRemove(classId)
  .exec(function(err, classInstance){
    if(err){
      res.status(400).send('Bad request.');
    }else if(!classInstance){
      res.status(403).send('Class not found');
    }else{
      res.json(classInstance);
    }
  });
};

module.exports.getClass = function(req, res, next){
  var classId = req.params.id;
  
  Class.findById(classId)
  .populate('teacher student')
  .exec(function(err, classInstance){
    if(err){
      res.status(400).send('Bad request.');
    }else if(!classInstance){
      res.status(403).send('Class not found');
    }else{
      res.json(classInstance);
    }
  });
};
