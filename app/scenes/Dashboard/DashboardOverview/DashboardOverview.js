'use strict';

import React, { Component } from 'react';
import 'whatwg-fetch';

//import moment from 'moment';

import { Statistic, Icon, Container, Divider, Table, Button, Grid } from 'semantic-ui-react';

import { getFromStorage } from './../../../utils/storage';

import LoadingScreen from './../../../components/LoadingScreen/LoadingScreen';
import DashboardLayout from './../../../components/DashboardLayout/DashboardLayout';

class DashboardOverview extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			token: '',
			userData: [],
			messages: []
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
		const { token, userData, isLoading, messages } = this.state;

		console.log(messages);

		if (token) {
			return <DashboardLayout>test</DashboardLayout>;
		} else if (!token || isLoading) {
			return <LoadingScreen />;
		}
	}
}

export default DashboardOverview;
