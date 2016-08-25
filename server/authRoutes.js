const express = require('express'),
      jwt     = require('express-jwt'),
      jwtKey  = process.env.JWT_KEY;

const eventController = require('./Events/eventController');
const userEventsController = require('./UserEvents/userEventsController');
const emailController = require('./Utils/emailController');
const app = module.exports = express.Router();

let jwtCheck;

if (jwtKey === undefined) {
  require('dotenv').config();

  jwtCheck = jwt({
    secret: process.env.JWT_SECRET,
    credentialsRequired: true,
    getToken: req => {
      if (!req.body.id_token) return res.status(401).send('Missing credentials!')
      return req.body.id_token
    }
  });
} else {
  jwtCheck = jwt({
    secret: jwtKey,
    credentialsRequired: true,
    getToken: req => {
      if (!req.body.id_token) return res.status(401).send('Missing credentials!')
      return req.body.id_token
    }
  });
}

app.use(jwtCheck.unless({path: [/user\//]}));

app.post('/:email/event', eventController.createEvent, userEventsController.createUserEventConnection); 

app.post('/event/:eventID/invite-user', userEventsController.createUserEventConnection, emailController.sendEmail);

app.put('/:email/:eventID/response', userEventsController.updateUserEventConnection);

app.post('/event/:eventID/match', (req, res) => {
  const matchedUser = {
    matchedUser: 'Erlich Bachman'
  }
  
  return res.status(200).send(matchedUser);
});