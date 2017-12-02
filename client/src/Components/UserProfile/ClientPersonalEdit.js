import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import ClientPersonalForm from './ClientEditForms/ClientPersonalForm';

class ClientPersonalEdit extends React.Component {
  constructor(props){
    super(props);
    this.sendPatch = this.sendPatch.bind(this);
  };

  sendPatch(formData) {
    formData.id = this.props.user.id;
    //console.log("formData", formData);
    fetch("/api/clients", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT '+localStorage.getItem("token")
      },
      method: 'PATCH',
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(responseJson => {
      //console.log("resp",responseJson);
      this.props.makeEdit();
     });
  };

  render () {

    const {handleSubmit, pristine, submitting } = this.props;
    //console.log(this.props.user);
    return (
      <form onSubmit={handleSubmit(this.sendPatch)}>
        <Field name="client-personal-form" component={ClientPersonalForm}/>
        <div className="submit-container">
          <button className="submit-button" type="submit" disabled={pristine || submitting}>Submit</button>
        </div>
      </form>
    )
  }
};

export default reduxForm({form:'ClientPersonalEdit'})(ClientPersonalEdit);
