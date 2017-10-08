import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
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
import createResume from './ResumeGenerator.js';
import UserHeader from './UserHeader';
import UserNavBar from './UserNavBar';

const MasterForm = (props) => {
	const { handleSubmit, pristine, submitting } = props;

	const postForm = (formData) => {
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
		.then(masterform => alert(JSON.stringify(masterform, null, 2)))
		.then(resume =>	createResume(JSON.parse(JSON.stringify(formData))));
	};
	return (
		<div className="master-form-page">
			<UserHeader />
      <div className="container flexbox">
        <UserNavBar />
        <div className="master-form">
				<form onSubmit={ handleSubmit(postForm) }>
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

						<div>
							<h2>PERSONAL</h2>
							<Field name="personal" component={Personal}/>
						</div>

						<div>
							<h2>GENERAL</h2>
							<Field name="general" component={General}/>
						</div>

						<div>
							<h2>EDUCATION</h2>
							<Field name="education" component={Education}/>
						</div>

						<div>
							<h2>WORK PREFERENCES</h2>
							<Field name="workprefs" component={WorkPrefs}/>
						</div>

						<div className="section emp-vol-history">
							<h2>Employment/Volunteer History</h2>
								<label htmlFor="no_work_exp">NO WORK/VOLUNTEER EXPERIENCE</label>
								<Field name="no_work_exp" id="no_work_exp" component="input" type="checkbox"/>
								<FieldArray name="experience" component={renderExperience}/>
						</div>

						<div className="section">
							<h2>REFERENCES</h2>
							<FieldArray name="reference" component={renderRefs}/>
						</div>

						<div>
							<h2>FINANCIAL INFORMATION</h2>
							<Field name="financialinfo" component={FinancialInfo}/>
						</div>

						<div>
							<h2>EMPLOYMENT SERVICES</h2>
							<div>
								<label htmlFor="other_agencies">Are you working with any other agency or employment service?</label>
								<label><Field name="other_agencies" id="other_agencies" component="input" type="checkbox"/>Yes</label>
							</div>
						</div>

						<div>
							<h2>TRANSPORTATION</h2>
							<Field name="transportinfo" component={Transportation}/>
						</div>

						<div>
							<h2>SUBSTANCE/MEDICATION USE</h2>
							<Field name="substanceuse" component={SubstanceUse}/>
						</div>

						<div>
							<h2>PERSONAL INFORMATION</h2>
							<Field name="personalinfo" component={PersonalInfo}/>
						</div>

						<div>
							<h2>RESUME INFORMATION</h2>
							<Field name="resumeinfo" component={ResumeInfo}/>
						</div>

						<div className="submit-container">
							<button className="submit-button" type="submit" disabled={pristine || submitting}>Submit</button>
						</div>

					</div>
				</form>
        </div>
      </div>
		</div>
	);
};

export default reduxForm({
	form: 'masterform',
	validate
})(MasterForm);
