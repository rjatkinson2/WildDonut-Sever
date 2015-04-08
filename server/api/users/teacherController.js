var Class = require('../../database/models/classModel.js');
var User = require('../../database/models/userModel.js');
var Options = require('../../database/models/optionModel.js');

module.exports.allTeacherClasses = function(req, res, next){

};

module.exports.allBookedClasses = function(req, res, next){

};

module.exports.allOpenClasses = function(req, res, next){

};

module.exports.createClass = function(req, res, next){

};

module.exports.updateClass = function(req, res, next){
  var classId = req.params.id;

  Class.findById(classId, function(err, classInstance){
  });
};

module.exports.deleteClass = function(req, res, next){

};

module.exports.getClass = function(req, res, next){

};

