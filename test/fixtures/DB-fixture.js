'use strict';
const fs = require('fs');
let knex;

if (process.env.TRAVIS_SECURE_ENV_VARS) {
  knex = require('knex')({
    client: 'pg',
    connection: process.env.TEST_DB,
    pool: {
      min: 1,
      max: 7
    }
  });
} else {
  require('dotenv').config();

  console.log('check it homes',  process.env.TEST_DB_URI);
  console.log('wdwdw', TEST_DB_URI);

  knex = require('knex')({
    client: 'pg',
    connection: process.env.TEST_DB_URI,
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