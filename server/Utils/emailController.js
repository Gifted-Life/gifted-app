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

emailController.sendEmail = (recipient, eventid) => {
  const mailOptions = {
    from: '"Michael Laythe" <gifted@life.com>',
    to: 'mrlaythe24@aol.com',
    subject: `Gifted Invite!`,
    text:  `You've been invited to an event! Click this link http://localhost:9090/email/eventid=${eventid}`
  };

  return transporter.sendMail(mailOptions);
};

module.exports = emailController;