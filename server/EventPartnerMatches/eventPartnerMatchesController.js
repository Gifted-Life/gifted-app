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
  console.log('req.params',req.params);
  UserEvents
  .query({where: {
    eventid: req.params.eventID,
    rsvpStatus: 'attending',
  }})
  .fetchAll()
  .then((collection) => {
    return collection.map(function(item) {
      return item.attributes.email;
    });
  })
  .then((attending) => {
    eventPartnerMatches.createEventPartnerMatches(req, res, shuffle(attending));
  })
}

eventPartnerMatches.createEventPartnerMatches = (req, res, orderedMatches) => {
  eventPartnerMatches.createTable()
    .then( () => {
      const toSend = [];
      var results = orderedMatches.map( (partner1, i) => {
        return new Promise( resolve => {
          EventPartnerMatches.forge({
            eventID: req.params.eventID,
            partner1: partner1,
            partner2: orderedMatches[i + 1] || orderedMatches[0],
          }).save().then( result => {
            resolve(toSend.push(result));
          })
        });
      })

      Promise.all(results).then(() => {
        res.status(200);
        res.writeHead(200, {'Content-Type': 'application/json' });
        res.write(JSON.stringify({matches: toSend}));
        res.end();
      });
    })
    .catch( err => {
      console.log('error reached', err);
      return res.status(400).send('Error matching users for event');
    });
};


module.exports = eventPartnerMatches;
