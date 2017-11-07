import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Redirect } from 'react-router-dom';
import validate from './validate';
import UserHeader from './UserHeader';
import UserNavBar from './UserNavBar';

import Section from './Section';
import Personal from './Personal';
import AlternateContact from './AlternateContact';
import General from './General';
import Education from './Education';
import WorkPrefs from './WorkPrefs';
import renderExperience from './Experience';
import renderRefs from './References';
import FinancialInfo from './FinancialInfo';
import Transportation from './Transportation';
import SubstanceUse from './SubstanceUse';
import PersonalInfo from './PersonalInfo';
import ResumeInfo from './ResumeInfo';

class MasterForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			submitSuccess: false,
			page: 5
		};
		this.onSub = this.onSub.bind(this);
		this.setState = this.setState.bind(this);
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

		const {handleSubmit, pristine, submitting} = this.props;
		
		var section;

		function submit() {
			this.state.submitSuccess //&& <Redirect to="/clients" push />
		}

		function prevPage() {
			this.state.page--;
			this.setState(this.state);
	  	}

	  	function nextPage() {
	    	this.state.page++;
	    	this.setState(this.state);
	  	}

		if (this.state.page == 1) {
		    section = (
		      	<div className="section">
		        	<h2>Personal Information</h2>
		        	<Field name="personal" component={Personal}/>
		        	<span>
						<button className="back-button" onClick={prevPage}>Previous Page</button>
						<button className="next-button" onClick={nextPage}>Next Page</button>
					</span>
		      	</div>
		    )
		}
		else if (this.state.page == 2) {
		    section = (
		    	<div className="section">
		        	<h2>Alternate Contact</h2>
		        	<Field name="alternate" component={AlternateContact}/>
		        	<span>
						<button className="back-button" onClick={prevPage}>Previous Page</button>
						<button className="next-button" onClick={nextPage}>Next Page</button>
					</span>
		      	</div>
		    )
		}
		else if (this.state.page == 3) {
		    section = (
		      		<div className="section">
		        	<h2>General</h2>
		        	<Field name="general" component={General}/>
		      		<span>
						<button className="back-button" onClick={prevPage}>Previous Page</button>
						<button className="next-button" onClick={nextPage}>Next Page</button>
					</span>
		      	</div>
		    )
		}
		else if (this.state.page == 4) {
		    section = (
		      	<div className="section">
		        	<h2>Education</h2>
		        	<Field name="education" component={Education}/>
		      		<span>
						<button className="back-button" onClick={prevPage}>Previous Page</button>
						<button className="next-button" onClick={nextPage}>Next Page</button>
					</span>
		      	</div>
		    )
		}
		else if (this.state.page == 5) {
		    section = (
		      		<div className="section">
		        	<h2>Work Preferences</h2>
		        	<Field name="workprefs" component={WorkPrefs}/>
		      		<span>
						<button className="back-button" onClick={prevPage}>Previous Page</button>
						<button className="next-button" onClick={nextPage}>Next Page</button>
					</span>
		      	</div>
		    )
		}
		else if (this.state.page == 6) {
		    section = (
		      	<div className="section emp-vol-history">
		        	<h2>Employment/Volunteer History</h2>
		        	<label htmlFor="no_work_exp">NO WORK/VOLUNTEER EXPERIENCE</label>
		        	<eld name="no_work_exp" id="no_work_exp" component="input" type="checkbox"/>
		        	<eldArray name="experience" component={renderExperience}/>
		      		<span>
						<button className="back-button" onClick={prevPage}>Previous Page</button>
						<button className="next-button" onClick={nextPage}>Next Page</button>
					</span>
		      	</div>
		    )
		}  
		else if (this.state.page == 7) {
		    section = (
		      	<div className="section">
		        	<h2>REFERENCES</h2>
		        	<FieldArray name="reference" component={renderRefs}/>
		        	<span>
						<button className="back-button" onClick={prevPage}>Previous Page</button>
						<button className="next-button" onClick={nextPage}>Next Page</button>
					</span>
		        </div>
		    )
		} 
		else if (this.state.page == 8) {
		    section = (
		      	<div className="section emp-vol-history">
		        	<h2>FINANCIAL INFORMATION</h2>
		         	<Field name="financialinfo" component={FinancialInfo}/>
		      		<span>
						<button className="back-button" onClick={prevPage}>Previous Page</button>
						<button className="next-button" onClick={nextPage}>Next Page</button>
					</span>
		      	</div>
		    )
		} 
		else if (this.state.page == 9) {
		    section = (
		      	<div className="section emp-vol-history">
		        	<h2>EMPLOYMENT SERVICES</h2>
		          	<div>
		          		<label htmlFor="other_agencies">Are you working with any other agency or employment service?</label>
		          		<label><Field name="other_agencies" id="other_agencies" component="input" type="checkbox"/>Yes</label>
		          		<span>
							<button className="back-button" onClick={prevPage}>Previous Page</button>
							<button className="next-button" onClick={nextPage}>Next Page</button>
						</span>
					</div>
		        </div>
		    )
		} 
		else if (this.state.page == 10) {
		    section = (
		      	<div>
		        	<h2>TRANSPORTATION</h2>
		        	<Field name="transportinfo" component={Transportation}/>
		        	<span>
						<button className="back-button" onClick={prevPage}>Previous Page</button>
						<button className="next-button" onClick={nextPage}>Next Page</button>
					</span>
		        </div>
		    )
		}
		else if (this.state.page == 11) {
		    section = (
		      	<div>
		        	<h2>SUBSTANCE/MEDICATION USE</h2>
		        	<Field name="substanceuse" component={SubstanceUse}/>
		        	<span>
						<button className="back-button" onClick={prevPage}>Previous Page</button>
						<button className="next-button" onClick={nextPage}>Next Page</button>
					</span>
		        </div>
		    )
		}
		else if (this.state.page == 12) {
		    section = (
		      	<div>
		        	<h2>PERSONAL INFORMATION</h2>
		        	<Field name="personalinfo" component={PersonalInfo}/>
		        	<span>
						<button className="back-button" onClick={prevPage}>Previous Page</button>
						<button className="next-button" onClick={nextPage}>Next Page</button>
					</span>
		        </div>
		    )
		}
		else {
		    section = (
		      	<div>
		        	<h2>RESUME INFORMATION</h2>
		        	<Field name="resumeinfo" component={ResumeInfo}/>
		        	<span>
						<button className="back-button" onClick={prevPage}>Previous Page</button>
						<button className="next-button" onClick={nextPage}>Next Page</button>
					</span>
		        </div>
		    )
		}

		return (
			<div className="master-form-page">
				<UserHeader />
				<div className="container flexbox">
					<UserNavBar />
					<div className="master-form">
					<form onSubmit={handleSubmit(this.onSub) }>
						<div className="master-form-container">
							<div className="master-form-header">
								<h1>Master Application</h1> <Field className="choose-resume-type" name="letter" component="select">
																	<option value="">Choose resume type</option>
																	<option value="a">A</option>
																	<option value="b">B</option>
																	<option value="c">C</option>
																	<option value="d">D</option>
																	</Field>
							</div>


							{section}

							<div className="submit-container">
								<button className="submit-button" type="submit" disabled={pristine || submitting} onClick={submit}>Submit</button>
							</div>

						</div>
					</form>
					</div>
				</div>
			</div>
		);
	}

};

export default reduxForm({
	form: 'masterform',
	validate
})(MasterForm);
