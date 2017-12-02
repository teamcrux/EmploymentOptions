import React from 'react';
import { Field } from 'redux-form';
import selectState from '../SelectState';

const renderErrField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <div className="err-output">
      <input {...input} placeholder={label} type={type}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const Personal = () => {
  return (
    <div className="section">
      <div>
        <label htmlFor="fname">First name *</label>
        <Field name="fname" component={renderErrField} type="text"/>
      </div>
      <div>
        <label htmlFor="lname">Last name *</label>
        <Field name="lname" component={renderErrField} type="text"/>
      </div>
      <div>
        <label htmlFor="dob">DOB</label>
        <Field name="dob" component="input" type="date"/>
      </div>
      <div>
        <label htmlFor="race">Race</label>
        <Field name="race" component="input" type="text"/>
      </div>
      <div>
        <label htmlFor="gender">Gender</label>
        <Field name="gender" component="input" type="text"/>
      </div>
      <div>
        <label htmlFor="phone">Phone</label>
        <Field name="phone" component="input" type="text"/>
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <Field name="email" component="input" type="email"/>
      </div>
      <div>
        <label htmlFor="ssn">SSN</label>
        <Field name="ssn" component="input" type="text"/>
      </div>
      <div>
        <label htmlFor="odl">ODL</label>
        <Field name="odl" component="input" type="text"/>
      </div>
      <div>
        <label htmlFor="foodhc">Food H/C?</label>
        <label><Field name="foodhc" id="foodhc" component="input" type="radio" value="true"/> Yes</label>
        <label><Field name="foodhc" id="foodhc" component="input" type="radio" value="false"/> No</label>
      </div>

      <div>
        <h4>Address</h4>
        <div>
          <label htmlFor="street1">Street Address 1</label>
          <Field name="street1" component="input" type="text"/>
        </div>
        <div>
          <label htmlFor="street2">Street Address 2</label>
          <Field name="street2" component="input" type="text"/>
        </div>
        <div>
          <label htmlFor="po_box">PO Box</label>
          <Field name="po_box" component="input" type="text"/>
        </div>
        <div>
          <label htmlFor="apt_num">Apartment Number</label>
          <Field name="apt_num" component="input" type="text"/>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <Field name="city" component="input" type="text"/>
        </div>
        <div>
          <label htmlFor="cli_state">State</label>
          <Field name="cli_state" id="cli_state" component={selectState}/>
        </div>
        <div>
          <label htmlFor="zip">Zip</label>
          <Field name="zip" component="input" type="text"/>
        </div>
      </div>

      <div>
        <h3>Alternate Contact</h3>
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

    </div>
  )
}

export default Personal
