var User = require('./userModel.js');

module.exports.signup = function(req, res, next){
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({username: username}, function(err, user){
    if(err){
      console.log(err);
      /*res.status(400).send('Bad request.');*/
    }
    else if(user){
      console.log('user already exists!');
      /*res.status(403).send('Username already exists, try another!');*/
    }
    var newUser = new User({ username: username, password: password });
    newUser.save(function(err, user){
      if(err || !user){ console.log(err); /*res.status(400).send('Bad request.');*/ }
      else{
        console.log(JSON.stringify(user));
        /*res.json(user);*/
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
  // console.log('username and password:  ', username, password);

  User.findOne({username: username}, function(err, user){
    if(err){
      console.log(err);
    }
    user.comparePassword(password, function(err, matches){
      if(err){
        console.log(err);
      }
      else if(!matches){ 
        console.log('password does not check out!');
        // res.status(403).send('Password does not match. Authentication denied');
      }
      console.log('password checks out you sonofab');
    });
  });
};
