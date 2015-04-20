var Class = require('../../database/models/classModel.js');

var stripe = require("stripe")("sk_test_tIKHKvXQwEKRQP1QtSYeZomu"); //test key

module.exports.createTransaction = function(req, res, next){
  
  // Get the stripe token with credit card details submitted by the client form
  var stripeToken = req.body.payRequest.token;
  var class_id = req.body.payRequest.class_id;

  Class.findById(class_id, function(err, classObject){
      if(err){
        res.status(400).send('Bad Request');
      }else if(!classObject){
        res.status(403).send('Class not found');
      }else{
        stripe.charges.create({
          amount: classObject.rate*100, // amount in cents
          currency: "usd",
          source: stripeToken,
          description: classObject.description
        }, function(err, charge) {
          if (err && err.type === 'StripeCardError') {
            // The card has been declined
            res.send("card declined:", err);
          }
          res.status(201).send("Successfully booked a class", charge);
        });
      }
    });

};
