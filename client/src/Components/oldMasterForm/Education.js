import React from 'react';
import { Field } from 'redux-form';
import selectState from '../SelectState';

const Education = () => {
  return (
    <div className="section">
      <div className="section">
        <h3>School</h3>
        <div>
          <label htmlFor="school_name">School name</label>
          <Field name="school_name" component="input" type="text"/>
        </div>
        <div>
          <label htmlFor="ged">GED?</label>
          <label><Field name="ged" id="ged" component="input" value="true" type="radio"/> Yes</label>
          <label><Field name="ged" id="ged" component="input" value="false" type="radio"/> No</label>
        </div>
        <div>
          <label htmlFor="diploma">Diploma?</label>
          <label><Field name="diploma" id="diploma" component="input" value="true" type="radio"/> Yes</label>
          <label><Field name="diploma" id="diploma" component="input" value="false" type="radio"/> No</label>
        </div>

        <h4>Address</h4>
        <div>
          <label htmlFor="sch_street1">Street Address 1</label>
          <Field name="sch_street1" component="input" type="text"/>
        </div>
        <div>
          <label htmlFor="sch_street2">Street Address 2</label>
          <Field name="sch_street2" component="input" type="text"/>
        </div>
        <div>
          <label htmlFor="sch_city">City</label>
          <Field name="sch_city" component="input" type="text"/>
        </div>
        <div>
            <label htmlFor="sch_state">State</label>
            <Field name="sch_state"  id="sch_state" component={selectState}></Field>
          </div>
          <div>
            <label htmlFor="sch_zip">Zip</label>
            <Field name="sch_zip" component="input" type="text"/>
          </div>
        </div>
      <div className="section">
        <h3>College</h3>
        <div>
          <label htmlFor="col_name">College name</label>
          <Field name="col_name" component="input" type="text"/>
        </div>
        <div>
          <label htmlFor="cert_name">Qualification/Certificate</label>
          <Field name="cert_name" component="input" type="text"/>
        </div>
        <div>
          <h4>Address</h4>
          <div>
            <label htmlFor="col_street1">Street Address 1</label>
            <Field name="col_street1" component="input" type="text"/>
          </div>
          <div>
            <label htmlFor="col_street2">Street Address 2</label>
            <Field name="col_street2" component="input" type="text"/>
          </div>
          <div>
            <label htmlFor="col_city">City</label>
            <Field name="col_city" component="input" type="text"/>
          </div>
          <div>
            <label htmlFor="col_state">State</label>
            <Field name="col_state"  id="col_state" component={selectState}></Field>
          </div>
          <div>
            <label htmlFor="col_zip">Zip</label>
            <Field name="col_zip" component="input" type="text"/>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Vocational/Specialized Training</h3>
        <div>
          <label htmlFor="voc_cert_name">Qualification/Certificate</label>
          <Field name="voc_cert_name" component="input" type="text"/>
        </div>
      </div>
    </div>
  )
};

export default Education
