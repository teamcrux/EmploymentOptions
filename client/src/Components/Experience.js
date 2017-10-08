import React from 'react';
import { Field, FieldArray } from 'redux-form';
import renderTask from './JobTasks'

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div className="section">
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);


const renderExperience = ({ fields, meta: { touched, error } }) => {
  return (
    <ul>
      {fields.map((experience, index) =>
        <li key={index}>
          <h4>Experience #{index + 1}</h4>
          <h6><button
            type="button"
            title="Remove experience"
            onClick={() => fields.remove(index)}>Remove Experience #{index + 1}</button></h6>
          <Field
            name={`${experience}.org_name`}
            type="text"
            component={renderField}
            label="Organization"/>
          <Field
            name={`${experience}.pos_name`}
            type="text"
            component={renderField}
            label="Position"/>
          <Field
            name={`${experience}.loc`}
            type="text"
            component={renderField}
            label="Location"/>
          <Field
            name={`${experience}.description`}
            type="text"
            component={renderField}
            label="Brief description"/>
          <Field
            name={`${experience}.emp_start`}
            type="date"
            component={renderField}
            label="Start date:"/>
          <Field
            name={`${experience}.emp_end`}
            type="date"
            component={renderField}
            label="End date:"/>
          <Field
            name={`${experience}.work_pay`}
            type="text"
            component={renderField}
            label="How much did you get paid?"/>
          <label>Tasks/responsibilities</label>
          <FieldArray
            name={`${experience}.tasks`}
            component={renderTask}
            placeholder="Task/responsibility"/>
          <Field
            name={`${experience}.reason_left`}
            type="text"
            component={renderField}
            label="Reason for leaving"/>

        </li>
      )}
      <li>
        <button className="add-section" type="button" onClick={() => fields.push({})}>+ Add Experience</button>
        {touched && error && <span>{error}</span>}
      </li>
    </ul>
  )
};

export default renderExperience
