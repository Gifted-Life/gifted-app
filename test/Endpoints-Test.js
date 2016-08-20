'use strict';
const test = require('tape');
const request = require('supertest');
const app = require('../server/server');
const faker = require('faker');
const jwt = require('jsonwebtoken');
require('dotenv').config();

test('Successfully signups user', (t) => {
  request(app)
    .post('/user/signup')
    .send({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    })
    .expect(201)
    .end( (err, res) => {
      const token = jwt.verify(res.body.id_token, process.env.JWT_KEY);

      t.ok(res.body.id_token, 'jwt should exist');
      t.ok(token.emailid, 'emailid on token should exist');
      t.equal(token.admin, false, 'admin should be set to false on jwt upon signup');
      t.same(res.status, 201, 'correct status code was sent');
      t.end();
    });
});

test('Succesfully creates an event', (t) => {
  request(app)
    .post('/mlaythe/event')
    .send({
      title: 'Christmas Party!',
      location: 'Mom\'s house',
      time: '8:00pst',
      comments: 'bring love to everything you do',
      priceMin: 10,
      priceMax: 25,
      isMatched: false,
      creator: 'test@xyz.com'
    })
    .expect(200)
    .end( (err, res) => {
      t.ok(res.body.eventID, 'eventID should exist');
      t.end();
    });
});

//TODO test if user receives events when he/she logins
test('Successfully logins user and returns all events associated with that user', (t) => {
  request(app)
    .post('/user/auth')
    .send({
      email: 'test@xyz.com',
      password: 'fluffyponies96'
    })
    .expect(200)
    .end( (err, res) => {
      // t.ok(res.body.id_token, 'jwt should exist');
      t.same(res.status, 200, 'correct status code was sent');
      t.end();
    });
});

test('Successfully invites user to event', (t) => {
  request(app)
    .post('/event/1234/invite-user')
    .send({
      inviteUser: 'erlich',
    })
    .expect(200)
    .end( (err, res) => {
      t.same(res.status, 200, 'correct status code was sent');
      t.end();
    });
});

test('Successfully submits rsvp response to event', (t) => {
  request(app)
    .put('/me123/1234/response')
    .send({
      response: 'pending'
    })
    .expect(200)
    .end( (err, res) => {
      t.same(res.status, 200, 'correct status code was sent');
      t.end();
    });
});

test('Successfully matches group and returns partner match', (t) => {
  request(app)
    .post('/event/1234/match')
    .send(null)
    .expect(200)
    .end( (err, res) => {
      t.same(res.status, 200, 'correct status code was sent');
      t.ok(res.body.matchedUser, 'matchedPartner should exist');
      t.end();
    });
});