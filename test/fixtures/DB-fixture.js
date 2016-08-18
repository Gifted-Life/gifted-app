'use strict';

const knex = require('knex')({
  client: 'pg',
  connection: process.env.TEST_DB
});

const bookshelf = require('bookshelf')(knex);

const User = bookshelf.Model.extend({
  tableName: 'users'
});

const Event = bookshelf.Model.extend({
  tableName: 'events',
  idAttribute: 'eventID'
});

const fakeEvent = {
  title: 'Christmas Party!',
  location: 'Mom\'s house',
  time: '8:00pst',
  comments: 'bring love to everything you do',
  priceMin: 10,
  priceMax: 25
};

knex.schema.createTableIfNotExists('users', user => {
  user.increments();
  user.string('name');
  user.string('email');
  user.string('password');
})
.then( () => {
  User.forge({name: 'Fluffy', email: 'test@xyz.com', password: 'ponies98'}).save().then( result => {
    console.log('user successfully created', result);
  });
});

knex.schema.createTableIfNotExists('events', event => {
  event.increments('eventID');
  event.string('title');
  event.string('location');
  event.string('time');
  event.string('comments');
  event.integer('priceMin');
  event.integer('priceMax');
  event.boolean('isMatched');
})
.then( () => {
  Event.forge(fakeEvent).save().then( result => {
    console.log('event successfully created', result);
  });
});
  
module.exports = {
  bookshelf,
  User,
  Event
};