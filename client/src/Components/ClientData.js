import React from 'react';
import ClientTable from './ClientTable'
import UserHeader from './UserHeader'
import UserNavBar from './UserNavBar'

let ClientData = (props) => {

  return (
    <div className="clients-page">
      <UserHeader />
      <div className="container flexbox">
        <UserNavBar />
        <ClientTable />
      </div>
    </div>
  );
};


export default (ClientData);
