'use strict';
require('dotenv').config();
let knex;

if (process.env.TEST_DB.length) {
  knex = require('knex')({
    client: 'pg',
    connection: process.env.TEST_DB,
    pool: {
      min: 1,
      max: 7
    }
  });
} else {
  knex = require('knex')({
    client: 'pg',
    connection: TEST_DB,
    pool: {
      min: 1,
      max: 7
    }
  });
}

const bookshelf = require('bookshelf')(knex);

module.exports = {
  bookshelf,
  knex
};