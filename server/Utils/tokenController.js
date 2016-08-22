const _ = require('lodash'),
      jwt = require('jsonwebtoken');
const tokenController = {};
const jwtKey = process.env.JWT_KEY;

if (jwtKey === undefined) {
  require('dotenv').config();    

  tokenController.createToken = (user, emailid) => {
    user = _.omit(user, 'password');
    user.admin = false;
    user.emailid = emailid;
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 5 });
  };
} else {
  tokenController.createToken = (user, emailid) => {
    user = _.omit(user, 'password');
    user.admin = false;
    user.emailid = emailid;
    return jwt.sign(user, jwtKey, { expiresIn: 60 * 60 * 5 });
  };
}

module.exports = tokenController;