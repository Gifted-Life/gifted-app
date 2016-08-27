'use strict';
const bookshelf = require('../../test/fixtures/DB-fixture').bookshelf;
const knex = require('../../test/fixtures/DB-fixture').knex;
const EventPartnerMatches = require('./eventPartnerMatchesModel');
const UserEvents = require('../UserEvents/userEventsModel');

const eventPartnerMatches = {};

eventPartnerMatches.createTable = () => {
  return knex.schema.createTableIfNotExists('event-partner-matches', eventPartnerMatch => {
    eventPartnerMatch.increments();
    eventPartnerMatch.integer('eventID');
    eventPartnerMatch.string('partner1');
    eventPartnerMatch.string('partner2');
  });
};

eventPartnerMatches.createEventPartnerMatches = (eventID, orderedMatches) => {
  eventPartnerMatches.createTable()
    .then( () => {
      orderedMatches.forEach((person, i) => {
        EventPartnerMatches.forge({
          eventID: eventID,
          partner1: person,
          partner2: orderedMatches[i+1] || orderedMatches[0],
        }).save().then( result => {
          console.log('successfully added event partner match', result);
        });
      })
    })
    .catch( err => {
      return res.status(400).send('Error matching users for event');
    });
};

eventPartnerMatches.createMatches = (req, res, next) => {
  console.log('req.params',req.params);
  UserEvents
    .query({where: {
      eventid: req.params.eventid,
      rsvpStatus: 'attending',
    }})
    .fetchAll()
    .then((collection) => {
      return collection.map(function(item) {
        return item.attributes.email;
      });
    })
    .then((attending) => {
      eventPartnerMatches.createEventPartnerMatches(req.params.eventid, eventPartnerMatches.shuffle(attending));
    })
    next();
}

eventPartnerMatches.shuffle = (arr) => {
  var partition = arr.length, temp, chosen;
  // While there remain elements to shuffle…
  while (partition) {
    // Pick a remaining element…
    chosen = Math.floor(Math.random() * partition);

    // And swap it with the current element.
    temp = arr[--partition];
    arr[partition] = arr[chosen];
    arr[chosen] = temp;
  }
  return arr;
}

module.exports = eventPartnerMatches;
