// grab our dependencies

const express = require('express'),
app = express(),
port = process.env.PORT || 8080,
expressLayouts = require('express-ejs-layouts'),
mongoose = require('mongoose'),
bodyparser = require('body-parser');


// configure our dependencies
// tell express where to look for static assets
app.use(express.static(__dirname + '/public'));

// set ejs as our templating engine
app.set('view engine', 'ejs');
app.use(expressLayouts);

// connect to our database
mongoose.connect('mongodb://admin:admin@ds127173.mlab.com:27173/olympic-events');

// use body parser to grab info from a form
app.use(bodyparser.urlencoded({extended:true}));

// set the routes
app.use (require('./app/routes'));

// start the server

app.listen(port, ()  => {
  console.log(`App listening on http://localhost:${port}`);
});
