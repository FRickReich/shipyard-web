'use strict';

import React, { Component } from 'react';
import 'whatwg-fetch';

import LoadingScreen from './../../components/LoadingScreen/LoadingScreen';

import { setInStorage, getFromStorage } from './../../utils/storage';

class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			token: '',
			signUpError: '',
			signInError: '',
			email: '',
			password: '',
			userData: []
		};

		this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
		this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);

		this.onSignIn = this.onSignIn.bind(this);
		this.onSignUp = this.onSignUp.bind(this);

		this.logout = this.logout.bind(this);
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

	onSignUp() {
		// Grab state
		const { email, password } = this.state;

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
				console.log('json', json);

				if (json.success) {
					this.setState({
						signUpError: json.message,
						isLoading: false,
						email: '',
						password: ''
					});
				}
				else {
					this.setState({
						signUpError: json.message,
						isLoading: false
					});
				}
			});
	}

	render() {
		const { isLoading, token, signInError, email, password, signUpError, userData } = this.state;

		return (
			<div>
				<h1>Dashboard</h1>

				<p>this is the dashboard...</p>

				{signInError ? <p>{signInError}</p> : null}
				{signUpError ? <p>{signUpError}</p> : null}

				<section>
					{token ? (
						<div>
							{isLoading ? (
								<LoadingScreen />
							) : (
								<div>
									<p>Account</p>
									<p>email: {userData.email}</p>
									<p>created: {userData.signUpDate}</p>

									<button onClick={this.logout}>Logout</button>
								</div>
							)}
						</div>
					) : (
						<div>
							<input
								type="email"
								placeholder="Email"
								value={email}
								onChange={this.onTextboxChangeSignUpEmail}
							/>

							<br />

							<input
								type="password"
								placeholder="Password"
								value={password}
								onChange={this.onTextboxChangeSignUpPassword}
							/>

							<br />

							<button onClick={this.onSignUp}>Sign Up</button>
							<button onClick={this.onSignIn}>Sign In</button>
						</div>
					)}
				</section>
			</div>
		);
	}
}

export default Dashboard;
