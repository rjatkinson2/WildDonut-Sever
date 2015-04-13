var LocalStrategy = require('passport-local').Strategy,
    FacebookTokenStrategy = require('passport-facebook-token').Strategy;

module.exports = function(passport, User){

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findOne({_id: id}, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local', new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }else{
          user.comparePassword(password, function(err, matches){
            if(err){
              return done(null, false, { message: 'password comparison error.' });
            }
            else if(!matches){
              return done(null, false, { message: 'Incorrect password.' });
            }else{
              return done(null, user);
            }
          });
        }
      });
    }
  ));

  passport.use('facebook', new FacebookTokenStrategy({
      clientID: 'client_id',
      clientSecret: 'client_secret'
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({ username: profile.id }, function (err, user) {
        if (err) {
          return done(err);
        }else if (!user && profile){
          var newUser = new User({ facebookId: profile.id,
                                   username: profile.id,
                                   first_name: profile.first_name,
                                   last_name: profile.last_name,
                                   email: profile.email
                                 });

          newUser.save(function(err, user){
            if(err || !user){
              return done(null, false, { message: 'Bad Request' });
            }else{
              return done(null, user);
            }
          });
        }else {
          return done(err, user);
        }
      });
    }
  ));
};

module.exports.ensureAuthenticated = function (req, res, next){
  if (req.path === '/login/' || req.path === '/signup/') {
    return next();
  }else{
    return req.isAuthenticated() ? next() : res.send(403);
  }
};
