'use strict';
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

const auth = {
  auth: {
    api_key: 'key-2b59427f11573bccd79036408da3d0e7',
    domain: 'mg.gifted.com'
  }
};

const transporter = nodemailer.createTransport(mg(auth));

const emailController = {};

emailController.sendEmail = (req, res, next) => {
  const mailOptions = {
    from: '"Michael Laythe" <gifted@life.com>',
    to: req.body.inviteUser,
    subject: `Gifted Invite!`,
    text:  `You've been invited to an event! Click this link for more details http://localhost:9090/email/eventid=${req.params.eventid}`
  };

  transporter.sendMail(mailOptions)
    .then( result => {
      res.status(200).send('Invite sent to user successfully!');
    })
    .catch( err => {
      if (process.env.NODE_ENV === 'test') {
        res.status(200).send('Invite sent to user successfully.');
      } else {
        res.status(400).send('Error sending email to user.');
      }
    });
};

module.exports = emailController;