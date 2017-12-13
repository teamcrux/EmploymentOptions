import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import UserHeader from './UserHeader';
import UserNavBar from './UserNavBar';
import PersonalEdit from './PersonalEdit';
import PersonalData from './PersonalData';
import GeneralData from './GeneralData';
import JobData from './JobData';
import renderExperience from './Experience'


class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.getUser = this.getUser.bind(this);
    this.editSection = this.editSection.bind(this);
    this.editMade = this.editMade.bind(this);
    this.state = {
      EditPersonal: false,
      userLoaded: false,
      userDetails: {},
      userId: this.props.match.params.id
    }
  };

  getUser = () =>{
    fetch("/api/clients/"+this.state.userId, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT '+localStorage.getItem("token")
      },
      method: 'Get'
    })
    .then(res => res.json())
    .then(responseJson =>  {
      console.log(responseJson);
      this.setState({
        userLoaded: true,
        EditPersonal: false,
        userDetails: responseJson,
      });
    })
  };

  editSection = section => {
    if (section === "Personal") {
      this.setState({
        EditPersonal: true,
      })
    }
  }

  editMade = () => {
    this.getUser();
  }

  componentDidMount(){
    this.getUser();
  }

  render () {
    const {handleSubmit, pristine, submitting } = this.props;

    if (!this.state.userLoaded) {
      return <div></div>
    }

    return (
      <div className="clients-page">
        <UserHeader />
        <div className="container flexbox">
          <UserNavBar />
          <div className="master-form">
            <div>
              {!this.state.EditPersonal && <button onClick={(e) => this.editSection("Personal")}> Edit </button>}
              {this.state.EditPersonal && <button onClick={(e) => this.getUser()}> Cancel </button>}
            </div>
            <div>
              {!this.state.EditPersonal && <PersonalData user={this.state.userDetails} />}
              {this.state.EditPersonal && <PersonalEdit user={this.state.userDetails} makeEdit={this.editMade}/> }
            </div>
              <JobData user={this.state.userDetails} makeEdit={this.editMade}/>
          </div>
        </div>
      </div>
    )
  }
};

export default UserProfile
