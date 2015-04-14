var stripe = require("stripe")("sk_test_tIKHKvXQwEKRQP1QtSYeZomu"); //test key

module.exports.createTransaction = function(req, res, next){
  
  console.log('token on the server:', req.body.stripeToken);

  // Get the credit card details submitted by the form
  var stripeToken = req.body.stripeToken;

  stripe.charges.create({
    amount: 88800000, // amount in cents, again
    currency: "usd",
    source: stripeToken,
    description: "payinguser@example.com"
  }, function(err, charge) {
    if (err && err.type === 'StripeCardError') {
      // The card has been declined
      res.send("card declined:", err);
    }
    res.send(charge);
  });
};
