import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Redirect } from 'react-router-dom';
import validate from './validate';
import renderExperience from './Experience';
import renderRefs from './References';
import Personal from './Personal';
import General from './General';
import Education from './Education';
import WorkPrefs from './WorkPrefs';
import PersonalInfo from './PersonalInfo';
import ResumeInfo from './ResumeInfo';
import SubstanceUse from './SubstanceUse';
import FinancialInfo from './FinancialInfo';
import Transportation from './Transportation';
import UserHeader from './UserHeader';
import UserNavBar from './UserNavBar';

const renderErrField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <div className="err-output">
      <input {...input} placeholder={label} type={type}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

class NewClient extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			submitSuccess: false
		};
		this.onSub = this.onSub.bind(this);
	}

	onSub(formData) {
		fetch("/api/clients", {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'JWT '+localStorage.getItem("token")
			},
			method: 'POST',
			body: JSON.stringify(formData)
		})
		.then(res => res.json())
		.then(res => {
			if(res.id) {
				this.setState({
					submitSuccess: true
				});
			}
			else {
				alert("ERROR IN FORM SUBMISSION");
			}
		});
	};

	render() {
		const {handleSubmit, pristine, submitting } = this.props;
		return (
			<div className="master-form-page">
				<UserHeader />
				<div className="container flexbox">
					<UserNavBar />
					<div className="master-form">
					<form onSubmit={handleSubmit(this.onSub) }>
						<div className="master-form-container">
							<div className="master-form-header">
								<h1>New Client</h1>
							</div>
							<div>
						        <label htmlFor="fname">First name *</label>
						        <Field name="fname" component={renderErrField} type="text"/>
						    </div>
						    <div>
						        <label htmlFor="lname">Last name *</label>
						    	<Field name="lname" component={renderErrField} type="text"/>
						    </div>
						    <div className="submit-container">
								<button className="submit-button" type="submit" disabled={pristine || submitting}>Submit</button>
							</div>
						</div>
					</form>
						{this.state.submitSuccess && <Redirect to="/clients" push />}
					</div>
				</div>
			</div>
		);
	}

};

export default reduxForm({
	form: 'masterform',
	validate
})(NewClient);
