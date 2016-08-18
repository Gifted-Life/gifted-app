'use strict';
const bookshelf = require('../../test/fixtures/DB-fixture').bookshelf;
const knex = require('../../test/fixtures/DB-fixture').knex;
const User = require('./userModel');

const userController = {};

userController.createTable = () => {
  return knex.schema.createTableIfNotExists('users', user => {
    user.increments();
    user.string('name');
    user.string('email');
    user.string('password');
  });
};

userController.createUser = (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    res.status(401).send('Missing name, email, or password!');
  }

  userController.createTable()
    .then( () => {
      User
        .query({where: {email: req.body.email}})
        .fetch()
        .then( model => {
          if (model) {
            return res.status(400).send('Username is already taken.');
          }
      
          User.forge(req.body).save().then( result => {
            res.status(201).send('User successfully added to database');
          });
        });
    })
    .catch( err => {
      res.status(400).send('Error adding user to database');
    });
};

module.exports = userController;