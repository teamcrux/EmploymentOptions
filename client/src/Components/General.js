import React from 'react';
import { Field } from 'redux-form';

const General = () => {
  return (
    <div className="section">
      <div>
         <label htmlFor="date_avail">Date available for employment</label>
         <Field name="date_avail" component="input" type="date"/>
      </div>
      <div>
        <label htmlFor="military">Have you served in the U.S. military?</label>
        <label><Field name="military" id="military" component="input" value="true" type="radio"/> Yes</label>
        <label><Field name="military" id="military" component="input" value="false" type="radio"/> No</label>
      </div>
      <div>
        <label htmlFor="misdemeanor">Have you ever been convicted of a misdemeanor?</label>
        <label><Field name="misdemeanor" id="misdemeanor" component="input" value="true" type="radio"/> Yes</label>
        <label><Field name="misdemeanor" id="misdemeanor" component="input" value="false" type="radio"/> No</label>
      </div>
      <div>
        <label htmlFor="misdemeanor_exp">If yes, explain</label>
        <Field name="misdemeanor_exp" component="input" type="text"/>
      </div>
      <div>
        <label htmlFor="felony">Have you ever been convicted of a felony?</label>
        <label><Field name="felony" id="felony" component="input" value="true" type="radio"/> Yes</label>
        <label><Field name="felony" id="felony" component="input" value="false" type="radio"/> No</label>
      </div>
      <div>
        <label htmlFor="felony_exp">If yes, explain</label>
        <Field name="felony_exp" component="input" type="text"/>
      </div>
    </div>
  )
}

export default General
