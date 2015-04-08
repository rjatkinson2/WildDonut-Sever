var classController = require('./classController.js');

module.exports = function(app) {
  //app === bookingRouter injected form middleware.js
  //TODO
  app.get('/', classController.getAllClasses);
};