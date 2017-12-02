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

const ClientPersonalForm = () => {
  return (
    <div className="section">
      <div>
        <label htmlFor="first_name">First name: *</label>
        <Field name="first_name" component={renderErrField} type="text"/>
      </div>
      <div>
        <label htmlFor="last_name">Last name: *</label>
        <Field name="last_name" component={renderErrField} type="text"/>
      </div>
      <div>
        <label htmlFor="middle_name">Middle name:</label>
        <Field name="middle_name" component={renderErrField} type="text"/>
      </div>
      <div>
        <label htmlFor="preferred_name">Preferred Name:</label>
        <Field name="preferred_name" component={renderErrField} type="text"/>
      </div>
      <div>
        <label htmlFor="previous_last_name">Previous Last Name:</label>
        <Field name="previous_last_name" component={renderErrField} type="text"/>
      </div>
      <div>
        <label htmlFor="dob">Birthdate:</label>
        <Field name="dob" component={renderErrField} type="text"/>
      </div>
      <div>
        <label htmlFor="email">Email address:</label>
        <Field name="email" component={renderErrField} type="text"/>
      </div>
      <div>
        <label htmlFor="gender">Gender:</label>
        <Field name="gender" component={renderErrField} type="text"/>
      </div>
      <div>
        <label htmlFor="ssn">Social Security Number:</label>
        <Field name="ssn" component={renderErrField} type="text"/>
      </div>
      <div>
        <label htmlFor="phone">Phone Number:</label>
        <Field name="phone" component={renderErrField} type="text"/>
      </div>
      <div>
        <label htmlFor="phone_type">Phone Type:</label>
        <Field name="phone_type" component={renderErrField} type="text"/>
      </div>
      <div>
        <label htmlFor="phone2_number">Second Phone Number:</label>
        <Field name="phone2_number" component={renderErrField} type="text"/>
      </div>
      <div>
        <label htmlFor="phone2_type">Second Phone Type:</label>
        <Field name="phone2_type" component={renderErrField} type="text"/>
      </div>
      <div>
        <label htmlFor="race">Race:</label>
        <Field name="race" component={renderErrField} type="text"/>
      </div>
      <div>
        <label htmlFor="race_other_explain">race_other_explain</label>
        <Field name="race_other_explain" component={renderErrField} type="text"/>
      </div>
      <div>
        <label htmlFor="primary_language">Primary Language:</label>
        <Field name="primary_language" component={renderErrField} type="text"/>
      </div>
      <div>
        <label htmlFor="language_counselor_notes">(Counselor Notes: )</label>
        <Field name="language_counselor_notes" component={renderErrField} type="text"/>
      </div>
      <div>
        <label htmlFor="prior_client">Have you been a prior client of Vocational Rehabilitation?</label>
        <Field name="prior_client" component={renderErrField} type="text"/>
      </div>
      <div>
        <label htmlFor="prior_client_explain">If yes, when and where?</label>
        <Field name="prior_client_explain" component={renderErrField} type="text"/>
      </div>
      <div>
        <label htmlFor="us_citizen">Are you a US Citizen?</label>
        <Field name="us_citizen" component={renderErrField} type="text"/>
      </div>
      <div>
        <label htmlFor="work_permit">work_permit</label>
        <Field name="work_permit" component={renderErrField} type="text"/>
      </div>
      <div>
        <label htmlFor="contacts_counselor_notes">contacts_counselor_notes</label>
        <Field name="contacts_counselor_notes" component={renderErrField} type="text"/>
      </div>
      <div>
        <label htmlFor="living_situation">living_situation</label>
        <Field name="living_situation" component={renderErrField} type="text"/>
      </div>
      <div>
        <label htmlFor="marital_status">marital_status</label>
        <Field name="marital_status" component={renderErrField} type="text"/>
      </div>
      <div>
        <label htmlFor="living_with_you_self_only">living_with_you_self_only</label>
        <Field name="living_with_you_self_only" component={renderErrField} type="text"/>
      </div>
      <div>
        <label htmlFor="living_with_you_partner_children">living_with_you_partner_children</label>
        <Field name="living_with_you_partner_children" component={renderErrField} type="text"/>
      </div>
      <div>
        <label htmlFor="living_with_you_parents">living_with_you_parents</label>
        <Field name="living_with_you_parents" component={renderErrField} type="text"/>
      </div>
      <div>
        <label htmlFor="living_with_you_other">living_with_you_other</label>
        <Field name="living_with_you_other" component={renderErrField} type="text"/>
      </div>
      <div>
        <label htmlFor="living_with_you_other_explain">living_with_you_other_explain</label>
        <Field name="living_with_you_other_explain" component={renderErrField} type="text"/>
      </div>
      <div>
        <label htmlFor="who_reffered_you">who_reffered_you</label>
        <Field name="who_reffered_you" component={renderErrField} type="text"/>
      </div>
    </div>
  )
}

export default ClientPersonalForm
