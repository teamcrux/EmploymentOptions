import React from 'react';
import { Field, FieldArray } from 'redux-form';
import renderSkills from './KeySkills'

const ResumeInfo = () => {
  return (
    <div>
      <div>
        <label htmlFor="profess_profile">Professional Profile</label>
        <Field name="profess_profile" component="textarea"/>
      </div>
      <div>
        <label htmlFor="interests">Interests</label>
        <Field name="interests" component="textarea"/>
      </div>
      <div>
        <label htmlFor="key_skills">Key Skills</label>
        <FieldArray name="key_skills" component={renderSkills}/>
      </div>
    </div>
  )
}

export default ResumeInfo
