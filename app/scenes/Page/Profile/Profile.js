'use strict';

import { Link, NavLink } from 'react-router-dom';
import React, { Component } from 'react';
import 'whatwg-fetch';

import { getFromStorage } from './../../../utils/storage';

import {
	Header,
	Message,
	Button,
	Grid,
	Image,
	TextArea,
	Form,
	Flag,
	Input,
	Segment,
	Dimmer,
	Table,
	Loader,
	Divider
} from 'semantic-ui-react';

import ProfileLayout from '../../../components/ProfileLayout/ProfileLayout';
import DashboardSegment from '../../../components/DashboardSegment/DashboardSegment';

class Profile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loggedIn: false,
			isLoading: true,
			username: '',
			firstname: '',
			lastname: '',
			country: '',
			image: '',
			company: '',
			user: '',
			website: ''
		};
	}

	componentDidMount() {
		const obj = getFromStorage('botany-bay');

		this.getUserInfo();

		if (obj && obj.token !== '') {
			this.setState({
				loggedIn: true
			});
		}
		else {
			this.setState({
				loggedIn: false
			});
		}
	}

	getUserInfo() {
		fetch('/api/user/' + this.props.match.params.userId).then((res) => res.json()).then((json) => {
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

	render() {
		const {
			loggedIn,
			isLoading,
			username,
			firstname,
			lastname,
			country,
			image,
			company,
			user,
			website
		} = this.state;

		return (
			<ProfileLayout loggedIn={loggedIn}>
				<Header as="h2">
					<Image src={image} avatar />
					<Header.Content>
						{username}
						<Header.Subheader>Public Profile</Header.Subheader>
					</Header.Content>
				</Header>
				<Grid columns={2}>
					<Grid.Row>
						<Grid.Column width={4}>
							<DashboardSegment title="Profile Picture" loading={false}>
								<Image src={image} size="medium" rounded />
							</DashboardSegment>
						</Grid.Column>
						<Grid.Column width={8}>
							<DashboardSegment title="User Informations" loading={isLoading}>
								<Table basic="very">
									<Table.Body>
										<Table.Row>
											<Table.Cell>Username</Table.Cell>
											<Table.Cell>{username}</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>Name</Table.Cell>
											<Table.Cell>
												{firstname} {lastname}
											</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>Country</Table.Cell>
											<Table.Cell>
												<Flag name={country.toLowerCase()} />
											</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>Company</Table.Cell>
											<Table.Cell>{company}</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>Website</Table.Cell>
											<Table.Cell>
												<a href={website} target="blank">
													{website}
												</a>
											</Table.Cell>
										</Table.Row>
									</Table.Body>
								</Table>
							</DashboardSegment>
						</Grid.Column>

						<Grid.Column width={4}>
							<DashboardSegment title="Projects" loading={false} />
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</ProfileLayout>
		);
	}
}

export default Profile;
