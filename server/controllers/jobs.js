const Job = require('../models').Job;

module.exports = {
  create(req, res) {
    return Job
        .create({
          job_title: req.body.job_title,
          job_duties: req.body.job_duties
        })
        .then(job => res.status(201).send(job))
        .catch(error => res.status(400).send(error));
  },

  getAll(req, res) {
    return Job
        .all()
        .then(jobs => res.status(200).send(jobs))
        .catch(error => res.status(400).send(error));
  },

  getOne(req, res) {
    return Job
        .findByPrimary(req.params.jobId)
        .then(job => {
          if (!job) {
            return res.status(404).send({
              message: 'Job Not Found'
            });
          }
          return res.status(200).send(job);
        })
        .catch(error => res.status(400).send(error));
  }
};