'use strict';
const test = require('tape');
const request = require('supertest-as-promised');
const app = require('../server/server');
const faker = require('faker');
const jwt = require('jsonwebtoken');
const knex = require('./fixtures/DB-fixture').knex;
const knexCleaner = require('knex-cleaner');
const jwtKey = process.env.JWT_KEY;

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
      t.ok(token.emailid, 'emailid on token should exist');
      t.equal(token.admin, false, 'admin should be set to false on jwt upon signup');
      t.same(res.status, 201, 'correct status code was sent');
      t.end();
    });
});

test('Succesfully creates an event & connects user with event', (t) => {
  request(app)
    .post('/florian/event')
    .send({
      title: 'Christmas Party!',
      location: 'Mom\'s house',
      time: '8:00pst',
      comments: 'bring love to everything you do',
      priceMin: 10,
      priceMax: 25,
      isMatched: false,
      creator: 'Florian_Sporer@gmail.com'
    })
    .expect(200)
    .end( (err, res) => {
      t.ok(res.body.eventID, 'eventID should exist');
      t.end();
    });
});

test('Successfully logins user and returns all events associated with that user', (t) => {
  request(app)
    .post('/user/login')
    .send({
      email: 'Florian_Sporer@gmail.com',
      password: 'BG8mMrm4S1tUPop'
    })
    .expect(201)
    .end( (err, res) => {
      t.ok(res.body.id_token, 'jwt should exist');
      t.ok(res.body.events, 'events should exist');
      t.same(res.status, 201, 'correct status code was sent');
      t.end();
    });
});

test('Successfully invites user to event', (t) => {
  request(app)
    .post('/event/1/invite-user')
    .send({
      inviteUser: faker.internet.email(),
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
      response: 'attending'
    })
    .expect(200)
    .end( (err, res) => {
      t.same(res.status, 200, 'correct status code was sent');
      t.end();
    });
});

test('Successfully matches group and returns partner match', (t) => {

  function allUnique(obj1, obj2, key) {

    if (Array.isArray(obj1)) {
      obj1.forEach( item => {
        if(obj2[item[key]]) return false;
        obj2[item[key]] = true;
      });
    } else {
      for (let partner in obj1) {
        if (!obj2[partner]) return false;
      }
    }
    return true;
  }

  request(app)
    .post('/event/-1/match')
    .send(null)
    .expect(200)
    .end( (err, res) => {
      t.same(res.status, 200, 'correct status code was sent');
      t.ok(res.body.matches, 'matches should exist');

      var partner1 = {};
      var partner2 = {};

      t.ok(allUnique(res.body.matches, partner1, 'partner1'), 'first partner should be unique');
      t.ok(allUnique(res.body.matches, partner2, 'partner2'), 'second partner should be unique');

      t.ok(allUnique(partner1, partner2), 'partners should be givers and receivers')
      t.end();
    });


});

