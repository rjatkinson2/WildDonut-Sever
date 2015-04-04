var userController = require('./userController');
var studentController = require('./studentController');
var teacherController = require('./teacherController');

module.exports = function(app) {
  //app === userRouter injected from middleware.js
  
  //Users:
  app.post('/', userController.createUser);
  app.get('/:id', userController.updateUser);
  app.post('/login', userController.login); 

  //Students:
  app.get('/students/:id', studentController.getStudent);

  //Teachers
  app.get('/teachers', function(req, res, next){ 
    res.send("imateacher"); 
  });
  app.get('/teachers/:id', teacherController.getTeacher);
};