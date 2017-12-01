import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import renderExperience from './Experience';
import SearchJob from './SearchJob';
import SearchTasks from './SearchTasks'

class JobData extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      onetsoc_code: 0,
      title: undefined,
      description: undefined,
      showTasks: false,
      tasks: [],
    }
    this.addJob = this.addJob.bind(this);
    this.addToSet = this.addToSet.bind(this);
    this.onSub = this.onSub.bind(this);
    this.selectedTasks = new Set();
  };

  addJob(formData){
    formData.id = this.props.user.id;
    formData.pos_name = this.state.title;
    formData.description = this.state.description;
    var setItr = this.selectedTasks.entries();
    formData.tasks = [];
    for (var i = 0; i < this.selectedTasks.size; i++) {
      formData.tasks.push(setItr.next().value[0]);
    }
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

  onSub(manualEntry){
    console.log("adding manually", manualEntry);
    var formData = manualEntry[0];
    formData.id = this.props.user.id;
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

  setCode = (item) => {
    console.log("inside set code:", item);
    this.setState({
      onetsoc_code:item.onetsoc_code,
      title:item.title,
      description:item.description,
      showTasks: true,
    });
  }

  addToSet = (event) => {
    if(this.selectedTasks.has(event.target.value)) {
      this.selectedTasks.delete(event.target.value);
    }
    else {
      this.selectedTasks.add(event.target.value);
    }
  };

  render () {
    let employmentdetail = this.props.user.EmploymentDetails;
    const {handleSubmit, pristine, submitting } = this.props;
    const JobList = null;
    /*
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
    */

    const taskInputs = this.state.tasks.map(task => (
      <label>
        Task:
        <input type="text" placeholder="task" defaultValue={task} name="task"/>
      </label>
    ));

    const workInputs = (
      <div>
        <label>
          Position:
          <input type="text" placeholder="Position" name="pos_name" value={this.state.title}/>
        </label>
        <label>
          Organization:
          <input type="text" placeholder="Organization" name="org_name"/>
        </label>
        <label>
          Description:
          <input type="text" placeholder="Description" name="description" value={this.state.description}/>
        </label>
        <label>
          Location:
          <input type="text" placeholder="Location" name="loc"/>
        </label>
        <label>
          Pay:
          <input type="text" placeholder="Pay" name="work_pay"/>
        </label>
        <label>
          Reason Left:
          <input type="text" placeholder="Reason Left" name="reason_left"/>
        </label>
        <label>
          Start Date:
          <input type="text" placeholder="Start" name="emp_start"/>
        </label>
        <label>
          End Date:
          <input type="text" placeholder="End" name="emp_end"/>
        </label>
        {taskInputs}
      </div>

    );

    const position = () => {
      return (
      <label>
        Position:
        <input type="text" placeholder="Position" name="pos_name" value={this.state.title}/>
      </label>
    )}


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
        <h2>Add Job by Search </h2>
        <div>
          <SearchJob fetchTasks={this.setCode}/>
          {this.state.showTasks && <SearchTasks addTasks={this.addToSet} jobCode={this.state.onetsoc_code}/> }
        </div>
        <div>
          <form onSubmit={handleSubmit(this.addJob)}>
            <label>
              Organization:
              <Field name="org_name" component="input" type="text" placeholder="Organization"/>
            </label>
            <label>
              Location:
              <Field name="loc" component="input" type="text" placeholder="Location"/>
            </label>
            <label>
              Pay:
              <Field name="work_pay" component="input" type="text" placeholder="Pay"/>
            </label>
            <label>
              Start Date:
              <Field name="emp_start" component="input" type="date" placeholder="Start"/>
            </label>
            <label>
              End Date:
              <Field name="emp_end" component="input" type="date" placeholder="End"/>
            </label>
            <div>
              <button className="submit-button" type="submit" disabled={pristine || submitting}>Submit</button>
            </div>
          </form>
        </div>
        <div>
          <h2> Add Job Manually </h2>
          <form onSubmit={handleSubmit(this.onSub)}>
            <FieldArray name="experience" component={renderExperience}/>
            <button className="submit-button" type="submit" disabled={pristine || submitting}>Submit</button>
          </form>
        </div>
      </div>
    );
  }
};

export default reduxForm({
  form:'JobData',
 })(JobData);
