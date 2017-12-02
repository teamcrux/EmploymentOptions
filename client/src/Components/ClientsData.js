import React from 'react';
import ClientsTable from './ClientsTable'
import UserHeader from './UserHeader'
import UserNavBar from './UserNavBar'

let ClientsData = (props) => {

  return (
    <div className="clients-page">
      <UserHeader />
      <div className="container flexbox">
        <UserNavBar />
        <ClientsTable />
      </div>
    </div>
  );
};


export default (ClientsData);
