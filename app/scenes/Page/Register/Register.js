'use strict';

import { Link, NavLink } from 'react-router-dom';
import React, { Component } from 'react';

import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
			signUpError: '',
			registrationSuccess: false,
			email: '',
			password: '',
			passwordValidation: ''
		};
	}

	sendVerificationEmail(email) {
		fetch(`/api/${email}/mail`).then((res) => res.json()).then((json) => {
			if (json.success) {
			}
			else {
			}
		});
	}

	onTextboxChangeSignUpEmail(event) {
		this.setState({
			email: event.target.value
		});
	}

	onTextboxChangeSignUpPassword(event) {
		this.setState({
			password: event.target.value
		});
	}

	onTextboxChangeSignUpPasswordValidation(event) {
		this.setState({
			passwordValidation: event.target.value
		});
	}

	onSignUp() {
		// Grab state
		const { email, password, passwordValidation } = this.state;

		if (password === passwordValidation) {
			this.setState({
				isLoading: true
			});

			// Post request to backend
			fetch('/api/account/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: email,
					password: password
				})
			})
				.then((res) => res.json())
				.then((json) => {
					if (json.success) {
						this.sendVerificationEmail(email);

						this.setState({
							signUpError: json.message,
							registrationSuccess: true,
							email: '',
							password: ''
						});
					}
					else {
						this.setState({
							signUpError: json.message
						});
					}
				});
		}
		else {
			this.setState({
				signUpError: 'Passwords do not match'
			});
		}
	}

	render() {
		const { email, password, passwordValidation, registrationSuccess, signUpError } = this.state;

		return (
			<Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
				<Grid.Column style={{ maxWidth: 450 }}>
					<Header as="h2" color="black" textAlign="center">
						Register new Account
					</Header>
					<Form size="large">
						<Segment raised>
							<Form.Input
								type="email"
								disabled={registrationSuccess ? true : false}
								fluid
								icon="user"
								iconPosition="left"
								value={email}
								onChange={this.onTextboxChangeSignUpEmail.bind(this)}
								placeholder="E-mail address"
							/>
							<Form.Input
								fluid
								icon="lock"
								disabled={registrationSuccess ? true : false}
								iconPosition="left"
								placeholder="Password"
								type="password"
								value={password}
								onChange={this.onTextboxChangeSignUpPassword.bind(this)}
							/>
							<Form.Input
								fluid
								icon="lock"
								disabled={registrationSuccess ? true : false}
								iconPosition="left"
								placeholder="Repeat Password"
								type="password"
								value={passwordValidation}
								onChange={this.onTextboxChangeSignUpPasswordValidation.bind(this)}
							/>
							<Button color="teal" fluid size="large" onClick={this.onSignUp.bind(this)}>
								Register
							</Button>
						</Segment>
					</Form>
					{registrationSuccess ? (
						<Message color="green">
							Registration Successful, check your emails.&nbsp;
							<NavLink exact to="/">
								Back to Homepage
							</NavLink>
						</Message>
					) : null}
					{signUpError ? <Message color="red">{signUpError}</Message> : null}
				</Grid.Column>
			</Grid>
		);
	}
}

export default Register;
