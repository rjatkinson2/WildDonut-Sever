var morgan = require('morgan'),
    bodyParser = require('body-parser'),
    cors = require('cors');


module.exports = function(app, express) {
  //We can use multiple routers with their own configurations
  var userRouter = express.Router();
  var classRouter = express.Router();  
  var paymentRouter = express.Router();  
  
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
  app.use('/api/payments', paymentRouter);
  app.use('/api/users', userRouter); // use user router for all user requests
  app.use('/api/classes', classRouter); //use bookings router for all booking requests  
  
  require('../api/users/userRoutes.js')(userRouter);
  require('../api/classes/classRoutes.js')(classRouter);
  require('../api/payments/paymentRoutes.js')(paymentRouter);
};