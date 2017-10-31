import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import renderExperience from './Experience';

class JobData extends React.Component {
  constructor(props){
    super(props);
    this.addJob = this.addJob.bind(this);
  };

  addJob(formData){
    formData.id = this.props.user.id;
    console.log("formData", formData);
    fetch("/api/employmentdetail", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT '+localStorage.getItem("token")
      },
      method: 'POST',
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(responseJson => {
      console.log("resp",responseJson);
      this.props.makeEdit();
     });
  };

  render () {
    let employmentdetail = this.props.user.EmploymentDetails;
    const {handleSubmit, pristine, submitting } = this.props;
    const JobList = employmentdetail.map(item => (
      <tr>
        <td> {item.organization} </td>
        <td> {item.job_title} </td>
        <td> {item.description} </td>
        <td> {item.location} </td>
        <td> {item.job_duties} </td>
        <td> {item.pay} </td>
        <td> {item.leaving_reason} </td>
        <td> {item.start} </td>
        <td> {item.end} </td>

      </tr>
    ));

    return (
      <div>
        <div>
          <h3> Work Experience </h3>
          <div className="clients-table">
            <table>
              <thead>
                <tr>
                  <td> Organization </td>
                  <td> Job Title </td>
                  <td> Description </td>
                  <td> Location </td>
                  <td> Job Duties </td>
                  <td> Pay </td>
                  <td> Leaving Reason </td>
                  <td> Start Date </td>
                  <td> End Date </td>
                </tr>
              </thead>
              <tbody id="client-table-body">
                {JobList}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit(this.addJob)}>
            <FieldArray name="experience" component={renderExperience}/>
            {<button className="submit-button" type="submit" disabled={pristine || submitting}>Submit</button>}
        </form>
        </div>
      </div>
    );
  }
};

export default reduxForm({ form:'JobData' })(JobData);
