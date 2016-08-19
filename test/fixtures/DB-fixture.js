'use strict';

const knex = require('knex')({
  client: 'pg',
  connection: process.env.TEST_DB
});

const bookshelf = require('bookshelf')(knex);

const User = bookshelf.Model.extend({
  tableName: 'users'
});

const Event = bookshelf.Model.extend({
  tableName: 'events',
  idAttribute: 'eventID'
});

const UserEvents = bookshelf.Model.extend({
  tableName: 'user-events'
});

const EventPartnerMatches = bookshelf.Model.extend({
  tableName: 'event-partner-matches'
});

const fakeEvent = {
  title: 'Christmas Party!',
  location: 'Mom\'s house',
  time: '8:00pst',
  comments: 'bring love to everything you do',
  priceMin: 10,
  priceMax: 25
};

// Need email user id column?
knex.schema.createTableIfNotExists('users', user => {
  user.increments();
  user.string('name');
  user.string('email');
  user.string('password');
})
.then( () => {
  User.forge({ name: 'Fluffy', email: 'test@xyz.com', password: 'ponies98' }).save().then( result => {
    console.log('user successfully created', result);
  });
});

// Need to add creator column?
knex.schema.createTableIfNotExists('events', event => {
  event.increments('eventID');
  event.string('title');
  event.string('location');
  event.string('time');
  event.string('comments');
  event.integer('priceMin');
  event.integer('priceMax');
  event.boolean('isMatched');
})
.then( () => {
  Event.forge(fakeEvent).save().then( result => {
    console.log('event successfully created', result);
  });
});

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

knex.schema.createTableIfNotExists('event-partner-matches', eventPartnerMatch => {
  eventPartnerMatch.increments();
  eventPartnerMatch.integer('eventID');
  eventPartnerMatch.string('partner1');
  eventPartnerMatch.string('partner2');
})
.then( () => {
  EventPartnerMatches.forge({ eventID: 1234, partner1: 'me123', partner2: 'you123' }).save().then( result => {
    console.log('successfully added event partner match', result);
  });
});

module.exports = {
  bookshelf,
  User,
  Event,
  UserEvents,
  EventPartnerMatches,
};
