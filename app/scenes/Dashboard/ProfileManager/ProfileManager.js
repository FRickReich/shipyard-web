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
	Card,
	Container,
	Dimmer,
	Image,
	Loader,
	Segment,
	Button,
	Select,
	Form,
	Message
} from 'semantic-ui-react';

import DashboardLayout from './../../../components/Layout/DashboardLayout/DashboardLayout';
import DashboardSegment from './../../../components/Dashboard/DashboardSegment/DashboardSegment';
import DashboardMessage from './../../../components/Dashboard/DashboardMessage/DashboardMessager';
import ImageUploader from './../../../components/Dashboard/ImageUploader/ImageUploader';
import ProjectList from './../../../components/Dashboard/ProjectList/ProjectList';

import { getFromStorage } from './../../../utils/storage';

class ProfileManager extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			user: '',
			projects: [],
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

	componentDidMount() {}

	callbackData(data) {
		this.setState({ userData: data }, () => {
			this.getUser();
			this.getCountries();
			this.getProjects();
		});
	}

	getUser() {
		const { userData } = this.state;

		this.setState({
			isLoading: false,
			username: userData.username,
			firstname: userData.firstname,
			lastname: userData.lastname,
			country: userData.country,
			image: userData.image,
			company: userData.company,
			user: userData.id,
			website: userData.website
		});
	}

	getCountries() {
		fetch('https://restcountries.eu/rest/v2/all').then((res) => res.json()).then((json) => {
			if (json) {
				const countryEntries = json.map((country, i) => {
					return {
						key: i,
						text: country.name,
						value: country.alpha2Code
					};
				});

				this.setState({ countries: countryEntries });
			}
		});
	}

	getProjects() {}

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

	onCountryChange(event, { name, value }) {
		this.setState({ country: value });
	}

	onWebsiteChange(event) {
		this.setState({ website: event.target.value });
	}

	handleImageUpload(profileImage) {
		this.setState({ image: profileImage });
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

					this.setState({
						savingUser: false,
						// showSaveMessage: true
						username: username,
						firstname: firstname,
						lastname: lastname,
						country: country,
						company: company,
						website: website,
						image: image
					});
				});
			//window.location.reload(false);
		} else {
			this.setState({
				savingUser: false
			});
		}
	}

	render() {
		const {
			userData,
			image,
			username,
			savingUser,
			countries,
			country,
			firstname,
			lastname,
			company,
			website,
			projects
		} = this.state;

		return (
			<DashboardLayout
				title="Manage Profile"
				subtitle="Upload a profile picture and edit your public informations"
				dataCallback={this.callbackData.bind(this)}
			>
				{/* <DashboardMessage
                showmessage={true}
                message="s"
                messagetype="success"
            /> */}
				{userData && (
					<Grid columns={2}>
						<Grid.Column width={4}>
							<DashboardSegment title="Profile Picture" loading={false}>
								<ImageUploader image={image} onUploadImage={this.handleImageUpload.bind(this)} />
							</DashboardSegment>
						</Grid.Column>
						<Grid.Column width={8}>
							<DashboardSegment title="Profile Informations" loading={savingUser}>
								<Form>
									<Form.Field>
										<label>Username</label>
										<Input
											label="http://botany-bay.com:8080/account/"
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
										<Select
											placeholder="Select your country"
											options={countries}
											value={country}
											loading={countries.length === 0}
											onChange={this.onCountryChange.bind(this)}
										/>
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
							<DashboardSegment title="Your Projects" loading={false}>
								<ProjectList />
							</DashboardSegment>
						</Grid.Column>
					</Grid>
				)}

				<Divider horizontal />
				<Button.Group floated="right">
					<Button as={NavLink} exact to={`/user/${username}`}>
						Visit Profile
					</Button>
					<Button positive loading={savingUser} onClick={this.updateUser.bind(this)}>
						Save
					</Button>
				</Button.Group>
			</DashboardLayout>
		);
	}
}

export default ProfileManager;
