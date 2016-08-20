'use strict';
const bookshelf = require('../../test/fixtures/DB-fixture').bookshelf;
const knex = require('../../test/fixtures/DB-fixture').knex;
const UserEvents = require('./userEventsModel');

const userEventsController = {};

knex.schema.createTableIfNotExists('user-events', userEvent => {
  userEvent.increments();
  userEvent.string('userID');
  userEvent.integer('eventID');
  userEvent.string('rsvpStatus');
})
.then( () => {
  UserEvents.forge({ userID: 'me123', eventID: 1234, rsvpStatus: 'pending' }).save().then( result => {
    console.log('user event successfully added', result);
  });
});

module.exports = userEventsController;
