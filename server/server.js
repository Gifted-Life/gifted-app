const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.config');
const userController = require('./Users/userController');
const eventController = require('./Events/eventController');

const app = express();
const PORT = 3000;
const DEVPORT = 9090;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './../')));

app.post('/user/signup', userController.createUser);

app.post('/user/auth', (req, res) => {
  res.status(200).send('User successfully logged in!');
});

app.post('/:userid/event', eventController.createEvent); 

app.post('/event/:eventid/invite-user', (req, res) => {
  res.status(200).send('Successfully invited user to event!');
});

app.put('/:userid/:eventid/response', (req, res) => {
  res.status(200).send('Successfully responded to event!');
});

app.post('/event/:eventid/match', (req, res) => {
  const matchedUser = {
    matchedUser: 'Erlich Bachman',
  };
  
  res.status(200).send(matchedUser);
});

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
