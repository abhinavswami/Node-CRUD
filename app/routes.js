// create a new express rouet
const express = require('express'),
router = express.Router(),
mainController = require('./controllers/main.controller');
eventsController = require('./controllers/events.controller');
// export Router
module.exports = router;

// define routes
// main routes
router.get('/',mainController.showHome);

// show all events
router.get('/events',eventsController.showEvents);

// create events
router.get('/events/create',eventsController.showCreate)
router.post('/events/create',eventsController.processCreate);

// edit events
router.get('/events/:slug/edit', eventsController.showEdit);
router.post('/events/:slug', eventsController.processEdit);

// delete events
router.get('/events/:slug/delete', eventsController.deleteEvent);

// seed events
router.get('/events/seed', eventsController.seedEvents);

// show single event
router.get('/events/:slug', eventsController.showSingle);
