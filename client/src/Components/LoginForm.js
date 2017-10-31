import React, { Component } from 'react';
import BodyClassName from 'react-body-classname';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import logo from '../images/eo-logo.png';

class LoginForm  extends Component {
	constructor(props){
		super(props);
		this.state = {
			loginSuccess: false,
			loginFailure: false
		};
		this.authenticate = this.authenticate.bind(this);
	}

	authenticate(formData) {
		fetch("/login", {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(formData)
		})
		.then((res)=> {
			return res.json();
		})
		.then((login) => {
			if(login.success){
				localStorage.setItem("token", login.token);
				this.setState({
					loginSuccess: true,
				});
			} else {
				this.setState({
					loginFailure: true
				})
			}
		})
	};

	render() {
        const { handleSubmit, pristine, submitting } = this.props;
        return (
			<BodyClassName className="login-page">
				<div className="login-form">
					<div className="logo-wrapper">
						<img src={logo} alt="Employment Options"/>
					</div>
					<form className="form-horizontal" onSubmit={handleSubmit(this.authenticate)}>
						<div className="form-group">
							<label className="col-sm-2 control-label">Username: </label>
							<div className="col-sm-6">
								<Field
									type="text"
									component="input"
									name="username"
									className="form-control col-sm-10"/>
							</div>
						</div>
						<div className="form-group">
							<label className="col-sm-2 control-label">Password: </label>
							<div className="col-sm-6">
								<Field
									type="password"
									component="input"
									name="password"
									className="form-control"/>
							</div>
						</div>
						<div className="button-wrapper">
							<button className="btn btn-default" type="submit" disabled={pristine || submitting}>Submit
							</button>
						</div>
					</form>
				{this.state.loginSuccess && <Redirect to="/clients" push />}
				{this.state.loginFailure && <Redirect to="/" />}
				</div>
			</BodyClassName>
        )
    }
}

export default reduxForm({form: 'login'})(LoginForm);
