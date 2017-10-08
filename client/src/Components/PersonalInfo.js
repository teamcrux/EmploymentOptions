import React from 'react';
import { Field } from 'redux-form';

const PersonalInfo = () => {
  return (
    <div className="section">
      <div>
        <label htmlFor="resume">Do you have a resume?</label>
        <label><Field name="resume" id="resume" component="input" value="true" type="radio"/> Yes</label>
        <label><Field name="resume" id="resume" component="input" value="false" type="radio"/> No</label>
      </div>
      <div>
        <label htmlFor="comp_access">Do you have access to a computer?</label>
        <label><Field name="comp_access" id="comp_access" component="input" value="true" type="radio"/> Yes</label>
        <label><Field name="comp_access" id="comp_access" component="input" value="false" type="radio"/> No</label>
      </div>
      <div>
        <label htmlFor="online_app">Are you able to complete your own online application?</label>
        <label><Field name="online_app" id="online_app" component="input" value="true" type="radio"/> Yes</label>
        <label><Field name="online_app" id="online_app" component="input" value="false" type="radio"/> No</label>
      </div>
      <div>
        <label htmlFor="paper_app">Are you able to complete your own paper application?</label>
        <label><Field name="paper_app" id="paper_app" component="input" value="true" type="radio"/> Yes</label>
        <label><Field name="paper_app" id="paper_app" component="input" value="false" type="radio"/> No</label>
      </div>
      <div>
        <label htmlFor="emp_goal">Employment goal</label>
        <Field name="emp_goal" component="input" type="text"/>
      </div>
      <div>
        <label htmlFor="venue">Meeting venue</label>
        <Field name="venue" component="input" type="text"/>
      </div>
      <div>
        <label htmlFor="barriers">Conditions that present possible barriers to employment</label>
        <Field name="barriers" component="input" type="text"/>
      </div>
      <div>
        <label htmlFor="notes">Notes</label>
        <Field name="notes" component="textarea"/>
      </div>
      <div>
        <label htmlFor="photo">Photo: &nbsp;</label>
        <Field name="photo" component="input" type="file"/>
      </div>
    </div>
  )
}

export default PersonalInfo
