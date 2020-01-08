'use strict';

import { withRouter, NavLink } from 'react-router-dom';

import React, { Component } from 'react';
import 'whatwg-fetch';

import {
	Input,
	Header,
	Icon,
	Divider,
	Grid,
	Container,
	Dimmer,
	Loader,
	Segment,
	Button,
	Form,
	Message
} from 'semantic-ui-react';

import AccountLayout from '../../../components/AccountLayout/AccountLayout';
import DashboardSegment from '../../../components/DashboardSegment/DashboardSegment';
import ImageUploader from '../../../components/ImageUploader/ImageUploader';

import { getFromStorage } from '../../../utils/storage';

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
			showSaveMessage: false,
			image: '',
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
						image: json.data.image,
						company: json.data.company,
						user: json.data.image,
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
		const { username, firstname, lastname, country, company, website, image } = this.state;
		const obj = getFromStorage('botany-bay');

		this.setState({ savingUser: true });

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
					website: website,
					image: image
				})
			})
				.then((res) => res.json())
				.then((json) => {
					this.getUser();

					this.setState({ savingUser: false, showSaveMessage: true });
				});
			//window.location.reload(false);
		}
		else {
			this.setState({
				savingUser: false
			});
		}
	}

	handleImageUpload(profileImage) {
		this.setState({ image: profileImage });
	}

	render() {
		const {
			username,
			firstname,
			lastname,
			country,
			image,
			company,
			countries,
			website,
			savingUser,
			showSaveMessage
		} = this.state;

		console.log(showSaveMessage);

		return (
			<AccountLayout
				title="Account Profile"
				subtitle="Manage your profile"
				message="User saved succesfully"
				messagetype="success"
				showmessage={showSaveMessage}
			>
				<Grid columns={2}>
					<Grid.Row>
						<Grid.Column width={4}>
							<DashboardSegment title="Profile Picture" loading={false}>
								<ImageUploader image={image} onUploadImage={this.handleImageUpload.bind(this)} />
							</DashboardSegment>
						</Grid.Column>
						<Grid.Column width={8}>
							<DashboardSegment title="User Informations" loading={savingUser}>
								<Form>
									<Form.Field>
										<label>Username</label>
										<Input
											label="http://botany-bay.com:8080/user/"
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
							</DashboardSegment>
						</Grid.Column>

						<Grid.Column width={4}>
							<DashboardSegment title="Projects" loading={false} />
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<Divider horizontal />

				<Button.Group floated="right">
					<Button as={NavLink} exact to={`/user/${username}`}>
						Visit Profile
					</Button>
					<Button positive loading={savingUser} onClick={this.updateUser.bind(this)}>
						Save
					</Button>
				</Button.Group>
			</AccountLayout>
		);
	}
}

export default DashboardProfile;
