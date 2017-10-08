let emailValidator = require("email-validator");
let owasp = require('owasp-password-strength-test');
let bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

const User = require('../models').User;

module.exports = {
  create(req, res) {
    const result  = owasp.test(req.body.password);
    if (result.errors.length > 0) {
      res.status(400).send(result.errors);
      return;
    }
    if (!emailValidator.validate(req.body.email)) {
      res.status(400).send('invalid email');
      return;
    }

    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      return User
          .create({
            email: req.body.email,
            password: hash,
            userTypeId: req.body.userTypeId
          })
          .then(user => res.status(201).send(user))
          .catch(error => res.status(400).send(error));
    });
  },

  getCurrent(req, res) {
    if (req.user && req.user.id) {
      return User
          .findByPrimary(req.user.id)
          .then(user => {
            if (!user) {
              return res.status(404).send({
                message: 'User Not Found'
              });
            }
            return res.status(200).send(JSON.stringify(user));
          })
          .catch(error => res.status(400).send(error));
    }
  }


};