'use strict';

import { withRouter, NavLink } from 'react-router-dom';
import React, { Component } from 'react';
import 'whatwg-fetch';

import moment from 'moment';

import {
	Statistic,
	Icon,
	Card,
	Table,
	Image,
	Button,
	Message,
	Grid,
	Divider,
	Header,
	Segment,
	Dimmer,
	Loader
} from 'semantic-ui-react';

import AccountLayout from './../../../components/AccountLayout/AccountLayout';
import DashboardSegment from '../../../components/DashboardSegment/DashboardSegment';

import { getFromStorage } from './../../../utils/storage';

class DashboardOverview extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userData: [],
			messages: [],
			projects: [],
			statisticsLoading: true
		};
	}

	componentWillMount() {
		this.getUserStatistics();
		this.getUserProjects();
	}

	getUserProjects(id) {
		fetch('/api/' + id + '/projects/').then((res) => res.json()).then((json) => {
			if (json.success) {
				this.setState({ projects: json.data });
			}
		});
	}

	getUserStatistics() {
		const obj = getFromStorage('botany-bay');

		if (obj && obj.token) {
			const { token } = obj;

			// Verify token
			fetch('/api/account/?id=' + token).then((res) => res.json()).then((json) => {
				if (json.success) {
					this.setState(
						{
							statisticsLoading: false,
							userData: json.data
						},
						() => {
							this.getUserProjects(this.state.userData.id);
						}
					);
				}
			});
		}
		else {
			this.setState({
				statisticsLoading: false
			});
		}
	}

	render() {
		const { userData, statisticsLoading, projects } = this.state;

		let registrationDate = moment(userData.signUpDate).fromNow(true);

		return (
			<AccountLayout
				title="Account Overview"
				subtitle={`View useful Account informations and statistics for account ${userData.username} (${userData.id}).`}
			>
				<Grid columns="equal">
					<Grid.Row stretched>
						{/* <Grid.Column width={3}>
							<DashboardSegment title="Friends" loading={false} />
						</Grid.Column> */}
						<Grid.Column>
							{/* Account Statistics */}
							<DashboardSegment title="Account Statistics" loading={statisticsLoading}>
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
							</DashboardSegment>

							{/* Projects */}
							<DashboardSegment title="Projects" loading={statisticsLoading}>
								{projects ? (
									<Card.Group centered itemsPerRow={2}>
										{projects.map((project, i) => {
											return (
												<Card key={i}>
													{project.image && <Image src={project.image} wrapped ui={false} />}
													<Card.Content>
														<Card.Header>{project.title}</Card.Header>
														<Card.Meta>
															<span className="date">by {project.createdby}</span>
														</Card.Meta>
														<Card.Description>{project.description}</Card.Description>
													</Card.Content>
												</Card>
											);
										})}
									</Card.Group>
								) : (
									<Segment placeholder>
										<Grid columns={1} stackable textAlign="center">
											<Grid.Column>
												<Header>You dont have any projects yet.</Header>
												<Button primary as={NavLink} exact to="/dashboard/projects/create">
													Create new Project
												</Button>
											</Grid.Column>
										</Grid>
									</Segment>
								)}
							</DashboardSegment>

							{/* Projects your follow */}
							<DashboardSegment title="Projects You follow" loading={false} />
						</Grid.Column>
						<Grid.Column width={4}>
							{/* Log */}
							<DashboardSegment title="Log" loading={false}>
								<Table basic="very">
									<Table.Body>
										<Table.Row>
											<Table.Cell>Time</Table.Cell>
											<Table.Cell>Message</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>Name</Table.Cell>
											<Table.Cell>a</Table.Cell>
										</Table.Row>
									</Table.Body>
								</Table>
							</DashboardSegment>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</AccountLayout>
		);
	}
}

export default DashboardOverview;
