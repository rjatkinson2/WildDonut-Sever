var userController = require('./userController');
var studentController = require('./studentController');
var teacherController = require('./teacherController');
var User = require('../../database/models/userModel.js');

module.exports = function(app) {
  //app === userRouter injected from middleware.js

  //Students:
  app.get('/students/:username', studentController.getStudent);

  //Teachers
  app.get('/teachers', teacherController.allTeachers);
  app.get('/teachers/:username', teacherController.getTeacher);

  //Users:
  app.post('/', userController.createUser);
  app.post('/login', userController.login);
  app.post('/:username', userController.updateUser);
};