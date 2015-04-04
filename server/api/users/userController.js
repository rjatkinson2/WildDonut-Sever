var User = require('../../database/models/userModel.js');

module.exports.createUser = function(req, res, next){
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({username: username}, function(err, user){
    if(err){
      res.status(400).send('Bad request.');
    }
    else if(user){
      res.status(403).send('Username already exists, try another!');
    }
    var newUser = new User({ username: username, password: password });
    newUser.save(function(err, user){
      if(err || !user){
        res.status(400).send('Bad request.');
      }
      else{
        res.status(201).json(user);
      }
    });
  });
};

module.exports.updateUser = function(req, res, next){
  // TODO - fill in updateStudent logic.
};

module.exports.login = function(req, res, next){
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({username: username}, function(err, user){
    if(err){
      console.log(err);
    }
    user.comparePassword(password, function(err, matches){
      if(err){
        res.status(400).send('Bad Request');
      }
      else if(!matches){ 
        res.status(401).send('Password does not match. Authentication denied.');
      }
      res.send('Login successful.');
    });
  });
};
