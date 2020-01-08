'use strict';

import { withRouter, NavLink } from 'react-router-dom';
import React, { Component } from 'react';
import 'whatwg-fetch';

import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

import { setInStorage } from './../../../utils/storage';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			token: '',
			signInError: '',
			email: '',
			password: ''
		};

		this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
		this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);

		this.onSignIn = this.onSignIn.bind(this);
	}

	componentDidMount() {}

	onTextboxChangeSignInEmail(event) {
		this.setState({
			email: event.target.value
		});
	}

	onTextboxChangeSignInPassword(event) {
		this.setState({
			password: event.target.value
		});
	}

	onSignIn() {
		const { email, password } = this.state;

		this.setState({
			isLoading: true
		});

		fetch('/api/account/signin', {
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
					setInStorage('botany-bay', { token: json.token });

					this.props.history.push('/dashboard');

					this.setState({
						signInError: json.message,
						email: '',
						password: '',
						token: json.token
					});
				}
				else {
					this.setState({
						signInError: json.message
					});
				}
			});
	}

	render() {
		const { signInError, email, password } = this.state;

		let search = new URLSearchParams(this.props.location.search);

		return (
			<Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
				<Grid.Column style={{ maxWidth: 450 }}>
					<Header as="h2" color="black" textAlign="center">
						Log-in
					</Header>
					<Form size="large">
						<Segment raised>
							<Form.Input
								type="email"
								fluid
								icon="user"
								iconPosition="left"
								value={email}
								onChange={this.onTextboxChangeSignInEmail}
								placeholder="E-mail address"
							/>
							<Form.Input
								fluid
								icon="lock"
								iconPosition="left"
								placeholder="Password"
								type="password"
								value={password}
								onChange={this.onTextboxChangeSignInPassword}
							/>
							<Button color="teal" fluid size="large" onClick={this.onSignIn}>
								Login
							</Button>
						</Segment>
					</Form>
					{signInError ? <Message color="red">{signInError}</Message> : null}
					{search.get('verified') ? (
						<Message color="green">Account verified, You can log in now!</Message>
					) : (
						<Message>
							Dont have an account yet?&nbsp;
							<NavLink exact to="/register">
								Create one now!
							</NavLink>
						</Message>
					)}
				</Grid.Column>
			</Grid>
		);
	}
}

export default withRouter(Login);
