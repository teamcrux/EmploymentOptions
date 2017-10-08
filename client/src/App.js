import React, { Component } from 'react';
// import './App.css';
import MasterForm from './Components/MasterForm.js';
import ClientData from './Components/ClientData.js';
import LoginForm from './Components/LoginForm';
import Logout from './Components/Logout';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false
    };

    this.logIn = this.logIn.bind(this);
  }

  logIn = (token)=>{
    if(token){
        this.setState({
            loggedIn: true
        })
    }
  };

  componentWillMount = ()=>{
    this.logIn(localStorage.getItem('token'))
  };


  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <div className="container text-center">
              <Route exact path="/" render={(props)=>{return (<LoginForm logIn={this.logIn} />)}} />
              <Route path="/masterform" component={MasterForm} />
              <Route path="/clients" component={ClientData} />
              <Route path="/logout" component={Logout} />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
