const _ = require('lodash'),
      jwt = require('jsonwebtoken');

require('dotenv').config();    
const tokenController = {};

tokenController.createToken = (user, emailid) => {
  user = _.omit(user, 'password');
  user.admin = false;
  user.emailid = emailid;
  return jwt.sign(user, process.env.JWT_KEY, { expiresIn: 60 * 60 * 5 });
};

module.exports = tokenController;