'use strict';
const bookshelf = require('../../test/fixtures/DB-fixture').bookshelf;
const knex = require('../../test/fixtures/DB-fixture').knex;
const UserEvents = require('./userEventsModel');
const User = require('../Users/userModel.js');
const tokenController = require('../Utils/tokenController');
const _ = require('lodash');
const Event = require('../Events/eventModel.js');
const emailController = require('../Utils/emailController');

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
  const isCreatingEvent = req.url.indexOf('invite-user');
  
  if (isCreatingEvent === -1) {
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
  } else {
    userEventsController.createTable()
    .then( () => {
      UserEvents
        .query({where: {email: req.body.inviteUser}, andWhere: {eventid: req.params.eventid}})
        .fetch()
        .then( model => {
          if (model) {
            return res.status(400).send('User has already been invited to event.');
          } 

          UserEvents.forge({ email: req.body.inviteUser, eventid: req.params.eventid, rsvpStatus: 'pending' }).save().then( result => {
            next();
          });
        });
    })
    .catch( err => {
      res.status(400).send('Error inviting user-event connection.');
    });
  }
};

userEventsController.getEvents = (req, res, next) => {
  knex
    .select('title', 'location', 'time', 'comments', 'priceMin', 'priceMax', 'creator', 'rsvpStatus')
    .from('events')
    .innerJoin('user-events', 'user-events.eventid', 'events.eventID')
    .innerJoin('users', 'user-events.email', 'users.email')
    .where('users.email', req.body.email)
    .then( result => {
      res.status(201).send({
        id_token: tokenController.createToken(req.body, req.body.emailid),
        events: result
      });
    })
    .catch( err => {
      res.status(400).send('Error querying for all events associated with user.');
    });
};

userEventsController.updateUserEventConnection = (req, res, next) => {
  knex('user-events')
    .where('user-events.email', req.params.email).andWhere('user-events.eventid', '=', req.params.eventid)
    .update({
      rsvpStatus: req.body.response
    })
    .then( result => {
      res.status(200).send('Response for event was successfully saved!');
    })
    .catch( err => {
      res.status(400).send('Error responding to event invite.');
    });
};

module.exports = userEventsController;
