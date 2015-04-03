var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// Defines the number of iterations the key setup phase uses.
// Ten is the default value.
var SALT_WORK_FACTOR = 10;

// setup user schma
var UserSchema = new mongoose.Schema({
  // depending on the location data, location will likely need to be converted
  // to a more complicated data structure
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  location: { type: String },
  picture: { type: String },
  bio: { type: String }
});


// convert password to a hash before saving.
UserSchema.pre('save', function(next){
  var user = this;

  // if the password hasn't changed from what's stored in the database, then there's no need to proceed with salt generation
  if(!user.isModified('password')){ return next(); }

  // generate the salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
    if(err){ return next(err); }

    // hash the passowrd along with the newly generated salt
    bcrypt.hash(user.password, salt, null, function(err, hash){
      if(err){ return next(err); }

      // the password associated with the model is stored at user.password
      // we need to replace that value with the new hash before saving
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(guessedPassword, cb){
  bcrypt.compare(guessedPassword, this.password, function(err, isMatch){
    if(err){ return cb(err); }
    cb(null, isMatch);
  });
};

// compile schema into a model, which is a class from which we construct documents.
// export the model to make available to others.
module.exports = mongoose.model('User', UserSchema);


