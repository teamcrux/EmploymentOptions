const TaskData = require('../models').TaskData;

module.exports = {
  getOneAll(req, res) {
    return TaskData
      .findAll({
        where: {
           onetsoc_code: req.params.jobCode
        }   
   })
    .then(jobs => {
      return res.status(200).send(jobs);
    })
    .catch(error => res.status(400).send(error));
  }
}
