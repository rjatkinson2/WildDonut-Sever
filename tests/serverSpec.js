var expect = require('chai').expect;
var request = require('request');
var mongoose = require('mongoose');
var User = require('../server/database/models/userModel.js');
var Class = require('../server/database/models/classModel.js');
var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/wild-donut';


/************************************************************/
// Mocha doesn't have a way to designate pending before blocks.
// Mimic the behavior of xit and xdescribe with xbeforeEach.
// Remove the 'x' from beforeEach block when working on
// authentication tests.
/************************************************************/
// var xbeforeEach = function(){};
/************************************************************/


describe('', function() {

  beforeEach(function() {
    if (mongoose.connection.db) return done();
    mongoose.connect(mongoURI, function(err){
      if(err){
        console.log(err);
      }
      else{
        console.log('Connected to Mongo');
      }
    });
    // delete user so she can be created later for the test
    User.remove({username: 'test7'}, function(err){
      if (err){
        return err;
      }
    });    
  });
  after(function(){
      // runs after all tests are run
    User.remove({username: 'test7'}, function(err){
      if (err){
        return err;
      }
    });
    mongoose.disconnect();
  });

  describe('User creation:', function(){
    it('creates a user', function(done){
      var options = {
        'method': 'POST',
        'followAllRedirects': true,
        'uri': 'http://localhost:4568/api/users/signup',
        'withCredentials': true,
        'headers': {
        'Content-Type': 'application/json',
        },
        'json': {
          'username': 'test7',
          'password': 'test7'
        }
      };
      request.post(options, function(error, res, body) {
        expect(res.body.username).to.equal('test7');
        expect(res.body.password).not.to.equal('test7');
        done();
      });
    });
  });
});
