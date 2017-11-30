import React from 'react';
import Lucas_ClientTable from './Lucas_ClientTable'
import UserHeader from './UserHeader'
import UserNavBar from './UserNavBar'

let Lucas_ClientData = (props) => {

  return (
    <div className="clients-page">
      <UserHeader />
      <div className="container flexbox">
        <UserNavBar />
        <Lucas_ClientTable />
      </div>
    </div>
  );
};


export default (Lucas_ClientData);
