import React from 'react';
import { Field } from 'redux-form';

const SubstanceUse = () => {
  return (
    <div>
      <div>
        <label htmlFor="drug_screen">Can you pass a drug screen?</label>
        <label><Field name="drug_screen" id="drug_screen" component="input" value="true" type="radio"/> Yes</label>
        <label><Field name="drug_screen" id="drug_screen" component="input" value="false" type="radio"/> No</label>
      </div>
      <div>
        <label htmlFor="med_use">Medications that could be a barrier to employment</label>
        <Field name="med_use" component="input" type="text"/>
      </div>
    </div>
  )
}

export default SubstanceUse
