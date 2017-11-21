//import React, { Component } from 'react';
//const moment = require('moment');
export default function createDownloadableResume (data) {
    console.log("HELLO")
    fetch(`/api/pdf`, {
      headers: {
        'Accept': 'application/pdf',
        'Content-Type': 'application/pdf',
        'Authorization': 'JWT '+localStorage.getItem("token")
      },
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
    });
  }
