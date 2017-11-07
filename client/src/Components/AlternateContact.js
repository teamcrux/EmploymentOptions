import React from 'react';
import { Field } from 'redux-form';
import selectState from './SelectState';

const renderErrField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <div className="err-output">
      <input {...input} placeholder={label} type={type}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const AlternateContact = () => {
  return (
    <div className="section">
      <div>
        <label htmlFor="alt_fname">First name</label>
        <Field name="alt_fname" component="input" type="text"/>
      </div>
      <div>
        <label htmlFor="alt_lname">Last name</label>
        <Field name="alt_lname" component="input" type="text"/>
      </div>
      <div>
        <label htmlFor="alt_rlnship">Relationship</label>
        <Field name="alt_rlnship" component="input" type="text"/>
      </div>
      <div>
        <label htmlFor="alt_phone">Phone</label>
        <Field name="alt_phone" component="input" type="text"/>
      </div>
      <div>
        <label htmlFor="alt_street1">Street Address 1</label>
        <Field name="alt_street1" component="input" type="text"/>
      </div>
      <div>
        <label htmlFor="alt_street2">Street Address 2</label>
        <Field name="alt_street2" component="input" type="text"/>
      </div>
      <div>
        <label htmlFor="alt_po_box">PO Box</label>
        <Field name="alt_po_box" component="input" type="text"/>
      </div>
      <div>
        <label htmlFor="alt_apt_num">Apartment Number</label>
        <Field name="alt_apt_num" component="input" type="text"/>
      </div>
      <div>
        <label htmlFor="alt_city">City</label>
        <Field name="alt_city" component="input" type="text"/>
      </div>
      <div>
        <label htmlFor="alt_state">State</label>
        <Field name="alt_state" id="alt_state" component={selectState}></Field>
      </div>
      <div>
        <label htmlFor="alt_zip">Zip</label>
        <Field name="alt_zip" component="input" type="text"/>
      </div>
    </div>
  )
}

export default AlternateContact
