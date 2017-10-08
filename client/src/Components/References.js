import React from 'react';
import { Field } from 'redux-form';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const renderRefs = ({ fields, meta: { touched, error } }) => {
  return (
    <ul>
      {fields.map((reference, index) =>
        <li key={index}>
          <h4>Reference #{index + 1}</h4>
          <button
            type="button"
            title="Remove reference"
            onClick={() => fields.remove(index)}>Remove Reference #{index + 1}</button>
            <div className="personal-or-business">
    					<Field
    							name={`${reference}.ref_type`}
    							type="radio"
    							component={renderField}
    							label="Personal"
    							value="personal" />
    					<Field
    							name={`${reference}.ref_type`}
    							type="radio"
    							component={renderField}
    							label="Business"
    							value="business" />
  				</div>
          <Field
            name={`${reference}.ref_fname`}
            type="text"
            component={renderField}
            label="First name"/>
          <Field
            name={`${reference}.ref_lname`}
            type="text"
            component={renderField}
            label="Last name"/>
          <Field
            name={`${reference}.ref_phone`}
            type="text"
            component={renderField}
            label="Phone"/>
          <Field
            name={`${reference}.ref_known`}
            type="text"
            component={renderField}
            label="Years known"/>
          <Field
            name={`${reference}.ref_notes`}
            type="text"
            component={renderField}
            label="Notes"/>

        </li>
      )}
      <li>
        <button className="add-section" type="button" onClick={() => fields.push({})}>+ Add Reference</button>
        {touched && error && <span>{error}</span>}
      </li>
    </ul>
  )
}

export default renderRefs
