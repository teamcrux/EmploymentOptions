import React, { Component } from 'react';
import BodyClassName from 'react-body-classname';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import UserHeader from './UserHeader';
import UserNavBar from './UserNavBar';

class CreateUser extends Component {
  constructor(props){
    super(props);
  };

  render() {
    return (
  <div className="login-page">
    <div>
      <UserHeader />
      <UserNavBar />
      <form className="form-horizontal">
        <div className="form-group">
          <label className="col-sm-2 control-label">Username: </label>
          <div className="col-sm-6">
            <Field
              type="text"
              component="input"
              name="username"
              className="form-control col-sm-10"/>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label">Password: </label>
          <div className="col-sm-6">
            <Field
              type="password"
              component="input"
              name="password"
              className="form-control"/>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label">First Name: </label>
          <div className="col-sm-6">
            <Field
              type="text"
              component="input"
              name="username"
              className="form-control col-sm-10"/>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label">Last Name: </label>
          <div className="col-sm-6">
            <Field
              type="text"
              component="input"
              name="username"
              className="form-control col-sm-10"/>
          </div>
        </div>
        <div className="button-wrapper">
          <button className="btn btn-default" type="submit">Submit
          </button>
        </div>
      </form>
    </div>
  </div>
    )
  }
}

export default reduxForm({form: 'login'})(CreateUser);
