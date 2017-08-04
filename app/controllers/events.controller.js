const Event = require('../models/event');
module.exports = {
showEvents: showEvents,
showSingle : showSingle,
seedEvents : seedEvents
}

/**
 * show all events
 */
function showEvents(req,res){
  // return a view with data
  res.render('pages/events',{events: events});
}

/**
 * show a single events
 */
function showSingle(req,res){
  // get a single event
  console.log(req.params.slug);
  var event = {name: 'Basketball',description : 'Throwing into a basket'};

  console.log(event);
  //onst event = {name: 'Basketball', slug: 'basketball', description : 'Throwing into a basket'};
  res.render('pages/single', {event,event});
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
