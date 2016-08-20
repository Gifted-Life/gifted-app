'use strict';
const bookshelf = require('../../test/fixtures/DB-fixture').bookshelf;
const knex = require('../../test/fixtures/DB-fixture').knex;

const Event = bookshelf.Model.extend({
  tableName: 'events',
  idAttribute: 'eventID'
});

module.exports = Event;