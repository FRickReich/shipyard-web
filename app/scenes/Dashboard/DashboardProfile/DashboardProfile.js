'use strict';

import React, { Component } from 'react';
import _ from 'lodash';
import 'whatwg-fetch';

import { Input, Header, Divider, Dimmer, Loader, Segment, Button, Form, Message } from 'semantic-ui-react';

import AccountLayout from './../../../components/AccountLayout/AccountLayout';

import { getFromStorage } from './../../../utils/storage';

class DashboardProfile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			firstName: '',
			lastName: '',
			company: '',
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

	onFirstNameChange(event) {
		this.setState({ firstName: event.target.value });
	}

	onLastNameChange(event) {
		this.setState({ lastName: event.target.value });
	}

	onCompanyChange(event) {
		this.setState({ company: event.target.value });
	}

	onCountryChange(event) {
		this.setState({ country: event.target.value });
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
						firstName: json.data.firstName,
						lastName: json.data.lastName,
						country: json.data.country,
						company: json.data.company
					});
				}
			});
		} else {
			this.setState({
				isLoading: false
			});
		}
	}

	updateUser() {
		const { firstName, lastName, country, company } = this.state;
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
					firstName: firstName,
					lastName: lastName,
					country: country,
					company: company
				})
			})
				.then((res) => res.json())
				.then((json) => {
					this.getUser();

					this.setState({ savingUser: false, showSaveMessage: false });
				});
		} else {
			this.setState({
				savingUser: false,
				showSaveMessage: false
			});
		}
	}

	render() {
		const { firstName, lastName, country, company, countries, savingUser, showSaveMessage } = this.state;

		return (
			<AccountLayout>
				<Message hidden={showSaveMessage} success onDismiss={() => this.setState({ showSaveMessage: true })}>
					Updated user informations.
				</Message>

				<Header as="h2" content="Account Profile" subheader="Manage your profile" />

				<Divider horizontal>
					<Header as="h4">Personal Informations</Header>
				</Divider>

				<Segment basic>
					<Dimmer active={savingUser} inverted>
						>
						<Loader />
					</Dimmer>

					<Form>
						<Form.Group widths="equal">
							<Form.Input
								fluid
								label="First name"
								value={firstName}
								onChange={this.onFirstNameChange.bind(this)}
							/>
							<Form.Input
								fluid
								label="Last name"
								value={lastName}
								onChange={this.onLastNameChange.bind(this)}
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
							<Input placeholder="Company" value={company} onChange={this.onCompanyChange.bind(this)} />
						</Form.Field>
					</Form>
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
