const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.config');
const userController = require('./Users/userController');
const eventController = require('./Events/eventController');
const userEventsController = require('./UserEvents/userEventsController');
const emailController = require('./Utils/emailController');
const matchesController = require('./EventPartnerMatches/eventPartnerMatchesController');

const app = express();
const PORT = 3000;
const DEVPORT = 9090;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './../')));

app.post('/user/signup', userController.createUser);

app.post('/user/login', userController.authenticateUser, userEventsController.getEvents);

app.post('/:userid/event', eventController.createEvent, userEventsController.createUserEventConnection);

app.post('/event/:eventid/invite-user', userEventsController.createUserEventConnection, emailController.sendEmail);

app.post('/email/eventid', (req, res, next) => {
  res.status(200).send('Successfully responded to event!');
});

app.post('/email/eventid', (req, res, next) => {
  res.status(200).send('Successfully responded to event!');
});

// app.post('/event/:eventid/match', matchesController.match, (req, res) => {
//   const matchedUser = {
//     matchedUser: 'Erlich Bachman',
//   };
//   res.status(200).send(matchedUser);
// });

app.get('/app.js', (req, res) => {
  if (process.env.PRODUCTION) {
    res.sendFile(path.join(__dirname, '/src/bundle/app.js'));
  } else {
    res.redirect(`//localhost:${DEVPORT}/src/bundle/app.js`);
  }
});

// Serve aggregate stylesheet depending on environment
app.get('/style.css', (req, res) => {
  if (process.env.PRODUCTION) {
    res.sendFile(path.join(__dirname, '/style.css'));
  } else {
    res.redirect(`//localhost:${DEVPORT}/style.css`);
  }
});

// Serve index page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'index.html'));
});


app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  noInfo: true,
  historyApiFallback: true,
}).listen(DEVPORT, 'localhost', (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(`Webpack Dev Server started at ${DEVPORT}`);
});

module.exports = app;
