'use strict';
const bookshelf = require('../../test/fixtures/DB-fixture').bookshelf;
const knex = require('../../test/fixtures/DB-fixture').knex;
const UserEvents = require('./userEventsModel');
const User = require('../Users/userModel.js');
const tokenController = require('../Utils/tokenController');
const _ = require('lodash');

const userEventsController = {};

userEventsController.createTable = () => {
  return knex.schema.createTableIfNotExists('user-events', userEvent => {
    userEvent.increments();
    userEvent.string('email');
    userEvent.integer('eventid');
    userEvent.string('rsvpStatus');
  });
};  

userEventsController.createUserEventConnection = (req, res, next) => {
  userEventsController.createTable()
    .then( () => {
      UserEvents.forge({ email: req.body.creator, eventid: req.body.eventID, rsvpStatus: 'attending' }).save().then( result => {
        res.status(201).send({
          eventID: req.body.eventID
        });
      });
    })
    .catch( err => {
      res.status(400).send('Error adding user-event connection.');
    });
};

userEventsController.getEvents = (req, res, next) => {
  UserEvents
    .query({where: {email: req.body.email}})
    .fetchAll()
    .then( events => {
      if (!events) {
        return res.status(201).send('No events associated with this user.');
      }
      
      const allEvents = [];

      _.forEach(events.models, (event, key) => {
        allEvents.push(event.attributes.eventid);
      });

      //TODO fetch event info for each eventid in allEvents array

      console.log(allEvents);
      
      res.status(201).send({
        id_token: tokenController.createToken(req.body, req.body.emailid),
        events: allEvents
      });
    })
    .catch( err => {
      console.log('wdwdwdwd inside err');
      res.status(400).send('Error fetching events associated with user.');
    });
};

module.exports = userEventsController;
