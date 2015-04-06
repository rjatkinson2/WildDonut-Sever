var bookingController = require('./bookingController.js');

module.exports = function(app) {
  //app === bookingRouter injected form middleware.js

  //Bookings
  app.post('/', bookingController.createBooking);
  app.get('/students/:username', bookingController.getUserBookings);	
  app.get('/teachers/:username', bookingController.getTeacherBookings);  

};