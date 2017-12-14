const requireSignIn = require('../services/passport').requireSignIn;
const getTokenForUser = require('../services/token');

const signUp = (req, res) => {
  // create a new user and return a valid JWT token to the client
};

const signIn = (req, res) => {
  console.log(requireSignIn + '');
  res.send({ token: getTokenForUser(req.user) });
};

module.exports = (app) => {
  app.post('/signup', signUp);
  app.post('/login', requireSignIn, signIn);
};
