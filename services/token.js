/* Export a function that generates the JWT token based off of the user.id */
const jwt = require('jwt-simple');
const { secret } = require('../config.js');

module.exports = (user) => {
  return jwt.encode({
    sub: user.id,
    iat: new Date().getTime(),
  }, secret);
};