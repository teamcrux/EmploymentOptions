import React, { Component } from 'react';
import createResume from './ResumeGenerator';
import Lucas_UserProfile from './Lucas_UserProfile';
import { NavLink } from 'react-router-dom';
const moment = require('moment');
const FileSaver = require('file-saver');

class Lucas_ClientData extends Component {
  constructor(props){
    super(props);
    this.getClients = this.getClients.bind(this);
    this.downResume = this.downResume.bind(this);
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

  getClientsSorted_LastName = () =>{
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

  getClientsSorted_LastNameReverse = () =>{
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

  getClientsSorted_FirstName = () =>{
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

  getClientsSorted_FirstNameReverse = () =>{
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

  getClientsSorted_Date = () =>{
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

  getClientsSorted_DateReverse = () =>{
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

  downResume = (id, first_name, last_name) =>{
    fetch(`/api/pdf/${id}`, {
      headers: {
        'Accept': 'application/pdf',
        'Content-Type': 'application/pdf',
        'Authorization': 'JWT '+localStorage.getItem("token")
      },
      method: 'GET'
    })
    .then((response) => response.blob())
    .then((responseBlob) => {
       FileSaver.saveAs(responseBlob, 'Resume_' + first_name + last_name + '.pdf');
    });
  };

  componentDidMount(){
    this.getClients();
  }

  render() {

    const persons = this.state.clientData.map(item => (
      <tr>
        <td> {item.last_name} </td>
        <td> {item.first_name} </td>
        <td><NavLink id="toUser" to={`/lucas/user/${item.id}`} activeClassName="selected"><button>View Profile</button></NavLink></td>
        <td><button onClick={()=>this.downResume(item.id, item.first_name, item.last_name)}> Download Resume </button></td>
        <td> {item.updatedAt} </td>
      </tr>
    ))

    return (
      <div className="clients-table">
        <table>
          <thead>
            <tr>    
              <th>Last Name</th>
              <th>First Name</th>
              <th></th>
              <th></th>
              <th>Last Updated</th>
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

export default (Lucas_ClientData);
