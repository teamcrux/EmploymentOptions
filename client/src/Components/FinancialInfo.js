import React from 'react';
import { Field } from 'redux-form';

const FinancialInfo = () => {
  return (
    <div className="section">
      <div>
        <label htmlFor="consulted">Have you consulted a benefits professional?</label>
        <label><Field name="consulted" id="consulted" component="input" type="checkbox"/> Yes</label>
      </div>
      <div>
        <label htmlFor="fin_exp">Are you aware if/how this will help with your employment search? Explain</label>
        <Field name="fin_exp" component="input" type="text"/>
      </div>
    </div>
  )
}

export default FinancialInfo
