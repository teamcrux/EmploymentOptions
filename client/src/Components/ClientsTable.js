import React, { Component } from 'react';
import createResume from './ResumeGenerator';
import UserProfile from './UserProfile/UserProfile';
import { NavLink } from 'react-router-dom';
const moment = require('moment');
const FileSaver = require('file-saver');

class ClientsData extends Component {
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

    const persons = this.state.clientData.map(item => (
      <tr>
        <td> {item.last_name} </td>
        <td> {item.first_name} </td>
        <td><NavLink id="toUser" to={`/user/${item.id}`} activeClassName="selected"><button>View Profile</button></NavLink></td>
        <td><button onClick={()=>this.downResume(item.id, item.first_name, item.last_name)}> Download Resume </button></td>
        <td><button onClick={()=>this.downForm(item.id, item.first_name, item.last_name)}> Download Form </button></td>
        <td> {moment(item.registration_date).format('MM/DD/YY')} </td>
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
              <th></th>
              <th>Reg. Date</th>
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

<<<<<<< HEAD:client/src/Components/ClientTable.js
export default (ClientData);
=======
export default (ClientsData);
>>>>>>> teamcrux/master:client/src/Components/ClientsTable.js
