'use strict';
const bookshelf = require('../../test/fixtures/DB-fixture').bookshelf;
const knex = require('../../test/fixtures/DB-fixture').knex;
const Event = require('./eventModel');

const eventController = {};

eventController.createTable = () => {
  return knex.schema.createTableIfNotExists('events', event => {
    event.increments('eventID');
    event.string('title');
    event.string('location');
    event.string('time');
    event.string('comments');
    event.integer('priceMin');
    event.integer('priceMax');
    event.boolean('isMatched');
    event.string('creator');
  });
};

eventController.createEvent = (req, res, next) => {
  if (!req.body.title || !req.body.location || !req.body.time ||
      !req.body.comments || !req.body.priceMin || !req.body.priceMax || !req.body.creator) {
    res.status(401).send('Missing one or more event fields');
  }

  eventController.createTable()
    .then( () => {
      Event.forge(req.body).save().then( result => {
        req.body.eventID = result.attributes.eventID;
        next();
      });
    })
    .catch( err => {
      res.status(400).send('Error adding event to database:');
    });
};

module.exports = eventController;