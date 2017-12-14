const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre('save', function(next) {
  // this is where we will hash the user's password
  // generate the salt and hash the password using bcrypt
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    // hash password
    bcrypt.hash(this.password, salt, null, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  });
});

UserSchema.methods.checkPassword = function(potentialPassword, cb) {
  // use bcrypt to compare the potentialPassword with the user's password
  console.log('>>>>>>>>>>> hitting me', potentialPassword, this.password);
  bcrypt
    .compare(potentialPassword, this.password, (err, result) => {
      if (err) cb(err);
      cb(null, result);
    });
    // .then(result => {
    //   console.log(result);
    //   cb(null, result)
    // })
    // .catch(err => cb(err));
};

module.exports = UserSchema;
