var morgan = require('morgan'),
    bodyParser = require('body-parser');

module.exports = function(app, express) {
  //We can use multiple routers with their own configurations
  var userRouter = express.Router();
  var bookingsRouter = express.Router();  
  
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  //add static files  

  app.use('/api/users', userRouter); // use user router for all user requests
  app.use('/api/bookings', bookingsRouter); //use bookings router for all booking requests  
  
  require('../api/users/userRoutes.js')(userRouter);
  require('../api/bookings/bookingsRoutes.js')(bookingsRouter);
};