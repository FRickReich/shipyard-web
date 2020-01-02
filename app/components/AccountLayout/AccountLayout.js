'use strict';

import { withRouter, NavLink } from 'react-router-dom';
import React, { Component } from 'react';

import { Statistic, Icon, Container, Divider, Table, Button, Grid } from 'semantic-ui-react';

import DashboardHeader from './../DashboardHeader/DashboardHeader';

import { getFromStorage } from './../../utils/storage';

class AccountLayout extends Component {
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
		} else {
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
				} else {
					this.setState({
						isLoading: false,
						userData: []
					});
				}
			});
		} else {
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
		} else {
			this.setState({
				isLoading: false
			});
		}
	}

	render() {
		const { userData } = this.state;

		return (
			<Container>
				<DashboardHeader userData={userData} />
				<Divider hidden />
				<Container fluid>
					<Grid>
						<Grid.Column width={16}>{this.props.children}</Grid.Column>
					</Grid>
				</Container>
			</Container>
		);
	}
}

export default withRouter(AccountLayout);
