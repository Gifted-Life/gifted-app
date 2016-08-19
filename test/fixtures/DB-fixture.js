'use strict';
let knex;

if (process.env.TRAVIS_SECURE_ENV_VARS === 'false') {
  knex = require('knex')({
    client: 'pg',
    connection: process.env.TEST_DB_KEY,
    pool: {
      min: 1,
      max: 7
    }
  });
} else {
  require('dotenv').config();

  knex = require('knex')({
    client: 'pg',
    connection: process.env.TEST_DB,
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