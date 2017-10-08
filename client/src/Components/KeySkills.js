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

const renderSkills = ({ fields, meta: { touched, error } }) => {
  return (
    <ul>
      {fields.map((keySkill, index) =>
        <li key={index}>
          <button
            type="button"
            title="Remove skill"
            onClick={() => fields.remove(index)}>Remove Skill</button>
          <div>
            <Field
              name={`${keySkill}.key_skill`}
              type="text"
              label={`Skill ${index + 1}`}
              component={renderField}/>
          </div>
        </li>
      )}
      <li>
        <button type="button" onClick={() => fields.push({})}>+ Add Skill</button>
        {touched && error && <span>{error}</span>}
      </li>
    </ul>
  )
}

export default renderSkills
