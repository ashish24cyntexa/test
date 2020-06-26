var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var stripe = require('stripe')('sk_test_4UNeAg7ULlqyKdIUjHj0hx8G002Zx3RDDz'); // Add your Secret Key Here

var app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// set the view engine to ejs
app.set('view engine', 'ejs');

// This will make our form data much more useful
app.use(bodyParser.urlencoded({ extended: true }));

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', function(req, res) {

	// ejs render automatically looks in the views folder
	res.render('index');
	//res.send('<h1>Hello world</h1>');
});

app.post("/charge", (req, res) => {
  try {
    stripe.customers
      .create({
        name: req.body.name,
        email: req.body.email,
        source: req.body.stripeToken
      })
      .then(customer =>
        stripe.charges.create({
          amount: req.body.amount * 100,
          currency: "usd",
          customer: customer.id
        })
      )
      .then(() => res.render("completed.html"))
      .catch(err => console.log(err));
  } catch (err) {
    res.send(err);
  }
});

app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});
