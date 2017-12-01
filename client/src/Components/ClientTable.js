import React, { Component } from 'react';
import createResume from './ResumeGenerator';
import UserProfile from './UserProfile';
import { NavLink } from 'react-router-dom';
const moment = require('moment');
const FileSaver = require('file-saver');

class ClientData extends Component {
  constructor(props){
    super(props);
    this.getClients = this.getClients.bind(this);
    this.downResume = this.downResume.bind(this);
    this.downForm = this.downForm.bind(this);
    this.state = {
      clientData: [],
    }
  }

  getClients = () =>{
    fetch("/api/clients", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT '+localStorage.getItem("token")
      },
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        clientData: responseJson,
        fetchDone: true,
      });
    });
  };

  downResume = (id, firstName, lastName) =>{
    fetch(`/api/pdf/${id}`, {
      headers: {
        'Accept': 'application/pdf',
        'Content-Type': 'application/pdf',
        'Authorization': 'JWT '+localStorage.getItem("token")
      },
      method: 'GET'
    })
    .then((response) => {
      if (response.status === 400) {
        alert("ERROR ON DOWNLOAD")
        return "ERROR"
      }
      return response.blob()
    })
    .then((responseBlob) => {
      if(responseBlob === "ERROR"){
        return
      }
      FileSaver.saveAs(responseBlob, firstName + "_" + lastName + "_Resume");
    });
  };

  downForm = (id, firstName, lastName) =>{
    fetch(`api/pdf/form/${id}`, {
      headers: {
        'Accept': 'application/pdf',
        'Content-Type': 'application/pdf',
        'Authorization': 'JWT '+localStorage.getItem("token")
      },
      method: 'GET',
    })
    .then((response) => {
      if (response.status === 400) {
        alert("ERROR ON DOWNLOAD")
        return "ERROR"
      }
      //console.log(JSON.stringify(response))
      return response.blob()
    })
    .then((responseBlob) => {
      //console.log(response.body)
      if(responseBlob === "ERROR"){
        return
      }
       FileSaver.saveAs(responseBlob, lastName + "_de1277");
    });
  };

  componentDidMount(){
    this.getClients();
  }

  render() {

    console.log("inside render", this.state.clientData);
    const persons = this.state.clientData.map(item => (
      <tr>
        <td> {moment(item.registration_date).format('MM/DD/YY')} </td>
        <td> {item.first_name} </td>
        <td> {item.last_name} </td>
        <td> {item.dob} </td>
        <td>
          <NavLink id="toUser"
              to={`/user/${item.id}`}
              activeClassName="selected"
              >View</NavLink>
        </td>
        <td><button onClick={()=>this.downResume(item.id, item.first_name, item.last_name)}> Download Resume </button></td>
        <td><button onClick={()=>this.downForm(item.id, item.first_name, item.last_name)}> Download Form </button></td>
      </tr>
    ))

    return (
      <div className="clients-table">
        <table>
          <thead>
            <tr>
              <th>Reg. Date</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>DOB</th>
              <th>View</th>
              <th>Download PDF</th>
              <th>Download Form</th>
            </tr>
          </thead>
          <tbody id="client-table-body">
            {persons}
          </tbody>
        </table>
      </div>
    )
  }
}

export default (ClientData);
