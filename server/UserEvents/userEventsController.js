'use strict';
const bookshelf = require('../../test/fixtures/DB-fixture').bookshelf;
const knex = require('../../test/fixtures/DB-fixture').knex;
const UserEvents = require('./userEventsModel');
const User = require('../Users/userModel.js');
const tokenController = require('../Utils/tokenController');
const _ = require('lodash');
const Event = require('../Events/eventModel.js');

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
      
      const eventPromises = [];
      let eventIDs = [];
      let eventsInfo = [];

      //push every eventid from query results
      _.forEach(events.models, (event, key) => {
        eventIDs.push(event.attributes.eventid);
      });

      //get rid of duplicates
      eventIDs = _.uniq(eventIDs);

      //find each event from the eventids & push into promise array
      _.forEach(eventIDs, (eventid, key) => {
        eventPromises.push(Event.query({where: {eventID: eventid}}).fetch());
      });

      //model is an array that contains the accum result of running through each promise
      Promise.all(eventPromises).then( model => {
        return model;
      })
      .then( events => {
        //get rid of nulls
        _.forEach(events, (event, key) => {
          if (event) {
            eventsInfo.push(event.attributes);
          }
        });

        res.status(201).send({
          id_token: tokenController.createToken(req.body, req.body.emailid),
          events: eventsInfo
        });
      })
      .catch( err => {
        console.log('Error fetching event', err.message);
      })
    })
    .catch( err => {
      res.status(400).send('Error fetching events associated with user.');
    });
};

module.exports = userEventsController;
