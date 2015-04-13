var morgan = require('morgan'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    cookieParser = require('cookie-parser'),
    expressSession = require('cookie-session');

module.exports = function(app, express) {
  var userRouter = express.Router();
  var classRouter = express.Router();
  var paymentRouter = express.Router();
  app.use(morgan('dev'));

  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    if ('OPTIONS' == req.method) {
      res.send(200);
    } else {
      next();
    }
  });

  app.use(cookieParser());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(expressSession({secret: 'secret'}));
  app.use(passport.initialize());
  app.use(passport.session());

  require('../api/users/userRoutes.js')(userRouter, passport);
  require('../api/classes/classRoutes.js')(classRouter);
  require('../api/payments/paymentRoutes.js')(paymentRouter);

  app.use('/api/payments', paymentRouter);
  app.use('/api/users', userRouter); // use user router for all user requests
  app.use('/api/classes', classRouter); //use bookings router for all booking requests
};