const fs = require('fs');
const pdf = require('../models').pdf;




module.exports = {
  getAll(req, res) {
    return pdf
        .all()
        .then(jobs => res.status(200).send(pdf))
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
