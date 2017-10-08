import React from 'react';
import { Field } from 'redux-form';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <div>
      <input {...input} type={type} placeholder={label}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const renderTask = ({ fields, meta: { touched, error } }) => {
  return (
    <ul>
      {fields.map((task, index) =>
        <li key={index}>
          <button
            type="button"
            title="Remove skill"
            onClick={() => fields.remove(index)}>Remove Task</button>
          <Field
            name={`${task}.tasks`}
            type="text"
            label={`Task ${index + 1}`}
            component={renderField}/>
        </li>
      )}
      <li>
        <button type="button" onClick={() => fields.push({})}>+ Add Task</button>
      </li>
    </ul>
  )
}

export default renderTask
