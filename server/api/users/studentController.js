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

};

module.exports.bookClass = function(req, res, next){
  Class.findOne({ name: 'advanced'}, function(err, classObject){

  });
};
