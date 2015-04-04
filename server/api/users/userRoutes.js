var userController = require('./userController.js');

module.exports = function(app) {
  //app === userRouter injected from middleware.js
  
  //Users:
  app.post('/', userController.createUser);
  app.get('/:id', userController.updateUser);
  app.post('/login', userController.login); 

  //Students:
  app.get('/students/:id', userController.getStudent);

  //Teachers
  app.get('/teachers', userController.allTeachers);
  app.get('/teachers/:id', userController.getTeacher);
};