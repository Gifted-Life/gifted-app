'use strict';
const bookshelf = require('../../test/fixtures/DB-fixture').bookshelf;
const knex = require('../../test/fixtures/DB-fixture').knex;
const EventPartnerMatches = require('./eventPartnerMatchesModel');

const eventPartnerMatches = {};

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

module.exports = eventPartnerMatches;