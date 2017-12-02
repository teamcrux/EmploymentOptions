import React from 'react';
import { Field } from 'redux-form';

const renderErrField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <div className="err-output">
      <input {...input} placeholder={label} type={type}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const ClientInsuranceForm = () => {
  return (
    <div className="section">
      {/*
      <div>
        <label htmlFor="fname">First name *</label>
        <Field name="fname" component={renderErrField} type="text"/>
      </div>
      <div>
        <label htmlFor="lname">Last name *</label>
        <Field name="lname" component={renderErrField} type="text"/>
      </div>
      */}
    </div>
  )
}

export default ClientInsuranceForm
