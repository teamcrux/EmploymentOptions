import React from 'react';

const Lucas_PersonalData = (props) => {
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
      <h2>Client: {props.user.first_name} {props.user.last_name}</h2>
      <div>
        <h3>Personal Information</h3>
        
      </div>
      <div>
        <h3>Income</h3>
        
      </div>
      <div>
        <h3>Insurance Information</h3>
        
      </div>
      <div>
        <h3>Employment Information</h3>
        
      </div>
      <div>
        <h3>Disability Information</h3>
        
      </div>
      <div>
        <h3>Special Programs</h3>
        
      </div>
      <div>
        <h3>Additional Information</h3>
        
      </div>
      <div>
        <h3>Education Information</h3>
        
      </div>
      <div>
        <h3>Medical Information:</h3>
        
      </div>

      {/*
      <p> Date of Birth: {props.user.dob} </p>
      <p> Race: {props.user.race} </p>
      <p> Gender: {props.user.gender} </p>
      <p> Phone: {props.user.phone} </p>
      <p> Email: {props.user.email} </p>
      <p> SSN: {props.user.ssn} </p>
      <p> ODL: {props.user.odl} </p>
      */}

      {/*
      <div>
        <h3> Address </h3>
        <p> Street: {props.user.Address.street_address_one} </p>
        <p> Apt #: {props.user.Address.apt_num} </p>
        <p> City: {props.user.Address.city} </p>
        <p> State: {props.user.Address.state} </p>
      </div>
      {AltContacts}
      */}
    </div>

  );
}

export default (Lucas_PersonalData);
