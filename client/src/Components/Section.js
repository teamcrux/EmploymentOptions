import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import selectState from './SelectState';

import Personal from './Personal';
import AlternateContact from './AlternateContact';
import General from './General';
import Education from './Education';
import WorkPrefs from './WorkPrefs';
import renderExperience from './Experience';
import renderRefs from './References';
import FinancialInfo from './FinancialInfo';
import Transportation from './Transportation';
import SubstanceUse from './SubstanceUse';
import PersonalInfo from './PersonalInfo';
import ResumeInfo from './ResumeInfo';

const renderErrField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <div className="err-output">
      <input {...input} placeholder={label} type={type}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const Section = () => {

  var page = 1;
  
  if (page == 1) {
    return (
      <div className="section">
        <h2>Personal Information</h2>
        <Field name="personal" component={Personal}/>
      </div>
    )
  }
  else if (page == 2) {
    return (
      <div className="section">
        <h2>Personal Information</h2>
        <Field name="personal" component={Personal}/>
      </div>
    )
  }
  else if (page == 3) {
    return (
      <div className="section">
        <h2>General</h2>
        <Field name="general" component={General}/>
      </div>
    )
  }
  else if (page == 4) {
    return (
      <div className="section">
        <h2>General</h2>
        <Field name="general" component={General}/>
      </div>
    )
  }
  else if (page == 5) {
    return (
      <div className="section">
        <h2>Education</h2>
        <Field name="education" component={Education}/>
      </div>
    )
  }
  else if (page == 6) {
    return (
      <div className="section">
        <h2>Work Preferences</h2>
        <Field name="workprefs" component={WorkPrefs}/>
      </div>
    )
  }
  else if (page == 7) {
    return (
      <div className="section emp-vol-history">
        <h2>Employment/Volunteer History</h2>
        <label htmlFor="no_work_exp">NO WORK/VOLUNTEER EXPERIENCE</label>
        <Field name="no_work_exp" id="no_work_exp" component="input" type="checkbox"/>
        <FieldArray name="experience" component={renderExperience}/>
      </div>
    )
  }  
  else if (page == 8) {
    return (
      <div className="section">
          <h2>REFERENCES</h2>
          <FieldArray name="reference" component={renderRefs}/>
        </div>
    )
  } 
  else if (page == 9) {
    return (
      <div className="section emp-vol-history">
        <h2>FINANCIAL INFORMATION</h2>
          <Field name="financialinfo" component={FinancialInfo}/>
      </div>
    )
  } 
  else if (page == 10) {
    return (
      <div className="section emp-vol-history">
        <h2>EMPLOYMENT SERVICES</h2>
          <div>
            <label htmlFor="other_agencies">Are you working with any other agency or employment service?</label>
            <label><Field name="other_agencies" id="other_agencies" component="input" type="checkbox"/>Yes</label>
          </div>
      </div>
    )
  } 
  else if (page == 11) {
    return (
      <div>
          <h2>TRANSPORTATION</h2>
          <Field name="transportinfo" component={Transportation}/>
        </div>
    )
  }
  else if (page == 12) {
    return (
      <div>
          <h2>SUBSTANCE/MEDICATION USE</h2>
          <Field name="substanceuse" component={SubstanceUse}/>
        </div>
    )
  }
  else if (page == 13) {
    return (
      <div>
          <h2>PERSONAL INFORMATION</h2>
          <Field name="personalinfo" component={PersonalInfo}/>
        </div>
    )
  }
  else {
    return (
      <div>
          <h2>RESUME INFORMATION</h2>
          <Field name="resumeinfo" component={ResumeInfo}/>
        </div>
    )
  }
}

export default Section
