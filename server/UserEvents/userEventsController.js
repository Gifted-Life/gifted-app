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
    userEvent.integer('eventID');
    userEvent.string('rsvpStatus');
  });
};  

userEventsController.createUserEventConnection = (req, res, next) => {
  const isCreatingEvent = req.url.indexOf('invite-user');
  
  if (isCreatingEvent === -1) {
    userEventsController.createTable()
    .then( () => {
      UserEvents.forge({ email: req.body.creator, eventID: req.body.eventID, rsvpStatus: 'attending' }).save().then( result => {
        res.status(201).send({
          eventID: req.body.eventID
        });
      });
    })
    .catch( err => {
      return res.status(400).send('Error adding user-event connection.');
    });
  } else {
    userEventsController.createTable()
    .then( () => {
      UserEvents
        .query({where: {email: req.body.inviteUser}, andWhere: {eventID: req.params.eventID}})
        .fetch()
        .then( model => {
          if (model) {
            return res.status(400).send('User has already been invited to event.');
          } 
          
          UserEvents.forge({ email: req.body.inviteUser, eventID: req.params.eventID, rsvpStatus: 'pending' }).save().then( result => {
            next();
          });
        });
    })
    .catch( err => {
      return res.status(400).send('Error inviting user-event connection.');
    });
  }
};

userEventsController.getEvents = (req, res, next) => {
  knex
    .select()
    .from('events')
    .innerJoin('user-events', 'user-events.eventID', 'events.eventID')
    .innerJoin('users', 'user-events.email', 'users.email')
    .where('users.email', req.body.email)
    .then( result => {
      return res.status(201).send({
        id_token: tokenController.createToken(req.body, req.body.emailid),
        events: result
      });
    })
    .catch( err => {
      return res.status(400).send('Error querying for all events associated with user.');
    });
};

userEventsController.updateUserEventConnection = (req, res, next) => {
  knex('user-events')
    .where('user-events.email', req.params.email).andWhere('user-events.eventID', '=', req.params.eventID)
    .update({
      rsvpStatus: req.body.response
    })
    .then( result => {
      return res.status(200).send('Response for event was successfully saved!');
    })
    .catch( err => {
      return res.status(400).send('Error responding to event invite.');
    });
};

module.exports = userEventsController;
