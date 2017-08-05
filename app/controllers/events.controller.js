const Event = require('../models/event');
module.exports = {
showEvents: showEvents,
showSingle : showSingle,
seedEvents : seedEvents,
showCreate: showCreate,
processCreate: processCreate
}

/**
 * show all events
 */
function showEvents(req,res){

  // get all events
  Event.find({},(err,events) => {
    if(err){
      res.status(404);
      res.send('Events not found!');
    }
    // return a view with data
    res.render('pages/events',{events: events});
  });
}

/**
 * show a single events
 */
function showSingle(req,res){
  // get a single event
  Event.findOne({ slug: req.params.slug }, (err,event) => {
    if(err){
      res.status(404);
      res.send('Event not found!');
    }
    res.render('pages/single', {event:event});
  });
}

/**
 * Seeding pour events
 */
 function seedEvents(req,res){
  // create some events
  const events = [
    {name: 'Basketball',description : 'Throwing into a basket'},
    {name: 'Swimming',description : 'Michael Phelps is the first fish.'},
    {name: 'Weightlifting',description : 'Lifting heavy things up.'},
    {name: 'Ping Pong', description : 'Super fast paddles'}
  ];

  // use the event model to insert/save
  Event.remove({}, () => {
    for(event of events) {
      var newEvent = new Event(event);
      newEvent.save();
    }
  });
  // seeded!
  res.send('Database seeded!');
}

/**
 * Show the create form
 */
 function showCreate(req,res){
   res.render('pages/create');
 }

 /**
  * Process the create form
  */
  function processCreate(req,res){
    // create a new event
    const event = new Event({
      name: req.body.name,
      description : req.body.description
    });

    event.save((err) =>{
      if(err){
        throw err;
      }
      // redirect to newly created event
      res.redirect(`/events/${event.slug}`);
    });
  }
