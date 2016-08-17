'use strict';
const test = require('tape');
const request = require('supertest');
const app = require('../server/server');

test('Successfully signups user', (t) => {
  request(app)
    .post('/user/signup')
    .send({
      name: 'Michael',
      email: 'test@xyz.com',
      password: 'fluffyponies96'
    })
    .expect(200)
    .end( (err, res) => {
      t.same(res.status, 200, 'correct status code was sent');
      t.end();
    });
});