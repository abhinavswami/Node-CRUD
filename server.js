// grab our dependencies

const express   = require('express'),
app             = express(),
port            = process.env.PORT || 8080,
expressLayouts  = require('express-ejs-layouts'),
mongoose        = require('mongoose'),
bodyparser      = require('body-parser'),
session         = require('express-session');
cookieParser    = require('cookie-parser'),
flash           = require('connect-flash'),
expressValidator= require('express-validator');


// configure our dependencies
// set session and cookie parser
app.use(cookieParser());
app.use(session({
  secret:'super-secret-key',
  cookie: {maxAge: 60000},
  resave: false,  // forces the session to be saved back to the store
  saveUninitialized: false  // don't save unmoified sessions
}));
app.use(flash());

// tell express where to look for static assets
app.use(express.static(__dirname + '/public'));

// set ejs as our templating engine
app.set('view engine', 'ejs');
app.use(expressLayouts);

// connect to our database
// for a secured db here is the format : mongoose.connect('mongodb://<username>:<password>@localhost:27173/<dbname>');
mongoose.connect('mongodb://localhost:27016/olympic-events');

// use body parser to grab info from a form
app.use(bodyparser.urlencoded({extended:true}));
app.use(expressValidator());

// set the routes
app.use (require('./app/routes'));

// start the server

app.listen(port, ()  => {
  console.log(`App listening on http://localhost:${port}`);
});
