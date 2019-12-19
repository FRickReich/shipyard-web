'use strict';

import React, { Component } from 'react';
import 'whatwg-fetch';
import { NavLink } from 'react-router-dom';

import moment from 'moment';

import { Button, Form, Grid, Statistic, Icon, Container, Header, Message, Segment } from 'semantic-ui-react';

import { setInStorage, getFromStorage } from './../../utils/storage';

import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';

class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			token: '',
			signInError: '',
			email: '',
			password: '',
			userData: []
		};

		this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
		this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);

		this.onSignIn = this.onSignIn.bind(this);
	}

	componentDidMount() {
		const obj = getFromStorage('botany-bay');

		if (obj && obj.token) {
			const { token } = obj;

			// Verify token
			fetch('/api/account/verify?token=' + token).then((res) => res.json()).then((json) => {
				if (json.success) {
					this.getUserInfo();

					this.setState({
						token,
						isLoading: false
					});
				}
				else {
					this.setState({
						isLoading: false,
						userData: []
					});
				}
			});
		}
		else {
			this.setState({
				isLoading: false
			});
		}
	}

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

	getUserInfo() {
		const obj = getFromStorage('botany-bay');

		if (obj && obj.token) {
			const { token } = obj;

			// Verify token
			fetch('/api/account/?id=' + token).then((res) => res.json()).then((json) => {
				console.log(json);

				if (json.success) {
					this.setState({
						isLoading: false,
						userData: json.data
					});
				}
			});
		}
		else {
			this.setState({
				isLoading: false
			});
		}
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
				console.log('json', json);

				if (json.success) {
					setInStorage('botany-bay', { token: json.token });

					this.getUserInfo();

					this.setState({
						signInError: json.message,
						isLoading: false,
						email: '',
						password: '',
						token: json.token
					});
				}
				else {
					this.setState({
						signInError: json.message,
						isLoading: false
					});
				}
			});
	}

	render() {
		const { isLoading, token, signInError, email, password, userData, logoutModalOpen } = this.state;

		let search = new URLSearchParams(this.props.location.search);

		let registrationDate = moment(userData.signUpDate).fromNow(true);

		if (token) {
			return (
				<Container>
					<DashboardHeader userData={userData} />

					<Container fluid>
						<Header as="h2" color="black">
							Overview
						</Header>
						<Statistic.Group size="tiny">
							<Statistic>
								<Statistic.Value>{registrationDate}</Statistic.Value>
								<Statistic.Label>Registered</Statistic.Label>
							</Statistic>
							<Statistic>
								<Statistic.Value>
									{userData.isVerified ? (
										<Icon color="green" name="checkmark" />
									) : (
										<Icon color="red" name="cancel" />
									)}
								</Statistic.Value>
								<Statistic.Label>Verified</Statistic.Label>
							</Statistic>
						</Statistic.Group>
					</Container>
				</Container>
			);
		}
		else {
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
									Create one now
								</NavLink>
							</Message>
						)}
					</Grid.Column>
				</Grid>
			);
		}
	}
}

export default Dashboard;
