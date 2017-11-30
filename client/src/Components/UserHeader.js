import React from 'react';

import logo from '../images/eo-logo.png';

class UserHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }

  componentWillMount() {
    let _this = this;
    this.getCurrentUser =
      fetch(`/api/users/current/`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + localStorage.getItem("token")
        },
        method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
        _this.setState({
          first_name: responseJson.first_name,
          last_name: responseJson.last_name
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
        <div className="user-header flexbox">
          <div className="logo-wrapper">
            <img src={logo} alt="Employment Options" />
          </div>
          <h1>Employment Options Database</h1>
        </div>
    );
  }
}

export default UserHeader
