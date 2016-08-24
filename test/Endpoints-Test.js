'use strict';
const test = require('tape');
const request = require('supertest-as-promised');
const app = require('../server/server');
const faker = require('faker');
const jwt = require('jsonwebtoken');
const knex = require('./fixtures/DB-fixture').knex;
const knexCleaner = require('knex-cleaner');
const jwtKey = process.env.JWT_KEY;

const destroy = t => {
  knexCleaner.clean(knex).then( () => {
    t.end(); 
  });
};

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
      let token;

      if (jwtKey === undefined) {
        token = jwt.verify(res.body.id_token, process.env.JWT_SECRET);
      } else {
        token = jwt.verify(res.body.id_token, jwtKey);
      }

      t.ok(res.body.id_token, 'jwt should exist');
      t.ok(token.email, 'emailid on token should exist');
      t.equal(token.admin, false, 'admin should be set to false on jwt upon signup');
      t.same(res.status, 201, 'correct status code was sent');
      destroy(t);
    });
});

test('Succesfully creates an event & connects user with event', (t) => {
  const name = faker.name.firstName(),
        email = faker.internet.email(),
        password = faker.internet.password();

  request(app)
    .post('/user/signup')
    .send({
      name,
      email,
      password
    })
    .expect(201)
    .then( res => {
      return request(app)
        .post(`/${email}/event`)
        .send({
          title: 'Christmas Party!',
          location: 'Mom\'s house',
          time: '8:00pst',
          comments: 'bring love to everything you do',
          priceMin: 10,
          priceMax: 25,
          isMatched: false,
          creator: email
        })
        .expect(201);
    })
    .then( res => {
      t.ok(res.body.eventID, 'eventID should exist');
      destroy(t);
    });
});

test('Successfully logins user and returns all events associated with that user', (t) => {
  const name = faker.name.firstName(),
        email = faker.internet.email(),
        password = faker.internet.password();

  request(app)
    .post('/user/signup')
    .send({
      name,
      email,
      password
    })
    .expect(201)
    .then( res => {
      return request(app)
        .post(`/${email}/event`)
        .send({
          title: 'Christmas Party!',
          location: 'Mom\'s house',
          time: '8:00pst',
          comments: 'bring love to everything you do',
          priceMin: 10,
          priceMax: 25,
          isMatched: false,
          creator: email
        })
        .expect(201);
    })
    .then( res => {
      return request(app)
        .post('/user/login')
        .send({
          email,
          password
        })
        .expect(201);
    })
    .then( res => {
      t.ok(res.body.id_token, 'jwt should exist');
      t.ok(res.body.events, 'events should exist');
      t.same(res.status, 201, 'correct status code was sent');
      destroy(t);
    });
});

test('Successfully invites user to event', (t) => {
  const name = faker.name.firstName(),
        email = faker.internet.email(),
        password = faker.internet.password();

  request(app)
    .post('/user/signup')
    .send({
      name,
      email,
      password
    })
    .expect(201)
    .then( res => {
      return request(app)
        .post('/event/1/invite-user')
        .send({
          inviteUser: email
        })
        .expect(200);
    })
    .then( res => {
      t.same(res.status, 200, 'correct status code was sent');
      destroy(t);
    })
});

test('Successfully submits rsvp response to event', (t) => {
  const user1 = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  };

  const user2 = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  };

  let token,
      eventid;

  request(app)
    .post('/user/signup')
    .send(user1)
    .expect(201)
    .then( res => {
      return request(app)
        .post('/user/signup')
        .send(user2)
        .expect(201)
        .then( () => {
          token = res.body.id_token;
        });
    })
    .then( res => {
      return request(app)
        .post(`/${user1.email}/event`)
        .send({
          title: 'Christmas Party!',
          location: 'Mom\'s house',
          time: '8:00pst',
          comments: 'bring love to everything you do',
          priceMin: 10,
          priceMax: 25,
          isMatched: false,
          creator: user1.email
        })
        .expect(201)
        .then( res => {
          eventid = res.body.eventID;
        });
    })
    .then( res => {
      return request(app)
        .post(`/event/${eventid}/invite-user`)
        .send({
          inviteUser: user2.email
        })
        .expect(200);
    })
    .then( res => {
      return request(app)
        .put(`/${user2.email}/${eventid}/response`)
        .send({
          response: 'attending'
        })
        .expect(200)
    })
    .then( res => {
      t.same(res.status, 200, 'correct status code was sent');
      destroy(t);
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
      destroy(t);
    });
});