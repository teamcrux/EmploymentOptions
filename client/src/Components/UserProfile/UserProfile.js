import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import UserHeader from '../UserHeader';
import UserNavBar from '../UserNavBar';
import ClientEdit from './ClientEdit';

import ClientPersonalEdit from './ClientPersonalEdit';
import ClientIncomeEdit from './ClientInsuranceEdit';
import ClientEmploymentEdit from './ClientEmploymentEdit';
import ClientInsuranceEdit from './ClientInsuranceEdit';
import ClientDisabilityEdit from './ClientDisabilityEdit';
import ClientSpecialEdit from './ClientSpecialEdit';
import ClientAdditionalEdit from './ClientAdditionalEdit';
import ClientEducationEdit from './ClientEducationEdit';
import ClientMedicalEdit from './ClientMedicalEdit';

import PersonalData from '../PersonalData';
import JobData from '../JobData';



class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.getUser = this.getUser.bind(this);
    this.editSection = this.editSection.bind(this);
    this.editMade = this.editMade.bind(this);
    this.state = {
      EditClient: false,
      EditClientPersonal: false,
      EditClientIncome: false,
      EditClientInsurance: false,
      EditClientEmployment: false,
      EditClientDisability: false,
      EditClientSpecial: false,
      EditClientAdditional: false,
      EditClientEducation: false,
      EditClientMedical: false,
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
      //console.log(responseJson);
      this.setState({
        userLoaded: true,
        EditClient: false,
        EditClientPersonal: false,
        EditClientIncome: false,
        EditClientInsurance: false,
        EditClientEmployment: false,
        EditClientDisability: false,
        EditClientSpecial: false,
        EditClientAdditional: false,
        EditClientEducation: false,
        EditClientMedical: false,
        userDetails: responseJson
      });
    })
  };

  editSection = section => {
    if (section === "ClientPersonal") {
      this.setState({
        EditClientPersonal: true,
        EditClient: false,
        EditClientIncome: false,
        EditClientInsurance: false,
        EditClientEmployment: false,
        EditClientDisability: false,
        EditClientSpecial: false,
        EditClientAdditional: false,
        EditClientEducation: false,
        EditClientMedical: false
      })
    }

    else if (section === "ClientIncome") {
      this.setState({
        EditClientIncome: true,
        EditClient: false,
        EditClientPersonal: false,
        EditClientInsurance: false,
        EditClientEmployment: false,
        EditClientDisability: false,
        EditClientSpecial: false,
        EditClientAdditional: false,
        EditClientEducation: false,
        EditClientMedical: false
      })
    }
    else if (section === "ClientInsurance") {
      this.setState({
        EditClientInsurance: true,
        EditClient: false,
        EditClientPersonal: false,
        EditClientIncome: false,
        EditClientEmployment: false,
        EditClientDisability: false,
        EditClientSpecial: false,
        EditClientAdditional: false,
        EditClientEducation: false,
        EditClientMedical: false
      })
    }
    else if (section === "ClientEmployment") {
      this.setState({
        EditClientEmployment: true,
        EditClient: false,
        EditClientPersonal: false,
        EditClientIncome: false,
        EditClientInsurance: false,
        EditClientDisability: false,
        EditClientSpecial: false,
        EditClientAdditional: false,
        EditClientEducation: false,
        EditClientMedical: false
      })
    }
    else if (section === "ClientDisability") {
      this.setState({
        EditClientDisability: true,
        EditClient: false,
        EditClientPersonal: false,
        EditClientIncome: false,
        EditClientInsurance: false,
        EditClientEmployment: false,
        EditClientSpecial: false,
        EditClientAdditional: false,
        EditClientEducation: false,
        EditClientMedical: false
      })
    }
    else if (section === "ClientSpecial") {
      this.setState({
        EditClientSpecial: true,
        EditClient: false,
        EditClientPersonal: false,
        EditClientIncome: false,
        EditClientInsurance: false,
        EditClientEmployment: false,
        EditClientDisability: false,
        EditClientAdditional: false,
        EditClientEducation: false,
        EditClientMedical: false,
      })
    }
    else if (section === "ClientAdditional") {
      this.setState({
        EditClientAdditional: true,
        EditClient: false,
        EditClientPersonal: false,
        EditClientIncome: false,
        EditClientInsurance: false,
        EditClientEmployment: false,
        EditClientDisability: false,
        EditClientSpecial: false,
        EditClientEducation: false,
        EditClientMedical: false
      })
    }
    else if (section === "ClientEducation") {
      this.setState({
        EditClientEducation: true,
        EditClient: false,
        EditClientPersonal: false,
        EditClientIncome: false,
        EditClientInsurance: false,
        EditClientEmployment: false,
        EditClientDisability: false,
        EditClientSpecial: false,
        EditClientAdditional: false,
        EditClientMedical: false
      })
    }
    else if (section === "ClientMedical") {
      this.setState({
        EditClientMedical: true,
        EditClient: false,
        EditClientPersonal: false,
        EditClientIncome: false,
        EditClientInsurance: false,
        EditClientEmployment: false,
        EditClientDisability: false,
        EditClientSpecial: false,
        EditClientAdditional: false,
        EditClientEducation: false
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
            <h2>Client: {this.state.userDetails.first_name}  {this.state.userDetails.last_name}</h2>
            
            {/* Personal Info */}
            <div>
              <h3>
                Personal Information --------    
                {!this.state.EditClientPersonal && <button onClick={(e) => this.editSection("ClientPersonal")}>Edit</button>}
                {this.state.EditClientPersonal && <button onClick={(e) => this.getUser()}>Cancel</button>}
              </h3>
              {!this.state.EditClientPersonal &&
                <div>
                  <p>First name *: {this.state.userDetails.first_name}</p>
                  <p>Last name *:  {this.state.userDetails.last_name}</p>
                  <p>Middle name:  {this.state.userDetails.middle_name}</p>
                  <p>Preferred Name: {this.state.userDetails.preferred_name}</p>
                  <p>Previous Last Name: {this.state.userDetails.previous_last_name}</p>
                  <p>Birthdate: {this.state.userDetails.dob}</p>
                  <p>Email address: {this.state.userDetails.email}</p>
                  <p>Gender: gender: {this.state.userDetails.gender}</p>
                  <p>Social Security Number: {this.state.userDetails.ssn}</p>
                  <p>Phone Number: {this.state.userDetails.phone}</p>
                  <p>Phone Type: {this.state.userDetails.phone_type}</p>
                  <p>Second Phone Number: {this.state.userDetails.phone2_number}</p>
                  <p>Second Phone Type: {this.state.userDetails.phone2_type}</p>
                  <p>Race: {this.state.userDetails.race}</p>
                  <p>race_other_explain {this.state.userDetails.race_other_explain}</p>
                  <p>Primary Language: {this.state.userDetails.primary_language}</p>
                  <p>(Counselor Notes: ) {this.state.userDetails.language_counselor_notes}</p>
                  <p>Have you been a prior client of Vocational Rehabilitation? {this.state.userDetails.prior_client}</p>
                  <p>If yes, when and where? {this.state.userDetails.prior_client_explain}</p>
                  <p>Are you a US Citizen? {this.state.userDetails.us_citizen}</p>
                  <p>work_permit: {this.state.userDetails.work_permit}</p>
                  <p>contacts_counselor_notes: {this.state.userDetails.contacts_counselor_notes}</p>
                  <p>living_situation: {this.state.userDetails.living_situation}</p>
                  <p>marital_status: {this.state.userDetails.marital_status}</p>
                  <p>living_with_you_self_only: {this.state.userDetails.living_with_you_self_only}</p>
                  <p>living_with_you_partner_children: {this.state.userDetails.living_with_you_partner_children}</p>
                  <p>living_with_you_parents: {this.state.userDetails.living_with_you_parents}</p>
                  <p>living_with_you_other: {this.state.userDetails.living_with_you_other}</p>
                  <p>living_with_you_other_explain: {this.state.userDetails.living_with_you_other_explain}</p>
                  <p>who_reffered_you: {this.state.userDetails.who_reffered_you}</p>
                </div>
              }
              {this.state.EditClientPersonal && <ClientPersonalEdit user={this.state.userDetails} makeEdit={this.editMade}/> }
            </div>

            
            {/* Income Info */}
            <div>
              <h3>
                Income Information --------    
                {!this.state.EditClientIncome && <button onClick={(e) => this.editSection("ClientIncome")}>Edit</button>}
                {this.state.EditClientIncome && <button onClick={(e) => this.getUser()}>Cancel</button>}
              </h3>
              {!this.state.EditClientIncome &&
                <div>
                  <p>First Name: {this.state.userDetails.first_name}</p>
                  <p>Last Name: {this.state.userDetails.last_name}</p>
                </div>
              }
              {this.state.EditClientIncome && <ClientIncomeEdit user={this.state.userDetails} makeEdit={this.editMade}/> }
            </div>

            
            {/* Insurance Info */}
            <div>
              <h3>
                Insurance Information --------    
                {!this.state.EditClientInsurance && <button onClick={(e) => this.editSection("ClientInsurance")}>Edit</button>}
                {this.state.EditClientInsurance && <button onClick={(e) => this.getUser()}>Cancel</button>}
              </h3>
              {!this.state.EditClientInsurance &&
                <div>
                  <p>First Name: {this.state.userDetails.first_name}</p>
                  <p>Last Name: {this.state.userDetails.last_name}</p>
                </div>
              }
              {this.state.EditClientInsurance && <ClientInsuranceEdit user={this.state.userDetails} makeEdit={this.editMade}/> }
            </div>

            {/* Employment Info */}
            <div>
              <h3>
                Employment Information --------    
                {!this.state.EditClientEmployment && <button onClick={(e) => this.editSection("ClientEmployment")}>Edit</button>}
                {this.state.EditClientEmployment && <button onClick={(e) => this.getUser()}>Cancel</button>}
              </h3>
              {!this.state.EditClientEmployment &&
                <div>
                  <p>First Name: {this.state.userDetails.first_name}</p>
                  <p>Last Name: {this.state.userDetails.last_name}</p>
                </div>
              }
              {this.state.EditClientEmployment && <ClientEmploymentEdit user={this.state.userDetails} makeEdit={this.editMade}/> }
            </div>

            {/* Disability Info */}
            <div>
              <h3>
                Disability Information --------    
                {!this.state.EditClientDisability && <button onClick={(e) => this.editSection("ClientDisability")}>Edit</button>}
                {this.state.EditClientDisability && <button onClick={(e) => this.getUser()}>Cancel</button>}
              </h3>
              {!this.state.EditClientDisability &&
                <div>
                  <p>First Name: {this.state.userDetails.first_name}</p>
                  <p>Last Name: {this.state.userDetails.last_name}</p>
                </div>
              }
              {this.state.EditClientDisability && <ClientDisabilityEdit user={this.state.userDetails} makeEdit={this.editMade}/> }
            </div>

            {/* Special Info */}
            <div>
              <h3>
                Special Information --------    
                {!this.state.EditClientSpecial && <button onClick={(e) => this.editSection("ClientSpecial")}>Edit</button>}
                {this.state.EditClientSpecial && <button onClick={(e) => this.getUser()}>Cancel</button>}
              </h3>
              {!this.state.EditClientSpecial &&
                <div>
                  <p>First Name: {this.state.userDetails.first_name}</p>
                  <p>Last Name: {this.state.userDetails.last_name}</p>
                </div>
              }
              {this.state.EditClientSpecial && <ClientSpecialEdit user={this.state.userDetails} makeEdit={this.editMade}/> }
            </div>

            {/* Additional Info */}
            <div>
              <h3>
                Additional Information --------    
                {!this.state.EditClientAdditional && <button onClick={(e) => this.editSection("ClientAdditional")}>Edit</button>}
                {this.state.EditClientAdditional && <button onClick={(e) => this.getUser()}>Cancel</button>}
              </h3>
              {!this.state.EditClientAdditional &&
                <div>
                  <p>First Name: {this.state.userDetails.first_name}</p>
                  <p>Last Name: {this.state.userDetails.last_name}</p>
                </div>
              }
              {this.state.EditClientAdditional && <ClientAdditionalEdit user={this.state.userDetails} makeEdit={this.editMade}/> }
            </div>

            {/* Education Info */}
            <div>
              <h3>
                Education Information --------    
                {!this.state.EditClientEducation && <button onClick={(e) => this.editSection("ClientEducation")}>Edit</button>}
                {this.state.EditClientEducation && <button onClick={(e) => this.getUser()}>Cancel</button>}
              </h3>
              {!this.state.EditClientEducation &&
                <div>
                  <p>First Name: {this.state.userDetails.first_name}</p>
                  <p>Last Name: {this.state.userDetails.last_name}</p>
                </div>
              }
              {this.state.EditClientEducation && <ClientEducationEdit user={this.state.userDetails} makeEdit={this.editMade}/> }
            </div>

            {/* Medical Info */}
            <div>
              <h3>
                Medical Information --------    
                {!this.state.EditClientMedical && <button onClick={(e) => this.editSection("ClientMedical")}>Edit</button>}
                {this.state.EditClientMedical && <button onClick={(e) => this.getUser()}>Cancel</button>}
              </h3>
              {!this.state.EditClientMedical &&
                <div>
                  <p>First Name: {this.state.userDetails.first_name}</p>
                  <p>Last Name: {this.state.userDetails.last_name}</p>
                </div>
              }
              {this.state.EditClientMedical && <ClientMedicalEdit user={this.state.userDetails} makeEdit={this.editMade}/> }
            </div>

            
            <div>
              {!this.state.EditClient && <JobData user={this.state.userDetails} makeEdit={this.editMade}/>}
            </div>
            

              
          </div>
            
        </div>
      </div>
    )
  }
};

export default UserProfile
