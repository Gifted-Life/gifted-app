'use strict';
const bookshelf = require('../../test/fixtures/DB-fixture').bookshelf;
const knex = require('../../test/fixtures/DB-fixture').knex;
const Event = require('./eventModel');

const eventController = {};

eventController.createTable = () => {
  return knex.schema.createTableIfNotExists('events', event => {
    event.increments('eventID');
    event.string('title');
    event.string('name');
    event.string('address');
    event.string('city');
    event.string('state');
    event.string('zip');
    event.dateTime('start');
    event.dateTime('end');
    event.string('comments');
    event.integer('priceMin');
    event.integer('priceMax');
    event.boolean('isMatched');
    event.string('creator');
  });
};

eventController.createEvent = (req, res, next) => {
  if (!req.body.title || !req.body.location || !req.body.time ||
      !req.body.comments || !req.body.priceMin || !req.body.priceMax || !req.user) {
    return res.status(401).send('Missing one or more event fields');
  }
  
  const event = {
    title: req.body.title,
    name: req.body.location.name,
    address: req.body.location.address,
    city: req.body.location.city,
    state: req.body.location.state,
    zip: req.body.location.zip,
    start: req.body.time.start,
    end: req.body.time.end,
    comments: req.body.comments,
    priceMin: req.body.priceMin,
    priceMax: req.body.priceMax,
    isMatched: req.body.isMatched,
    creator: req.user.email
  };

  eventController.createTable()
    .then( () => {
      Event.forge(event).save().then( result => {
        req.body.eventID = result.attributes.eventID;
        next();
      });
    })
    .catch( err => {
      return res.status(400).send('Error adding event to database:');
    });
};

module.exports = eventController;