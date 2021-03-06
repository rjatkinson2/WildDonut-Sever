var userController = require('./userController');
var studentController = require('./studentController');
var teacherController = require('./teacherController');
var User = require('../../database/models/userModel.js');

var authController = require('../auth/authController');

module.exports = function(app, passport) {
  //Students:
  authController(passport, User);

  app.all('*', authController.ensureAuthenticated); //requires authentication except for /login or /signup
  app.get('/:username/student/classes/booked', studentController.getBookings);
  app.post('/:username/student/classes/booked', studentController.bookClass);

  //Teachers
  app.get('/:username/teacher/classes', teacherController.allTeacherClasses);
  app.get('/:username/teacher/classes/booked', teacherController.allBookedClasses);
  app.get('/:username/teacher/classes/available', teacherController.allOpenClasses);
  app.post('/:username/teacher/classes', teacherController.createClass);
  app.post('/:username/teacher/classes/:id', teacherController.updateClass);
  app.delete('/:username/teacher/classes/:id', teacherController.deleteClass);
  app.get('/:username/teacher/classes/:id', teacherController.getClass);

  //Users:
  app.post('/signup', userController.createUser);
  app.post('/login', passport.authenticate(['local', 'facebook']), userController.login);
  app.post('/:username', userController.updateUser);
  app.get('/:username', userController.getUser);
};
