'use strict';

import { withRouter, NavLink } from 'react-router-dom';
import React, { Component } from 'react';

import { Statistic, Icon, Message, Container, Divider, Header, Table, Button, Grid } from 'semantic-ui-react';

import DashboardHeader from './../DashboardHeader/DashboardHeader';

import { getFromStorage } from './../../utils/storage';

class AccountLayout extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			token: '',
			userData: [],
			hideMessage: false
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
		const { title, subtitle, message, messagetype, showmessage } = this.props;
		const { userData, hideMessage } = this.state;

		return (
			<Container>
				<DashboardHeader userData={userData} />
				<Divider hidden />
				<Container fluid>
					<Grid>
						<Grid.Column width={16}>
							<Header as="h2" content={title} subheader={subtitle} />

							{showmessage && (
								<Message
									hidden={hideMessage}
									success={messagetype === 'success' ? true : false}
									negative={messagetype === 'failure' ? true : false}
									info={messagetype === 'info' ? true : false}
									onDismiss={() => this.setState({ hideMessage: true })}
								>
									{message || 'test-message'}
								</Message>
							)}

							{this.props.children}
						</Grid.Column>
					</Grid>
				</Container>
			</Container>
		);
	}
}

export default withRouter(AccountLayout);
