var express = require('express');

var app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', function(req, res) {

	// ejs render automatically looks in the views folder
	res.render('index');
	//res.send('<h1>Hello world</h1>');
});

app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});

app.post("/customers", (req, res) => {
  try {
        stripe.customers.create({
          name: "test",
          email: "test@gmail.com"
         
        })
      )
      .then(() => res.render("completed.html"))
      .catch(err => console.log(err));
  } catch (err) {
    res.send(err);
  }
});


