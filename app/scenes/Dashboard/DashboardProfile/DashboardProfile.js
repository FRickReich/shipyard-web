'use strict';

import React, { Component } from 'react';
import _ from 'lodash';
import 'whatwg-fetch';

import { Input, Header, Divider, Grid, Dimmer, Loader, Segment, Button, Form, Message } from 'semantic-ui-react';

import AccountLayout from './../../../components/AccountLayout/AccountLayout';

import { getFromStorage } from './../../../utils/storage';

class DashboardProfile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			username: '',
			firstname: '',
			lastname: '',
			company: '',
			website: '',
			countries: [],
			savingUser: false,
			showSaveMessage: true,
			country: ''
		};
	}

	componentDidMount() {
		this.getUser();
		this.getCountries();
	}

	getCountries() {
		fetch('https://restcountries.eu/rest/v2/all').then((res) => res.json()).then((json) => {
			if (json) {
				this.setState({ countries: json });
			}
		});
	}

	onUsernameChange(event) {
		this.setState({ username: event.target.value });
	}

	onFirstnameChange(event) {
		this.setState({ firstname: event.target.value });
	}

	onLastnameChange(event) {
		this.setState({ lastname: event.target.value });
	}

	onCompanyChange(event) {
		this.setState({ company: event.target.value });
	}

	onCountryChange(event) {
		this.setState({ country: event.target.value });
	}

	onWebsiteChange(event) {
		this.setState({ website: event.target.value });
	}

	getUser() {
		const obj = getFromStorage('botany-bay');

		if (obj && obj.token) {
			const { token } = obj;

			// Verify token
			fetch('/api/account/?id=' + token).then((res) => res.json()).then((json) => {
				if (json.success) {
					this.setState({
						isLoading: false,
						username: json.data.username,
						firstname: json.data.firstname,
						lastname: json.data.lastname,
						country: json.data.country,
						company: json.data.company,
						website: json.data.website
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

	updateUser() {
		const { username, firstname, lastname, country, company, website } = this.state;
		const obj = getFromStorage('botany-bay');

		this.setState({ savingUser: true, showSaveMessage: false });

		if (obj && obj.token) {
			const { token } = obj;

			// Verify token
			fetch('/api/account/?id=' + token, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username: username,
					firstname: firstname,
					lastname: lastname,
					country: country,
					company: company,
					website: website
				})
			})
				.then((res) => res.json())
				.then((json) => {
					this.getUser();

					this.setState({ savingUser: false, showSaveMessage: false });
				});
		}
		else {
			this.setState({
				savingUser: false,
				showSaveMessage: false
			});
		}
	}

	render() {
		const {
			username,
			firstname,
			lastname,
			country,
			company,
			countries,
			website,
			savingUser,
			showSaveMessage
		} = this.state;

		return (
			<AccountLayout>
				<Message hidden={showSaveMessage} success onDismiss={() => this.setState({ showSaveMessage: true })}>
					Updated user informations.
				</Message>

				<Header as="h2" content="Account Profile" subheader="Manage your profile" />

				<Segment basic>
					<Dimmer active={savingUser} inverted>
						<Loader />
					</Dimmer>

					<Grid columns={2} stackable textAlign="center">
						<Grid.Row>
							<Grid.Column width={12}>
								<Divider horizontal>
									<Header as="h4">Personal Informations</Header>
								</Divider>

								<Form>
									<Form.Field>
										<label>Username</label>
										<Input
											placeholder="Username"
											value={username}
											onChange={this.onUsernameChange.bind(this)}
										/>
									</Form.Field>

									<Form.Group widths="equal">
										<Form.Input
											fluid
											label="First name"
											value={firstname}
											onChange={this.onFirstnameChange.bind(this)}
										/>
										<Form.Input
											fluid
											label="Last name"
											value={lastname}
											onChange={this.onLastnameChange.bind(this)}
										/>
									</Form.Group>

									<Form.Field>
										<label>Country</label>
										<Input
											list="countries"
											placeholder="Choose Country"
											value={country}
											onChange={this.onCountryChange.bind(this)}
										/>
										<datalist id="countries">
											{countries.map((country, i) => {
												return <option key={i} value={country.name} />;
											})}
										</datalist>
									</Form.Field>

									<Form.Field>
										<label>Company</label>
										<Input
											placeholder="Company"
											value={company}
											onChange={this.onCompanyChange.bind(this)}
										/>
									</Form.Field>

									<Form.Field>
										<label>Website</label>
										<Input
											placeholder="Website"
											value={website}
											onChange={this.onWebsiteChange.bind(this)}
										/>
									</Form.Field>
								</Form>
							</Grid.Column>

							<Grid.Column width={4}>
								<Divider horizontal>
									<Header as="h4">Projects</Header>
								</Divider>
							</Grid.Column>
						</Grid.Row>
					</Grid>

					<Divider horizontal />
					<Button floated="right" positive loading={savingUser} onClick={this.updateUser.bind(this)}>
						Save
					</Button>
				</Segment>
			</AccountLayout>
		);
	}
}

export default DashboardProfile;
