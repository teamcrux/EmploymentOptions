import React from 'react';
import { Field } from 'redux-form';

const WorkPrefs = () => {
  return (
    <div className="section">
      <div>
        <label htmlFor="fulltime">Full time</label>
        <Field name="fulltime" id="fulltime" component="input" type="checkbox"/>
        <label htmlFor="parttime">Part time</label>
        <Field name="parttime" id="parttime" component="input" type="checkbox"/>
      </div>
      <div>
        <label htmlFor="num_hours"> How many hours?</label>
        <Field name="num_hours" component="input" type="text"/>
      </div>
      <div>
        <label htmlFor="expected_wage">Expected wage</label>
        <Field name="expected_wage" component="input" type="text"/>
      </div>
      <div className="days">
        <label>What days of the week? &nbsp;</label>
        <label htmlFor="monday"> M</label>
        <Field name="monday" id="monday" component="input" type="checkbox"/>
        <label htmlFor="tuesday"> T</label>
        <Field name="tuesday" id="tuesday" component="input" type="checkbox"/>
        <label htmlFor="wednesday"> W</label>
        <Field name="wednesday" id="wednesday" component="input" type="checkbox"/>
        <label htmlFor="thursday"> Th</label>
        <Field name="thursday" id="thursday" component="input" type="checkbox"/>
        <label htmlFor="friday"> F</label>
        <Field name="friday" id="friday" component="input" type="checkbox"/>
        <label htmlFor="saturday"> S</label>
        <Field name="saturday" id="saturday" component="input" type="checkbox"/>
        <label htmlFor="sunday"> Su</label>
        <Field name="sunday" id="sunday" component="input" type="checkbox"/>
      </div>
      <div className="hours">
        <label>What hours?&nbsp;&nbsp;</label>
        <label htmlFor="hours_days">&nbsp;Days </label>
        <Field name="hours_days" id="hours_days" component="input" type="checkbox"/>
        <label htmlFor="hours_swing">&nbsp;Swing </label>
        <Field name="hours_swing" id="hours_swing" component="input" type="checkbox"/>
        <label htmlFor="hours_noc">&nbsp;NOC</label>
        <Field name="hours_noc" id="hours_noc" component="input" type="checkbox"/>
      </div>
      <div className="inside-outside">
       <label>Where would you prefer to work?&nbsp;</label>
        <label htmlFor="inside">&nbsp;Inside</label>
        <Field name="inside" id="inside" component="input" type="checkbox"/>
        <label htmlFor="outside">&nbsp;Outside</label>
        <Field name="outside" id="outside" component="input" type="checkbox"/>
      </div>
      <div>
        <label htmlFor="geo_pref">Preferred geographical area</label>
        <Field name="geo_pref" component="input" type="text"/>
      </div>
    </div>
  )
}

export default WorkPrefs
