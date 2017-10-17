import React, { Component } from 'react';
import createResume from './ResumeGenerator';
import UserProfile from './UserProfile';
import { NavLink } from 'react-router-dom';

const moment = require('moment');

class ClientData extends Component {
  constructor(props){
    super(props);
    this.getClients = this.getClients.bind(this);
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
