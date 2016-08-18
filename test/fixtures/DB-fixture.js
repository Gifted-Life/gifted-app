'use strict';
const config = require('../../config.js');

const knex = require('knex')({
  client: 'pg',
  connection: config.TEST_DB,
  pool: {
    min: 1,
    max: 7
  }
});

const bookshelf = require('bookshelf')(knex);

module.exports = {
  bookshelf,
  knex
};