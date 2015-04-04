var User = require('../../database/models/userModel.js');

module.exports.allTeachers = function(req, res, next){
  User.find({teacher: true}, function(err, docs){
    if(err){
      console.log(err);
      res.status(400).send('Bad request');
    }else if(!docs){
      console.log(err);
      console.log('user not found');
      res.status(404).send('No teachers found');
    }
    console.log(JSON.stringify(docs));
    res.json(docs);
  });
};

module.exports.getTeacher = function(req, res, next){
  var username = req.params.username;

  User.findOne({ username: username, teacher: true }, function(err, user){
    if(err){
      console.log(err);
      res.status(400).send('Bad request');
    }else if(!user){
      console.log('user not found');
      res.status(404).send('Teacher not found');
    }
    console.log(JSON.stringify(user));
    res.json(docs);
  });
};