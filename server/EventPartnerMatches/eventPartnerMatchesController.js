'use strict';
const bookshelf = require('../../test/fixtures/DB-fixture').bookshelf;
const knex = require('../../test/fixtures/DB-fixture').knex;
const EventPartnerMatches = require('./eventPartnerMatchesModel');
const UserEvents = require('../UserEvents/userEventsModel');
const shuffle = require('../Utils/shuffle');

const eventPartnerMatches = {};

eventPartnerMatches.createTable = () => {
  return knex.schema.createTableIfNotExists('event-partner-matches', eventPartnerMatch => {
    eventPartnerMatch.increments();
    eventPartnerMatch.integer('eventID');
    eventPartnerMatch.string('partner1');
    eventPartnerMatch.string('partner2');
  });
};

eventPartnerMatches.createMatches = (req, res) => {
  UserEvents
    .query({
      where: {
        eventID: req.params.eventID,
        rsvpStatus: 'attending',
      }
    })
    .fetchAll()
    .then((collection) => collection.map(item => item.attributes.email))
    .then((attending) => eventPartnerMatches.createEventPartnerMatches(req, res, shuffle(attending)));
};

eventPartnerMatches.createEventPartnerMatches = (req, res, orderedMatches) => {
  eventPartnerMatches.createTable()
    .then(() => {
      EventPartnerMatches
        .query({ where: { eventID: req.params.eventID } })
        .destroy();

      const matches = [];
      const promisedMatches = orderedMatches.map((partner1, i) => new Promise(resolve => {
        EventPartnerMatches.forge({
          eventID: req.params.eventID,
          partner1,
          partner2: orderedMatches[i + 1] || orderedMatches[0],
        }).save().then(result => {
          resolve(matches.push(result));
        });
      }));

      Promise.all(promisedMatches).then(() => {
        res.status(200);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ matches }));
        res.end();
      });
    })
    .catch(err => {
      console.log('error reached', err);
      return res.status(400).send('Error matching users for event');
    });
};


module.exports = eventPartnerMatches;
