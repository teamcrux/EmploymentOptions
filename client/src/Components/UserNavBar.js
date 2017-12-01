import React from 'react';
import {Link} from 'react-router-dom';

class UserNavBar extends React.Component {

  render() {
    return (
      <div className="user-navbar">
        <nav>
          <ul>
            <li><Link to="/clients">Clients</Link></li>
            <li><Link to="/lucas_clients">Lucas_Clients</Link></li>
            <li><Link to="/newclient">New Client</Link></li>
            <li><Link to="/createUser">Add User</Link></li>
            <li><Link to="/masterform">Master Form</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default UserNavBar
