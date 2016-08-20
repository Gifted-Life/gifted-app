'use strict';
const bookshelf = require('../../test/fixtures/DB-fixture').bookshelf;
const knex = require('../../test/fixtures/DB-fixture').knex;

const UserEvents = bookshelf.Model.extend({
  tableName: 'user-events'
});

module.exports = UserEvents;