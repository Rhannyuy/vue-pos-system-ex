// Express
var express = require("express");
var app = express();

var cors = require('cors');
app.use(cors());

var jwt = require('jsonwebtoken');

// Body Parser
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Session
// var session = require("express-session");
// app.use(session({
// 	secret: 'keyboard cat', // secret key
// 	resave: false, // default value
// 	saveUninitialized: true, // saves empty objects
// }));

var inventory = [
  {
    name: 'Hamburger',
    key: 'hamburger',
    cost: 200, // in cents
    image: 'hamburger.png',
    vegetarian: false
  },
  {
    name: 'Corn on the Cob',
    key: 'corn',
    cost: 150,
    image: 'corn.png',
    vegetarian: true
  },
  {
    name: 'Pizza',
    key: 'pizza_whole',
    cost: 995,
    image: 'pizza.png',
    vegetarian: true
  },
  {
    name: 'Pizza Slice',
    key: 'pizza_slice',
    cost: 99,
    image: 'pizza_slice.png',
    vegetarian: true
  },
  {
    name: 'Ramen',
    key: 'ramen',
    cost: 450,
    image: 'Ramen.png',
    vegetarian: false
  },
  {
    name: 'Sandwich',
    key: 'sandwich',
    cost: 650,
    image: 'sandwich.png',
    vegetarian: false
  },
  {
    name: 'Chicken Skewer',
    key: 'chicken_skewer',
    cost: 450,
    image: 'Skewer.png',
    vegetarian: false
  },
  {
    name: 'Soda',
    key: 'soda',
    cost: 99,
    image: 'soda.png',
    vegetarian: true
  },
  {
    name: 'Sushi',
    key: 'sushi',
    cost: 350,
    image: 'sushi.png',
    vegetarian: false
  },
  {
    name: 'Waffle',
    key: 'waffle',
    cost: 375,
    image: 'Waffle.png',
    vegetarian: true
  }
];

app.get(
  '/inventory',
  function(req, res) {
    // "Bearer: token"
    var user_token = req.headers.authorization.split(' ')[1];
    try {
      jwt.verify(user_token, 'secret-key-goes-here');
      res.send(inventory);
    } catch (err) {
      res.send("error");
    }

  }
);

app.post('/login', function(req, res) {
  if (req.body.username === "erty" && req.body.password === "1234") {
    res.send({
      jwt: jwt.sign(
        {
          user: 'erty'
        },
        'secret-key-goes-here'
      )
    });

  }
});

// Serve Static Files
app.use(express.static('public'));

// 404 Middleware
app.use(function(req, res, next) {
  res.status(404);
  res.send("404 File Not Found ... :( ");
});

// 500 Middleware
app.use(function(err, req, res, next) {
  console.log(err);
  res.status(500);
  res.send("500 Internal server error... D:");
});


// Actually Start the Server
app.listen(3030, function() {
  console.log("ok you have a server :)");
});
