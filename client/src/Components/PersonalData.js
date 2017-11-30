import React from 'react';

const personalData = (props) => {
  const AltContacts = props.user.AlternateContacts.map(item => (
      <div>
        <h3> Alternate Contacts </h3>
        <p> First Name: </p>
        <p> Last Name: </p>
        <p> Relationship: </p>
      </div>
    ));

  return (
    <div>
      <div>
        <h3> Personal </h3>
        <p> First Name: {props.user.first_name} </p>
        <p> Last Name: {props.user.last_name} </p>
        <p> Date of Birth: {props.user.dob} </p>
        <p> Race: {props.user.race} </p>
        <p> Gender: {props.user.gender} </p>
        <p> Phone: {props.user.phone} </p>
        <p> Email: {props.user.email} </p>
        <p> SSN: {props.user.ssn} </p>
        <p> ODL: {props.user.odl} </p>
      </div>
      <div>
        <h3> Address </h3>
        <p> Street: {/*props.user.Address.street_address_one*/} </p>
        <p> Apt #: {/*props.user.Address.apt_num*/} </p>
        <p> City: {/*props.user.Address.city*/} </p>
        <p> State: {/*props.user.Address.state*/} </p>
      </div>
      {AltContacts}
    </div>

  );
}

export default (personalData);
