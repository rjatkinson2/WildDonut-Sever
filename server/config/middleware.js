var morgan = require('morgan'),
    bodyParser = require('body-parser'),
    cors = require('cors');

module.exports = function(app, express) {
  //We can use multiple routers with their own configurations
  var userRouter = express.Router();
  var bookingRouter = express.Router();  
  
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  //add static files
  app.use(cors());
  app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept");
    next();
  });

  app.use('/api/users', userRouter); // use user router for all user requests
  app.use('/api/bookings', bookingRouter); //use bookings router for all booking requests  
  
  require('../api/users/userRoutes.js')(userRouter);
  require('../api/bookings/bookingRoutes.js')(bookingRouter);
};