// const destroy = t => {
//   knexCleaner.clean(knex).then( () => {
//     t.end();
//   });
// };
//
// test('Successfully signups user', (t) => {
//   request(app)
//     .post('/user/signup')
//     .send({
//       name: faker.name.firstName(),
//       email: faker.internet.email(),
//       password: faker.internet.password()
//     })
//     .expect(201)
//     .end( (err, res) => {
//       let token;
//
//       if (jwtKey === undefined) {
//         token = jwt.verify(res.body.id_token, process.env.JWT_SECRET);
//       } else {
//         token = jwt.verify(res.body.id_token, jwtKey);
//       }
//
//       t.ok(res.body.id_token, 'jwt should exist');
//       t.ok(token.email, 'email on token should exist');
//       t.equal(token.admin, false, 'admin should be set to false on jwt upon signup');
//       t.same(res.status, 201, 'correct status code was sent');
//       destroy(t);
//     });
// });
//
// test('Succesfully creates an event & connects user with event', (t) => {
//   const name = faker.name.firstName(),
//         email = faker.internet.email(),
//         password = faker.internet.password();
//
//   let token;
//
//   request(app)
//     .post('/user/signup')
//     .send({
//       name,
//       email,
//       password
//     })
//     .expect(201)
//     .then( res => {
//       token = res.body.id_token;
//
//       return request(app)
//         .post(`/${email}/event`)
//         .send({
//           id_token: token,
//           title: 'Christmas Party!',
//           location: {
//             name: 'Mom\'s house',
//             address: '123 Shoe Lane',
//             city: 'Riverside',
//             state: 'CA',
//             zip: '92507'
//           },
//           time: {
//             start: new Date("August 28, 2016 11:00:00"),
//             end: new Date("August 28, 2016 1:00:00")
//           },
//           comments: 'bring love to everything you do',
//           priceMin: 10,
//           priceMax: 25,
//           isMatched: false
//         })
//         .expect(201);
//     })
//     .then( res => {
//       t.ok(res.body.eventID, 'eventID should exist');
//       destroy(t);
//     });
// });
//
// test('Successfully logins user and returns all events associated with that user', (t) => {
//   const name = faker.name.firstName(),
//         email = faker.internet.email(),
//         password = faker.internet.password();
//
//   let token;
//
//   request(app)
//     .post('/user/signup')
//     .send({
//       name,
//       email,
//       password
//     })
//     .expect(201)
//     .then( res => {
//       token = res.body.id_token;
//
//       return request(app)
//         .post(`/${email}/event`)
//         .send({
//           id_token: token,
//           title: 'Christmas Party!',
//           location: {
//             name: 'Mom\'s house',
//             address: '123 Shoe Lane',
//             city: 'Riverside',
//             state: 'CA',
//             zip: '92507'
//           },
//           time: {
//             start: new Date("August 28, 2016 11:00:00"),
//             end: new Date("August 28, 2016 1:00:00")
//           },
//           comments: 'bring love to everything you do',
//           priceMin: 10,
//           priceMax: 25,
//           isMatched: false
//         })
//         .expect(201);
//     })
//     .then( res => {
//       return request(app)
//         .post('/user/login')
//         .send({
//           email,
//           password
//         })
//         .expect(201);
//     })
//     .then( res => {
//       t.ok(res.body.id_token, 'jwt should exist');
//       t.ok(res.body.events, 'events should exist');
//       t.same(res.status, 201, 'correct status code was sent');
//       destroy(t);
//     });
// });
//
// test('Successfully invites user to event', (t) => {
//   const user1 = {
//     name: faker.name.firstName(),
//     email: faker.internet.email(),
//     password: faker.internet.password()
//   };
//
//   const user2 = {
//     name: faker.name.firstName(),
//     email: faker.internet.email(),
//     password: faker.internet.password()
//   };
//
//   let eventID,
//       token,
//       token2;
//
//   request(app)
//     .post('/user/signup')
//     .send(user1)
//     .expect(201)
//     .then( res => {
//       token = res.body.id_token;
//
//       return request(app)
//         .post('/user/signup')
//         .send(user2)
//         .expect(201)
//         .then( res => {
//           token2 = res.body.id_token;
//         });
//     })
//     .then( res => {
//       return request(app)
//         .post(`/${user1.email}/event`)
//         .send({
//           id_token: token,
//           title: 'Christmas Party!',
//           location: {
//             name: 'Mom\'s house',
//             address: '123 Shoe Lane',
//             city: 'Riverside',
//             state: 'CA',
//             zip: '92507'
//           },
//           time: {
//             start: new Date("August 28, 2016 11:00:00"),
//             end: new Date("August 28, 2016 1:00:00")
//           },
//           comments: 'bring love to everything you do',
//           priceMin: 10,
//           priceMax: 25,
//           isMatched: false
//         })
//         .expect(201)
//         .then( res => {
//           eventID = res.body.eventID;
//         });
//     })
//     .then( res => {
//       return request(app)
//         .post(`/event/${eventID}/invite-user`)
//         .send({
//           id_token: token,
//           inviteUser: user2.email
//         })
//         .expect(200);
//     })
//     .then( res => {
//       t.same(res.status, 200, 'correct status code was sent');
//       destroy(t);
//     })
// });
//
// test('Successfully submits rsvp response to event', (t) => {
//   const user1 = {
//     name: faker.name.firstName(),
//     email: faker.internet.email(),
//     password: faker.internet.password()
//   };
//
//   const user2 = {
//     name: faker.name.firstName(),
//     email: faker.internet.email(),
//     password: faker.internet.password()
//   };
//
//   let eventID,
//       token,
//       token2;
//
//   request(app)
//     .post('/user/signup')
//     .send(user1)
//     .expect(201)
//     .then( res => {
//       token = res.body.id_token;
//
//       return request(app)
//         .post('/user/signup')
//         .send(user2)
//         .expect(201)
//         .then( res => {
//           token2 = res.body.id_token;
//         });
//     })
//     .then( res => {
//       return request(app)
//         .post(`/${user1.email}/event`)
//         .send({
//           id_token: token,
//           title: 'Christmas Party!',
//           location: {
//             name: 'Mom\'s house',
//             address: '123 Shoe Lane',
//             city: 'Riverside',
//             state: 'CA',
//             zip: '92507'
//           },
//           time: {
//             start: new Date("August 28, 2016 11:00:00"),
//             end: new Date("August 28, 2016 1:00:00")
//           },
//           comments: 'bring love to everything you do',
//           priceMin: 10,
//           priceMax: 25,
//           isMatched: false
//         })
//         .expect(201)
//         .then( res => {
//           eventID = res.body.eventID;
//         });
//     })
//     .then( res => {
//       return request(app)
//         .post(`/event/${eventID}/invite-user`)
//         .send({
//           id_token: token,
//           inviteUser: user2.email
//         })
//         .expect(200);
//     })
//     .then( res => {
//       return request(app)
//         .put(`/${user2.email}/${eventID}/response`)
//         .send({
//           id_token: token2,
//           response: 'attending'
//         })
//         .expect(200)
//     })
//     .then( res => {
//       t.same(res.status, 200, 'correct status code was sent');
//       destroy(t);
//     });
// });

// test('Successfully matches group and returns partner match', (t) => {
//   request(app)
//     .post('/event/1234/match')
//     .send({null})
//     .expect(200)
//     .end( (err, res) => {
//       t.same(res.status, 200, 'correct status code was sent');
//       t.ok(res.body.matchedUser, 'matchedPartner should exist');
//       destroy(t);
//     });
// });
