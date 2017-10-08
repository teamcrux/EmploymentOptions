import React from 'react';
import { Field } from 'redux-form';

const Transportation = () => {
  return (
    <div className="section">
      <div>
        <label htmlFor="license">Do you have a drivers license?</label>
        <label><Field name="license" id="license" component="input" value="true" type="radio"/> Yes</label>
        <label><Field name="license" id="license" component="input" value="false" type="radio"/> No</label>
      </div>
      <div>
        <label htmlFor="car_access">Do you have access to a car?</label>
        <label><Field name="car_access" id="car_access" component="input" value="true" type="radio"/> Yes</label>
        <label><Field name="car_access" id="car_access" component="input" value="false" type="radio"/> No</label>
      </div>
      <div>
        <label htmlFor="transport_exp">If not, mode of transport used</label>
        <Field name="transport_exp" component="input" type="text"/>
      </div>
    </div>
  )
}

export default Transportation
