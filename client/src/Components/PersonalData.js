import React from 'react';

const personalData = (props) => {
  const AltContacts = null;
  /*
  const AltContacts = props.user.AlternateContacts.map(item => (
      <div>
        <h3> Alternate Contacts </h3>
        <p> First Name: </p>
        <p> Last Name: </p>
        <p> Relationship: </p>
      </div>
    ));
  */

  const Addresses = null;
  /*
  const Addresses = props.user.Address.map(item => (
      <div>
        <h3> Address </h3>
        <p> Street: {props.user.Address.street_address_one} </p>
        <p> Apt #: {props.user.Address.apt_num} </p>
        <p> City: {props.user.Address.city} </p>
        <p> State: {props.user.Address.state} </p>
      </div>
    ));
  */

  
  /***********************
   * Sections:
   *   Personal Info
   *   Income
   *   Insurance
   *   Employment
   *   Disability Info
   *   Special Programs
   *   Aditional Info
   *   Education
   *   Medical Info
   ***********************/

  return (
    <div>

    <div>

      {Addresses}
      {AltContacts}
    </div>
  </div>

  );
}

export default (personalData);
