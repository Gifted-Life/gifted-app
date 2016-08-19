'use strict';
const bookshelf = require('../../test/fixtures/DB-fixture').bookshelf;
const knex = require('../../test/fixtures/DB-fixture').knex;

const User = bookshelf.Model.extend({
  tableName: 'users'
});

module.exports = User;