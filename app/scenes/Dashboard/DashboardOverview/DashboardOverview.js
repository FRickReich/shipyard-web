'use strict';

import { withRouter, NavLink } from 'react-router-dom';
import React, { Component } from 'react';
import 'whatwg-fetch';

import moment from 'moment';

import {
	Statistic,
	Icon,
	Card,
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
			statisticsLoading: true
		};
	}

	componentWillMount() {
		this.getUserStatistics();
	}

	getUserStatistics() {
		const obj = getFromStorage('botany-bay');

		if (obj && obj.token) {
			const { token } = obj;

			// Verify token
			fetch('/api/account/?id=' + token).then((res) => res.json()).then((json) => {
				console.log(json);

				if (json.success) {
					this.setState({
						statisticsLoading: false,
						userData: json.data
					});
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
		const { userData, statisticsLoading } = this.state;

		let registrationDate = moment(userData.signUpDate).fromNow(true);

		return (
			<AccountLayout
				title="Account Overview"
				subtitle={`View useful Account informations and statistics for account ${userData.username} (${userData.id}).`}
			>
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
				</DashboardSegment>
			</AccountLayout>
		);
	}
}

export default DashboardOverview;

/*
<Card.Group centered itemsPerRow={3}>
    <Card>
	    <Card.Content>
		    <Card.Description>Matthew is a pianist living in Nashville.</Card.Description>
		</Card.Content>
		<Card.Content extra>
		    <Button basic color="green">
			    +
			</Button>
        </Card.Content>
	</Card>
</Card.Group>
*/
