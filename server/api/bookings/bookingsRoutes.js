var bookingsController = require('./bookingsController.js');

module.exports = function(app) {
  //app === bookingRouter injected form middleware.js

  //Bookings
  app.post('/', bookingsController.createBookings);
  app.get('/students/:id', bookingsController.getUserBookings);	
  app.get('/teachers/:id', bookingsController.getTeacherBookings);  

};