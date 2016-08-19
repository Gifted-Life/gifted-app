'use strict';
let knex;

if (process.env.TRAVIS_SECURE_ENV_VARS === 'false') {
  knex = require('knex')({
    client: 'pg',
    connection: process.env.TEST_DB_KEY,
    pool: {
      min: 1,
      max: 7
    }
  });
} else {
  require('dotenv').config();

  knex = require('knex')({
    client: 'pg',
    connection: process.env.TEST_DB,
    pool: {
      min: 1,
      max: 7
    }
  });
}

const bookshelf = require('bookshelf')(knex);

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
  knex,
  bookshelf,
  UserEvents,
  EventPartnerMatches,
};
