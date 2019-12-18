'use strict';

import React, { Component } from 'react';
import 'whatwg-fetch';
import { NavLink, Redirect, withRouter } from 'react-router-dom';

import {
	Button,
	Form,
	Grid,
	Modal,
	Dropdown,
	Icon,
	Input,
	Container,
	Menu,
	Header,
	Message,
	Segment
} from 'semantic-ui-react';

import { setInStorage, getFromStorage } from './../../utils/storage';

class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			token: '',
			signInError: '',
			email: '',
			password: '',
			userData: [],
			logoutModalOpen: false
		};

		this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
		this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);

		this.onSignIn = this.onSignIn.bind(this);
	}

	componentDidMount() {
		const obj = getFromStorage('gandhi');

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

	openLogoutModal() {
		this.setState({ logoutModalOpen: true });
	}
	closeLogoutModal() {
		this.setState({ logoutModalOpen: false });
	}

	getUserInfo() {
		const obj = getFromStorage('gandhi');

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

	logout() {
		this.setState({
			isLoading: true
		});

		const obj = getFromStorage('gandhi');

		if (obj && obj.token) {
			const { token } = obj;

			// Verify token
			fetch('/api/account/logout?token=' + token).then((res) => res.json()).then((json) => {
				if (json.success) {
					localStorage.removeItem('gandhi');

					this.setState({
						token: '',
						signInError: '',
						isLoading: false
					});
				}
				else {
					this.setState({
						isLoading: false
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
					setInStorage('gandhi', { token: json.token });

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

		if (token) {
			return (
				<Container>
					<Menu pointing secondary>
						<Menu.Menu position="right">
							<Dropdown item text={userData.email}>
								<Dropdown.Menu>
									<Dropdown.Item onClick={this.openLogoutModal.bind(this)}>Log-out</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</Menu.Menu>
					</Menu>

					<Container fluid>
						<Header as="h2" color="black">
							Account
						</Header>
						<p>email: {userData.email}</p>
						<p>created: {userData.signUpDate}</p>
						<p>verified: {userData.isVerified || 'false'}</p>
					</Container>

					<Modal
						open={logoutModalOpen}
						onOpen={this.openLogoutModal}
						onClose={this.closeLogoutModal}
						basic
						size="small"
					>
						<Header icon="archive" content="Log-out" />
						<Modal.Content>
							<p>Are you sure you want to log-out?</p>
						</Modal.Content>
						<Modal.Actions>
							<Button basic color="red" onClick={this.closeLogoutModal.bind(this)} inverted>
								<Icon name="remove" /> No
							</Button>
							<Button color="green" onClick={this.logout.bind(this)} inverted>
								<Icon name="checkmark" /> Yes
							</Button>
						</Modal.Actions>
					</Modal>
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
						<Message>
							Dont have an account yet?&nbsp;
							<NavLink exact to="/register">
								Create one now
							</NavLink>
						</Message>
					</Grid.Column>
				</Grid>
			);
		}
	}
}

export default Dashboard;
