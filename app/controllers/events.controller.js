const Event = require('../models/event');
module.exports = {
showEvents: showEvents,
showSingle : showSingle,
seedEvents : seedEvents,
showCreate: showCreate,
processCreate: processCreate,
showEdit: showEdit,
processEdit: processEdit,
deleteEvent: deleteEvent
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
    res.render('pages/events',{
      events: events,
      success: req.flash('success')
    });
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
    res.render('pages/single', {
      event:event,
      success: req.flash('success')
    });
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
   res.render('pages/create', {
     errors: req.flash('errors')
   });
 }

 /**
  * Process the create form
  */
  function processCreate(req,res){
    // validate informtion
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('description', 'Description is required').notEmpty();

    // if there are errors, redirect and save errors to flash
    req.getValidationResult().then(function(result){
      const errors = result.array();
      if(errors.length>0) {
          req.flash('errors', errors.map(err => err.msg));
          res.redirect('/events/create');
      }
      else{
          console.log('Validation Ok');
          // create a new event
          const event = new Event({
            name: req.body.name,
            description : req.body.description
          });

          event.save((err) =>{
            if(err){
              throw err;
            }

            // set a successful flash message
            req.flash('success', 'Successfully created event!');
            // redirect to newly created event
            res.redirect(`/events/${event.slug}`);
        });
      }
    });
  }

  /**
   * Show the edit form
   */
   function showEdit(req,res){
     Event.findOne({slug: req.params.slug}, (err, event) => {
       res.render('pages/edit', {
         event: event,
         errors: req.flash('errors')
       });
     });
   }
   /**
    * Process the edit form
    */
    function processEdit(req,res){
      // validate informtion
      req.checkBody('name', 'Name is required').notEmpty();
      req.checkBody('description', 'Description is required').notEmpty();

      req.getValidationResult().then(function(results){
        const errors = result.array();
        if(errors.length>0) {
            req.flash('errors', errors.map(err => err.msg));
            res.redirect(`/events/${req.params.slug}/edit`);
        }
        else{
          // finding the current event
          Event.findOne({slug:req.params.slug}, (err, event) => {

            // updating the event
            event.name = req.body.name;
            event.description = req.body.description;

            event.save((err) => {
              if(err)
                throw err;

                // success flash message
                req.flash('success','Successfully updated the event');

                // redirect back to full events page
                res.redirect('/events');
              });
            });
        }
      });
    }

    /**
     * Delete an event
     */
     function deleteEvent(req,res){
       Event.remove({slug: req.params.slug}, (err) => {
         // set flash data
         req.flash('success', 'Event deleted!');

         // redirect back to the events page
         res.redirect('/events');
       });
     }
