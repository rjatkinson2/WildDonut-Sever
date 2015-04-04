var User = require('../../database/models/userModel.js');

module.exports.getStudent = function(req, res, next){
  var username = req.params.username;

  User.findOne({ username: username }, function(err, user){
    if(err){
      console.log(err);
      res.status(400).send('Bad request');
    }else if(!user){
      console.log('Student not found');
      res.status(404).send('Student not found');
    }
    console.log(JSON.stringify(user));
    res.json(user);
  });
};
