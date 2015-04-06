var User = require('../../database/models/userModel.js');

module.exports.allTeachers = function(req, res, next){
  User.find({teacher: true}, function(err, docs){
    if(err){
      res.status(400).send('Bad request');
    }else if(!docs){
      res.status(404).send('No teachers found');
    }else{
      res.json(docs);
    }
  });
};

module.exports.getTeacher = function(req, res, next){
  var username = req.params.username;

  User.findOne({ username: username, teacher: true }, function(err, user){
    if(err){
      res.status(400).send('Bad request');
    }else if(!user){
      res.status(404).send('Teacher not found');
    }
    res.json(user);
  });
};