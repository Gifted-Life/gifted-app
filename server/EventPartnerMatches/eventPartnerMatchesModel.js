'use strict';
const bookshelf = require('../../test/fixtures/DB-fixture').bookshelf;
const knex = require('../../test/fixtures/DB-fixture').knex;

const EventPartnerMatches = bookshelf.Model.extend({
  tableName: 'event-partner-matches'
});

module.exports = EventPartnerMatches;