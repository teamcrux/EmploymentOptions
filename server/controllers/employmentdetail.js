const EmploymentDetail = require('../models').EmploymentDetail;

module.exports = {
  create(req,res) {
    let formData = req.body.experience[0];
    let client_id = req.body.id;
    let tasksJSON = JSON.stringify(formData.tasks);

    return EmploymentDetail
    //add job to db
      .create({
        organization: formData.org_name,
        description: formData.description,
        job_title: formData.pos_name,
        location: formData.loc,
        job_duties: tasksJSON,
        pay: formData.work_pay,
        leaving_reason: formData.reason_left,
        start: formData.emp_start,
        end: formData.emp_end,
        ClientId: client_id
      })
      .then(newJob => res.status(200).send(JSON.stringify(newJob)));
  }
};
