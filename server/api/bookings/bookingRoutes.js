var bookingController = require('./bookingController.js');

module.exports = function(app) {
  //app === bookingRouter injected form middleware.js

  //Bookings
  app.post('/', bookingController.createBooking);
  app.get('/students/:id', bookingController.getUserBookings);	
  app.get('/teachers/:id', bookingController.getTeacherBookings);  

};