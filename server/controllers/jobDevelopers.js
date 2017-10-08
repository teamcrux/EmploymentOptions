let emailValidator = require("email-validator");

const JobDeveloper = require('../models').JobDeveloper;

module.exports = {
  create(req, res) {
    if (!emailValidator.validate(req.body.email)) {
      res.status(400).send('invalid email');
      return;
    }

    return JobDeveloper
        .create({
          first_name: req.body.firstName,
          last_name: req.body.lastName,
          email: req.body.email,
          phone: req.body.phone
        })
        .then(jobDeveloper => res.status(201).send(jobDeveloper))
        .catch(error => res.status(400).send(error));
  },

  getAll(req, res) {
    return JobDeveloper
        .all()
        .then(jobDevelopers => res.status(200).send(jobDevelopers))
        .catch(error => res.status(400).send(error));
  },

  getOne(req, res) {
    return JobDeveloper
        .findByPrimary(req.params.jobDeveloperId)
        .then(jobDeveloper => {
          if (!jobDeveloper) {
            return res.status(404).send({
              message: 'Job Developer Not Found'
            });
          }
          return res.status(200).send(jobDeveloper);
        })
        .catch(error => res.status(400).send(error));
  }
};