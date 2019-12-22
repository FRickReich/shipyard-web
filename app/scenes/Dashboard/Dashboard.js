'use strict';

import React, { Component } from 'react';
import 'whatwg-fetch';
import { NavLink } from 'react-router-dom';

import moment from 'moment';

import { Statistic, Icon, Container, Header } from 'semantic-ui-react';

import { getFromStorage } from './../../utils/storage';

import DashboardHeader from './../../components/DashboardHeader/DashboardHeader';
import LoadingScreen from './../../components/LoadingScreen/LoadingScreen';
import TexEditor from './../../components/TextEditor/TextEditor';

class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			token: '',
			userData: []
		};
	}

	componentDidMount() {
		const obj = getFromStorage('botany-bay');

		if (obj && obj.token !== '') {
		}
		else {
			return this.props.history.push('/dashboard/login');
		}

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

	render() {
		const { token, userData, isLoading } = this.state;

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

						<TexEditor />
					</Container>
				</Container>
			);
		}
		else if (!token || isLoading) {
			return <LoadingScreen />;
		}
	}
}

export default Dashboard;
